import { HeaderComponent } from './app/public/components/header-component/header.component';

import { RouterOutlet } from './app/shared/components/router-outlet/app-router-outlet.component';

import * as RT from './app/services/routing/router.service';
import LazyLoading from './app/services/routing/lazy-loading.service';

import './style.css';


// DEVSHTI BOI
// customElements.define('app-popup', PopUpComponent);


customElements.define('app-router-outlet', RouterOutlet);
customElements.define('app-header', HeaderComponent);

class RequestHelper {
    constructor(){
        this.xhr = new XMLHttpRequest();
        this.baseUrl = 'http://localhost:4200';
    }

    sendData(){
        this.xhr.open("POST", this.baseUrl + '/auth/log-in');
        this.xhr.send("request body shit content")

        this.xhr.onload = (res) => {
            console.log('oh boi');
            console.log(res);
        }
    }
}

class App {
    static init(){

        this.header = document.getElementsByTagName('app-header')[0];
        this.lazyService = new LazyLoading();

        this.declarations = [
            {selector: 'app-publichome', className: 'PublicHomeComponent', classPath: 'public/components/home-component/home.component'},
            {selector: 'app-admin', className: 'AdminLoginComponent',  classPath: 'admin/components/admin-login/admin-login.component'},
            {selector: 'app-adminreg', className: 'AdminRegister',  classPath: 'admin/components/admin-register/admin-register.component'},
            {selector: 'app-notfound', className: 'NotFoundComponent', classPath: 'shared/components/not-found-component/notfound.component'},
            {selector: 'app-popup', className: 'PopUpComponent', classPath: 'shared/components/pop-up-component/pop-up.component'}
        ];

        this.appRoutes = [
            {path: /^\/?$/i, component: 'app-publichome'},
            {path: /^\/?admin\/?$/i, component: 'app-admin'},
            {path: /^\/?admin\/login\/?/i, component: 'app-admin'},
            {path: /^\/?admin-reg\/?/i, component: 'app-adminreg'},
            {path: /^\/?public\/?$/, component: 'app-publichome'},
            {path: /^\/?public\/home\/?$/, component: 'app-publichome'},
            {path: /.*/, component: 'app-notfound'},
        ];
 
        this.routerOutlet = document.querySelector('app-router-outlet');

        this.router = new RT.Router(this.declarations, this.appRoutes, this.routerOutlet, this.lazyService);

        this.router.handleLoad();

        this.header.router = this.router;
    }

};


document.addEventListener("DOMContentLoaded", function() {
    App.init();
    const rh = new RequestHelper;
    rh.sendData();
});