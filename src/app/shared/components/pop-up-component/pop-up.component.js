import { Component } from "../../../component";

export class PopUpComponent extends Component {
    constructor(){
        super();

        this.attachShadow({mode: 'open'});
        
        this.shadowRoot.innerHTML = `
        <style>
        @keyframes pop-up {
            0%{
                opacity: 0;
                transform: translate(-50%, -3rem);
            } 20% {
                opacity: 100;
                transform: translate(-50%, 0);
            } 80% {
                opacity: 100;
                transform: translate(-50%, 0);
            } 100% {
                opacity: 0;
            }
        }

        .pop-up__contaienr{
            position: absolute;
            transform: translate(-50%, 0);
            top: 10%;
            left: 50%;
            margin: 0 auto;
            opacity: 0;
            /* border: 1px solid #ccc; */
            padding: 0.2rem 1.7rem;
            border-radius: 2px;
            font-family: 'raleway-bold';
            font-size: 0.8rem;
        }

        .pop-animation{
            animation-name: pop-up;
            animation-duration: 2.5s;
            animation-fill-mode: forwards;
        }

        .warning{
            background: #e7305b;
            color: white;
        }

        .nice{
            background: #383e56;
            color: white;
        }
        </style>

        <div class="pop-up__contaienr" id="pop-up">
            <span class="message">Wrong Input</span>
        </div>
        `;
    }


    connectedCallback(){
        this.popUpComponent = this.shadowRoot.getElementById('pop-up');
        this.preDefined = {
            warning: 'warning',
            green: 'nice',
            setMessage: (message) => {
                this.shadowRoot.querySelector('.message').innerText = message;
            }
        }
    }
    
    popUp(config){
        this.preDefined.setMessage(config.message);
        this.popUpComponent.classList.toggle('pop-animation');
        this.popUpComponent.classList.toggle(this.preDefined[config.style]);
        setTimeout(() => {
            this.popUpComponent.classList.toggle('pop-animation');
            this.popUpComponent.classList.toggle(this.preDefined[config.style]);
        }, 2500);
    }



}