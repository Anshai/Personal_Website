import { HeaderComponent } from './app/public/components/header-component/header.component';
import { AdminLoginComponent } from './app/admin/components/admin-login.component';
import { NotFoundComponent } from './app/shared/components/not-found-component/notfound.component';
import { RouterOutlet } from './app/shared/components/router-outlet/app-router-outlet.component';

import * as RT from './app/services/routing/router.service';

import './style.css';

customElements.define('app-header', HeaderComponent);
customElements.define('app-admin', AdminLoginComponent);
customElements.define('app-notfound', NotFoundComponent);
customElements.define('app-router-outlet', RouterOutlet);


class App {
    static init(){
        this.appRoutes = [
            {path: /^\/?home\/?$/i, component: 'home-component'},
            {path: /^\/?admin\/?$/i, component: 'admin-component'},
            {path: /^\/?admin\/login\/?/i, component: 'admin-component'},
            {path: /^\/?public\/?$/, component: 'public-component'},
            {path: /^\/?public\/home\/?$/, component: 'public-component'},
            {path: /.*/, component: 'notfound-component'},
        ];

        this.routerOutlet = document.querySelector('app-router-outlet');

        this.router = new RT.Router(this.appRoutes, this.routerOutlet);

        this.router.handleLoad();
    }

};


document.addEventListener("DOMContentLoaded", function() {
    App.init();
});