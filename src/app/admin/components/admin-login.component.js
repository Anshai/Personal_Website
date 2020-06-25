import { Component } from '../../component';

export class AdminLoginComponent extends Component {
    constructor(){
        super();

        this.attachShadow({mode: 'open'});

        this.shadowRoot.innerHTML = `
        <style>

            .login-card__container{
                width: 13rem;
                height: 11rem;
                /* background: rgba(100, 100, 100, 0.2); */
                border-radius: 2px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                // box-shadow: 2px -2px 5px -1px rgba(0,0,0,0.11);
                font-family: 'raleway-bold';
                border: 1px solid rgba(150, 150, 150, 0.2);
            }
            .login-card__container > .login-form__container{
                width: 100%;
                height: 80%;
                /* background: white; */
            }
            .login-card__container > .login-form__container > .form-group{
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;
            }
            .form-control {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }

            .form-group label{
                font-size: 0.8rem;
                color: rgba(100, 100, 100, 1);
            }

            .form-group input {
                width: 70%;
                border: none;
                border-radius: 2px;
                border-bottom: 1px solid rgba(100, 100, 100, 0.2);
                transition: width 300ms;
                outline: none;
            }

            .form-group input:focus {
                width: 80%;
            }

            .login-actions__container {
                width: 100%;
                height: 20%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .login-actions__container > .login-btn{
                padding: 0.2rem 0.8rem;
                border: none;
                border-radius: 2px;
                // background-color: rgba(20, 20, 20, 0.3);
                color: white;
                outline: none;
                transition: background-color 500ms;
                font-size: 0.8rem;
            }
            .login-actions__container > .login-btn:hover{
                background-color: rgba(20, 20, 20, 0.5);
            }
    </style>
    
    
    <div class="login-card__container">
        <div class="login-form__container">
            <div class="form-group">
                <div class="form-control username">
                    <label for="username">USERNAME</label>
                    <input type="text" name="username" class="username-input">
                </div>
                <div class="form-control password">
                    <label for="password">PASWORD</label>
                    <input type="password" name="password" class="password-input">
                </div>
                
            </div>
        </div>
        <div class="login-actions__container">
            <button class="login-btn">LOGIN</button>
        </div>
    </div>`;
    }

    connectedCallback(){
        this.loginBtn = this.shadowRoot.querySelector('.login-btn');
        this.usernameControl = this.shadowRoot.querySelector('.username-input');
        this.passwordControl = this.shadowRoot.querySelector('.password-input');
        this.loginData = {
            username: '',
            password:  ''
        }
        this.loginEvent = this.handleLogin.bind(this);
        this.loginBtn.addEventListener('click', this.loginEvent);
    }

    disconnectedCallback(){
        this.loginBtn.removeEventListener('click', this.loginEvent);
    }

    handleLogin(){
        let userInput = this.getLoginData();
        console.log(userInput);
    }

    getLoginData(){
        this.loginData.username = this.usernameControl.value;
        this.loginData.password = this.passwordControl.value;
        return this.loginData;
    }


}