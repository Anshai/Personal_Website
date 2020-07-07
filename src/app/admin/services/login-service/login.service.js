export class LoginService {
    constructor(){

    }

    async logIn(url, data){
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'},
        });
        return response.json();
    }
}