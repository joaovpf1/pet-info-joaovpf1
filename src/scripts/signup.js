import { toast } from "./toast.js";

const baseUrl = 'http://localhost:3333';
const sucess = 'hsl(162, 88%, 26%)';
const faile = 'hsl(349, 69%, 55%)';

function loginBttn() {
    const bttns = document.querySelectorAll('.to-login ');

    bttns.forEach((button) => {
        button.addEventListener('click', () => {

            location.replace('../../index.html')

            return toast('Você será redirecionado(a) para o login', sucess)
        })
    })
}

loginBttn()

async function requestSignup(signupInfo) {
    const setInfo = await fetch(`${baseUrl}/users/create`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
    })
        .then(async (res) => {
            const resJson = await res.json();
            if (res.ok) {
                toast('Cadastro realizado com sucesso, você será redirecionado para o login', sucess)

                location.replace('../../index.html')
                return resJson
            } else {
                throw new Error(resJson.message)
            }
        })
        .catch(err => toast(err, faile))
    return setInfo
}

function createSignup() {
    const signupUser = document.querySelector('.signup-user');
    const signupEmail = document.querySelector('.signup-email');
    const signupImg = document.querySelector('.signup-img');
    const signupPass = document.querySelector('.signup-pass');
    const signupBttn = document.querySelector('.signup-bttn');
    let infos = {};
    let count = 0;

    signupBttn.addEventListener('click', async (event) => {
        event.preventDefault();

        if (signupUser.value.trim() === "" && signupEmail.value.trim() === "" && signupImg.value.trim() === "" && signupPass.value.trim() === "") {
            count++
        }
        if (count !== 0) {
            count = 0;
            return toast("Todos os campos devem ser preenchidos", faile)
        } else {
            const spinner = document.querySelector('.spinner-hidden')
            const spinnerDiv = document.querySelector('.div-spinner__hidden')
            if (spinner.classList == "spinner-hidden") {
                console.log('entrou')

                signupBttn.classList.remove('signup-Bttn')
                signupBttn.classList.remove('confirm__button')
                signupBttn.classList.add('signup-bttn__hidden')

                spinnerDiv.classList.remove('div-spinner__hidden')
                spinner.classList.remove('spinner-hidden')

                spinnerDiv.classList.add('div-spinner')
                spinner.classList.add('loader')
            }
            infos = {
                username: signupUser.value,
                email: signupEmail.value,
                password: signupPass.value,
                avatar: signupImg.value
            }
            await requestSignup(infos)
        }
    })
}
createSignup()