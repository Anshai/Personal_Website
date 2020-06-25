import { Component } from '../../../component';

export class NotFoundComponent extends Component {
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML = `
        <h4>Not Found Boi<h4>`;
    }
}