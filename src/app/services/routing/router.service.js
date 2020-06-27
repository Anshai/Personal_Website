export class Router {
    constructor(declarations, routes, routerOutlet){
        this.declarations = declarations;
        this.routes = routes;
        this.routerHelper = new RouterHelper();
        this.routerOutlet = routerOutlet;
        this.importedComponents = [];
    }

    handleLoad(){
        const currentURL = this.routerHelper.getCurrentPath();
        let nextRoute = this.searchRoute(currentURL);
        let isImported = this.checkIfAlreadyImported(nextRoute.component);
        if(isImported){
            console.log('Already imported logic mising');
        } else {
            let classPath = this.getClassPath(nextRoute.component);
            import('../../' + classPath).then(module => {
                let className = this.getClassName(nextRoute.component);
                customElements.define(nextRoute.component, module[className]);
                this.createComponent(nextRoute.component, this.renderComponent);
            });
            this.importedComponents.push(nextRoute.component);
        }
    }

    navigate(path){
        let nextRoute = this.searchRoute(path);
        let isImported = this.checkIfAlreadyImported(nextRoute.component);
        if(isImported){
            const newComp = document.createElement(nextRoute.component);
            this.replaceComponent(newComp);
        } else {
            let classPath = this.getClassPath(nextRoute.component);
            import('../../' + classPath).then(module => {
                let className = this.getClassName(nextRoute.component);
                customElements.define(nextRoute.component, module[className]);
                const newComp = document.createElement(nextRoute.component);
                this.replaceComponent(newComp);
            });
            this.importedComponents.push(nextRoute.component);
        }
    }

    searchRoute(url){
        let i = 0;
        while(i < this.routes.length){
            if(this.routes[i].path.test(url)){
                return this.routes[i];
            }
            i++;
        }
    }

    checkIfAlreadyImported(searched){
        let imported = false;
        this.importedComponents.forEach( comp => {
            console.log(comp);
            if(comp === searched){
                console.log('ay');
                imported = true;
            }
        });
        console.log(imported);
        return imported;
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
        const newComp = document.createElement(tag);
        // console.log(newComp);
        this.renderComponent(newComp);
    }


    renderComponent(c){
        this.routerOutlet.appendChild(c);
    }

    replaceComponent(newComp){
        console.log(this.routerOutlet.firstElementChild);
        this.routerOutlet.firstElementChild.replaceWith(newComp);
    }
    
}

export class RouterHelper {
    getCurrentPath(){
        return document.location.pathname;
    }
}