import { Component } from "../../../component";

export class AdminRegister extends Component {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.http = new XMLHttpRequest();
    };

    connectedCallback(){
        this.shadowRoot.innerHTML = `
            <style>
                .adminreg-container{
                    width: 10rem;
                    height: 10rem;
                }
            </style>

            <div class="adminreg-container">
                <p>username</p>
                <input type="text" class="username-input">
                <p>password</p>
                <input type="text" class="password-input">
                <button class="submit-btn" >submit</button>
            </div>
        `;

        this.username = this.shadowRoot.querySelector('.username-input');
        this.password = this.shadowRoot.querySelector('.password-input');
        this.submitBtn = this.shadowRoot.querySelector('.submit-btn');

        this.submitBtn.addEventListener('click', () => {
            const u = this.username.value;
            const p = this.password.value;
            console.log({
                username: u,
                password: p
            });

            this.http.open('POST', 'http://localhost:4200/auth/admin-register', true);
            this.http.setRequestHeader("Content-Type", "application/json");
            const userinput = {
                username: this.username.value,
                password: this.password.value
            }
            this.http.send(JSON.stringify(userinput));

        });
    }
}