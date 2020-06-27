import { Component } from  '../../../component';

export class HeaderComponent extends Component {
    constructor() {
        super();

        this.router;

        this.attachShadow({mode: 'open'});

        this.shadowRoot.innerHTML = `
        <style>

            .main-header{
                width: 100vw;
                height: 3.5rem;
                position: fixed;
                top: 0;
                left: 0;
                display: flex;
                align-items: center;
                font-family: 'raleway-ebi';
            }
            .main-header > .black-line{
                width: 100%;
                height: 1px;
                background-color: black;
            }
            .main-header > .logo-holder{
                position: absolute;
                background-color: white;
                padding: 0.1rem 0.5rem;
                top: 50%;
                left: 15%;
                transform: translateY(-50%);
            }
            .main-header > .logo-holder > p{
                margin: 0;
                padding: 0.1rem 0.2rem;
                cursor: default;
                font-size: 1.2rem;
            }
            .navbar{
                font-size: 0.5rem;
                position: absolute;
                display: flex;
                top: 0;
                left: 100%;
                transform: translateX(-150%);
            }
            .navbar > a{
                margin: 0.5rem;
            }
        </style>

        <header class="main-header">
            <div class="black-line"></div>
            <div class="logo-holder">
                <p class="logo">KE</p>
            </div>
            <div class="navbar">
                <a href="/admin" class="navlink">Admin</a>
                <a href="/public" class="navlink">Public</a>
            </div>
        </header>`;
    }

    connectedCallback(){
        const navbar = this.shadowRoot.querySelector('.navbar');
        navbar.addEventListener('click', (event) => {
            event.preventDefault();
            if(event.target.closest('.navlink')){
                let element = event.target.closest('.navlink');
                let path = element.getAttribute('href');
                this.router.navigate(path);
            }
        });
    }

}