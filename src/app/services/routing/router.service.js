export class Router{

    constructor(declarations, routes, routerOutlet, lazyService){
        this.declarations = declarations;
        this.routes = routes;
        this.routerHelper = new RouterHelper();
        this.routerOutlet = routerOutlet;
        this.lazyService = lazyService;
    }

    handleLoad(){
        const currentURL = this.routerHelper.getCurrentPath();
        let nextRoute = this.searchRoute(currentURL);
        if(this.lazyService.isImported(nextRoute.selector)){
            console.log('Already imported logic mising');
        } else {
            this.lazyService.importComponent(nextRoute);
            this.renderRoute(this.createComponent(nextRoute.selector)); 
        }
    }

    navigate(path){
        let nextRoute = this.searchRoute(path);
        if(this.lazyService.isImported(nextRoute.selector)){
            const newComp = this.createComponent(nextRoute.selector);
            console.log(newComp);
            this.replaceRoute(newComp);
            this.setUrl(path);
        } else {
            this.lazyService.importComponent(nextRoute);
            this.replaceRoute(this.createComponent(nextRoute.selector));
            this.setUrl(path);
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
        this.routerOutlet.appendChild(c);
    }

    replaceRoute(newComp){
        this.routerOutlet.firstElementChild.replaceWith(newComp);
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