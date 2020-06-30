export class Router {

    constructor(declarations, routes, routerOutlet){
        this.declarations = declarations;
        this.routes = routes;
        this.routerHelper = new RouterHelper();
        this.routerOutlet = routerOutlet;
        this.importedComponents = new ImportedComponents();
    }

    handleLoad(){
        const currentURL = this.routerHelper.getCurrentPath();
        let nextRoute = this.searchRoute(currentURL);
        if(this.importedComponents.isImported(nextRoute.route.component)){
            console.log('Already imported logic mising');
        } else {
            import('../../' + nextRoute.classPath).then(module => {
                customElements.define(nextRoute.route.component, module[nextRoute.className]);
                this.renderComponent(this.createComponent(nextRoute.route.component));
                this.importedComponents.addImported(nextRoute.route.component, module[nextRoute.className]);
            });
        }
    }

    navigate(path){
        let nextRoute = this.searchRoute(path);
        if(this.importedComponents.isImported(nextRoute.route.component)){
            const newComp = document.createElement(nextRoute.route.component);
            this.replaceComponent(newComp);
            this.setUrl(path);
        } else {
            import('../../' + nextRoute.classPath).then(module => {
                customElements.define(nextRoute.route.component, module[nextRoute.className]);
                const newComp = document.createElement(nextRoute.route.component);
                this.replaceComponent(newComp);
                this.setUrl(path);
                this.importedComponents.addImported(nextRoute.route.component, module[nextRoute.className]);
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
                    route: this.routes[i],
                    className: cName,
                    classPath: cPath
                }
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

class ImportedComponents {
    constructor(){
        this.importedComponents = new Map();
    }

    logImported(){
        console.log(this.importedComponents);
    }

    isImported(selector){
        return this.importedComponents.has(selector);
    }

    addImported(componentSelector, componentClass){
        this.importedComponents.set(componentSelector, componentClass);
    }
}

class RouterHelper {
    getCurrentPath(){
        return document.location.pathname;
    }
}