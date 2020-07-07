export class Router{

    constructor(declarations, routes, routerOutlet, lazyService){
        this.declarations = declarations;
        this.routes = routes;
        this.routerHelper = new RouterHelper();
        this.routerOutlet = routerOutlet;
        this.lazyService = lazyService;
    }

    onPageLoad(){
        const currentURL = this.routerHelper.getCurrentPath();
        let routeData = this.searchRoute(currentURL);
        if(this.lazyService.isImported(routeData.selector)){
            console.log('Already imported logic mising');
        } else {
            this.lazyService.importComponent(routeData).then( selector => {
                this.renderRoute(this.createComponent(selector)); 
            });
            
        }
    }

    navigate(path){
        let routeData = this.searchRoute(path);
        if(this.lazyService.isImported(routeData.selector)){
            this.renderRoute(this.createComponent(routeData.selector));
            this.setUrl(path);
        } else {
            this.lazyService.importComponent(routeData).then( selector => {
                this.renderRoute(this.createComponent(selector));
                this.setUrl(path);
            });
        }
    }

    searchRoute(url){
        let i = 0;
        while(i < this.routes.length){
            if(this.routes[i].path.test(url)){
                let cName = this.getClassName(this.routes[i].component);
                let cPath = this.getClassPath(this.routes[i].component);
                return {
                    selector: this.routes[i].component,
                    className: cName,
                    classPath: cPath
                }
            }
            i++;
        }
    }

    getClassName(searched){
        for(let i = 0; i < this.declarations.length; i++){
            if(this.declarations[i].selector === searched){
                return this.declarations[i].className;
            }
        }
    }

    getClassPath(searched){
        for(let i = 0; i < this.declarations.length; i++){
            if(this.declarations[i].selector === searched){
                return this.declarations[i].classPath;
            }
        }
    }


    createComponent(tag){
        let comp = document.createElement(tag);
        comp.router = this; 
        return comp;
    }


    renderRoute(c){
        let isAnyRouteLoaded = !!this.routerOutlet.firstElementChild;
        if(isAnyRouteLoaded){
            console.log('Some route is loaded, gonna replace it...');
            this.routerOutlet.firstElementChild.replaceWith(c);
        } else {
            console.log('No route loaded...');
            this.routerOutlet.appendChild(c);
        }
    }

    setUrl(url){
        history.pushState({}, '', url);
    }
    
}

class RouterHelper {
    getCurrentPath(){
        return document.location.pathname;
    }
}