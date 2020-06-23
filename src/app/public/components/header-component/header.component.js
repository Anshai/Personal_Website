import { Component } from  '../../../component';

export class HeaderComponent extends Component {
    constructor() {
        super();

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
            }
        </style>

        <header class="main-header">
            <div class="black-line"></div>
            <div class="logo-holder">
                <p class="logo">KE</p>
            </div>
        </header>`;
    }

}