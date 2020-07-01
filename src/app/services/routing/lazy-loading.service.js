export default class LazyLoading {
    constructor(){
        this.importedComponents = new Map();
    }

    importComponent(nextRoute){
        import('../../' + nextRoute.classPath).then(module => {
            customElements.define(nextRoute.route.component, module[nextRoute.className]);
            this.addImported(nextRoute.route.component, module[nextRoute.className]);
        });
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

// class ImportedComponents {
//     constructor(){
//         this.importedComponents = new Map();
//     }

//     logImported(){
//         console.log(this.importedComponents);
//     }

//     isImported(selector){
//         return this.importedComponents.has(selector);
//     }

//     addImported(componentSelector, componentClass){
//         this.importedComponents.set(componentSelector, componentClass);
//     }

// }