/* Desenvolva seu código aqui */
import { toast } from "./toast.js";

const baseUrl = 'http://localhost:3333';

export const sucess = 'hsl(162, 88%, 26%)';
export const faile = 'hsl(349, 69%, 55%)';

export async function loginRequest(loginInfo) {
    const loginToken = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
    })
        .then(async (res) => {
            const resJson = await res.json();

            if (res.ok) {
                const { token } = resJson;

                localStorage.setItem('doit:token', token)

                toast('Login realizado com sucesso, você será redirecionado para a homepage', sucess)

                location.replace('../../src/pages/dashboard.html')

                return resJson
            } else {
                throw new Error(resJson.message)
            }
        })
        .catch(err => toast(err, faile))
    return loginToken;
}

function loginAcess() {
    const inputs = document.querySelectorAll('.login-input')
    const inputEmail = document.querySelector('.email-input')
    const inputPassword = document.querySelector('.pass-input')
    const acessBttn = document.querySelector('.log-bttn');
    let infos = {};
    let count = 0;

    acessBttn.addEventListener('click', (event) => {
        event.preventDefault()

        infos = {
            email: inputEmail.value,
            password: inputPassword.value
        }
        inputs.forEach((input) => {
            if (input.value.trim() === '') {
                count++
            }
        })
        if (count !== 0) {
            count = 0;
            return toast("Todos os campos devem ser preenchidos", faile)
        } else {
            loginRequest(infos)
            const logbttn = document.querySelector('.log-bttn')
            const spinner = document.querySelector('.spinner-hidden')
            const spinnerDiv = document.querySelector('.div-spinner__hidden')
            if (spinner.classList == "spinner-hidden") {
                acessBttn.classList.remove('acess-bttn')
                acessBttn.classList.remove('log-bttn')
                acessBttn.classList.remove('confirm__button')
                logbttn.classList.add('log-bttn__hidden')

                spinnerDiv.classList.remove('div-spinner__hidden')
                spinner.classList.remove('spinner-hidden')

                spinnerDiv.classList.add('div-spinner')
                spinner.classList.add('loader')
            }
        }
    })
}

loginAcess()

function signupBttn() {
    const bttn = document.querySelector('.to-signup');

    bttn.addEventListener('click', () => {
        location.replace('../../src/pages/signup.html')
        return toast('Você será redirecionado(a) para o cadastro', sucess)
    })
}

signupBttn()