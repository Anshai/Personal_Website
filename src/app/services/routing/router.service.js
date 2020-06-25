export class Router {
    constructor(routes, routerOutlet){
        this.routes = routes;
        this.routerHelper = new RouterHelper();
        this.routerOutlet = routerOutlet;
    }

    handleLoad(){
        const currentURL = this.routerHelper.getCurrentPath();
        let nextRoute = this.searchRoute(currentURL);
        this.createComponent(nextRoute.component);
    }

    searchRoute(url){
        let i = 0;
        while(i < this.routes.length){
            if(this.routes[i].path.test(url)){
                console.log(`${i} ay`);
                return this.routes[i];
            }
            i++;
        }
    }

    createComponent(component){
        let tag = "app-" + component.split('-')[0];
        console.log(tag);
        const newComp = document.createElement(tag);
        console.log(newComp);
        this.renderComponent(newComp);
    }

    renderComponent(c){
        this.routerOutlet.appendChild(c);
    }
}

export class RouterHelper {
    getCurrentPath(){
        return document.location.pathname;
    }
}