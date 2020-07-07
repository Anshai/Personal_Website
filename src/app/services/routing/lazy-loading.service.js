export default class LazyLoading {
    constructor(){
        this.importedComponents = new Map();
    }

    importComponent(routeData){
        return import('../../' + routeData.classPath).then(module => {
            customElements.define(routeData.selector, module[routeData.className]);
            this.addImported(routeData.selector, module[routeData.className]);
            return routeData.selector;
        });
    }

    importAsync(nextRoute){
        return import('../../' + nextRoute.classPath);
    }

    isImported(selector){
        return this.importedComponents.has(selector);
    }

    addImported(componentSelector, componentClass){
        this.importedComponents.set(componentSelector, componentClass);
    }

    logImported(){
        console.log(this.importedComponents);
    }
    
}
