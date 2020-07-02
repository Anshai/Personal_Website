export default class LazyLoading {
    constructor(){
        this.importedComponents = new Map();
    }

    importComponent(nextRoute){
        import('../../' + nextRoute.classPath).then(module => {
            customElements.define(nextRoute.selector, module[nextRoute.className]);
            this.addImported(nextRoute.selector, module[nextRoute.className]);
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
