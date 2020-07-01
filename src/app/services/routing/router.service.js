export class Router {

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
        if(this.lazyService.isImported(nextRoute.route.component)){
            console.log('Already imported logic mising');
        } else {
            this.lazyService.importComponent(nextRoute);
            this.renderComponent(this.createComponent(nextRoute.route.component)); 
        }
    }

    navigate(path){
        let nextRoute = this.searchRoute(path);
        if(this.lazyService.isImported(nextRoute.route.component)){
            const newComp = document.createElement(nextRoute.route.component);
            this.replaceComponent(newComp);
            this.setUrl(path);
        } else {
            this.lazyService.importComponent(nextRoute);
            this.replaceComponent(document.createElement(nextRoute.route.component));
        }
    }

    searchRoute(url){
        let i = 0;
        while(i < this.routes.length){
            if(this.routes[i].path.test(url)){
                let cName = this.getClassName(this.routes[i].component);
                let cPath = this.getClassPath(this.routes[i].component);
                return {
                    route: this.routes[i],
                    className: cName,
                    classPath: cPath
                }
            }
            i++;
        }
    }

    // checkIfAlreadyImported(searched){
    //     let imported = false;
    //     this.importedComponents.forEach( comp => {
    //         console.log(comp);
    //         if(comp === searched){
    //             console.log('ay');
    //             imported = true;
    //         }
    //     });
    //     console.log(imported);
    //     return imported;
    // }

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
        return document.createElement(tag);
    }


    renderComponent(c){
        this.routerOutlet.appendChild(c);
    }

    replaceComponent(newComp){
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