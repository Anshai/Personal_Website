import { HeaderComponent } from './app/public/components/header-component/header.component';

import { RouterOutlet } from './app/shared/components/router-outlet/app-router-outlet.component';

import * as RT from './app/services/routing/router.service';

import './style.css';

customElements.define('app-router-outlet', RouterOutlet);
customElements.define('app-header', HeaderComponent);

class RequestHelper {
    constructor(){
        this.xhr = new XMLHttpRequest();
        this.baseUrl = 'http://localhost:3000';
    }

    sendData(){
        this.xhr.open("GET", this.baseUrl + '/');
        this.xhr.send("request body shit content")

        this.xhr.onload = () => {
            console.log('oh boi');
        }
    }
}

class App {
    static init(){

        this.header = document.getElementsByTagName('app-header')[0];

        this.declarations = [
            {selector: 'app-publichome', className: 'PublicHomeComponent', classPath: 'public/components/home-component/home.component'},
            {selector: 'app-admin', className: 'AdminLoginComponent',  classPath: 'admin/components/admin-login/admin-login.component'},
            {selector: 'app-notfound', className: 'NotFoundComponent', classPath: 'shared/components/not-found-component/notfound.component'}
        ];

        this.appRoutes = [
            {path: /^\/?$/i, component: 'app-publichome'},
            {path: /^\/?admin\/?$/i, component: 'app-admin'},
            {path: /^\/?admin\/login\/?/i, component: 'app-admin'},
            {path: /^\/?public\/?$/, component: 'app-publichome'},
            {path: /^\/?public\/home\/?$/, component: 'app-publichome'},
            {path: /.*/, component: 'app-notfound'},
        ];

        this.routerOutlet = document.querySelector('app-router-outlet');

        this.router = new RT.Router(this.declarations, this.appRoutes, this.routerOutlet);

        this.router.handleLoad();

        this.header.router = this.router;
    }

};


document.addEventListener("DOMContentLoaded", function() {
    App.init();
    // const rh = new RequestHelper;
    // rh.sendData();
});