import { Component } from "../../../component";

export class RouterOutlet extends Component {
    constructor(){
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(){
        this.shadowRoot.innerHTML =`
        <style>
        .main-container{
            margin-top: 5rem;
            // width: 100%;
            // height: 2rem;
        }
        </style>
        <div class="main-container">
        <slot></slot>
        </div>`;
    }
}