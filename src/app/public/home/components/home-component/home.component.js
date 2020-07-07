import { Component } from "../../../../component";

export class PublicHomeComponent extends Component {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        this.shadowRoot.innerHTML = 'Public Home Component';
    }
}