import { handlePosts, renderProfileImg, renderUsername } from "./render.js";
import { toast } from "./toast.js";
import { closeDeleteModal, closeEditModal } from "./modal.js";

const baseUrl = 'http://localhost:3333';

export const sucess = 'hsl(162, 88%, 26%)';
export const faile = 'hsl(349, 69%, 55%)';

//Criar novo post ----------------------OK-------------------------------
async function createPost(post) {
    const token = localStorage.getItem('doit:token')
    const newPost = await fetch(`${baseUrl}/posts/create`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(post)
    })
        .then(async (res) => {
            const resJson = await res.json()

            if (res.ok) {
                toast('Post criado com sucesso', sucess)

                return resJson
            } else {
                throw new Error(resJson.message)
            }
        })
        .catch(err => toast(err.message, faile))

    return newPost
}

function handleNewPost() {
    const bttn = document.querySelector('.post-bttn');
    const titleValue = document.querySelector('.create-post__title');
    const textValue = document.querySelector('.create-post__content');
    const arrayValue = [titleValue, textValue]
    const modalContainer = document.querySelector('.create-modal')
    let postInfo = {};
    let count = 0;

    bttn.addEventListener('click', (event) => {
        event.preventDefault()
        arrayValue.forEach(input => {
            if (input.value.trim() === '') {
                count++
            }
            postInfo[input.name] = input.value
        })
        if (count !== 0) {
            count = 0
            toast('Por favo preencher todos os campos', faile)
        } else {
            createPost(postInfo)
            modalContainer.close()
            showAllPosts()
            handlePosts()
            arrayValue.forEach(input => {
                input.value = '';
            })
        }
    })
}
handleNewPost()

//Mostrar posts ------------------------------OK------------------------------------------
export async function showAllPosts() {
    const token = localStorage.getItem('doit:token');
    const allPosts = await fetch(`${baseUrl}/posts`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(async (res) => {
            const resJson = await res.json()

            if (res.ok) {
                return resJson
            } else {
                throw new Error('Problemas no servidor, tente novamente mais tarde', faile)
            }
        })
        .catch(err => toast(err.message, faile))
    return allPosts
}

handlePosts()

//Editar posts --------------------------------------OK----------------------------------------------------
async function editPost(newInfo, postId) {
    const token = localStorage.getItem('doit:token');
    const update = await fetch(`${baseUrl}/posts/${postId}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newInfo)
    })
        .then(async (res) => {
            const resJson = await res.json()
            if (res.ok) {
                toast('Post atualizado com sucesso', sucess)
                return resJson
            } else {
                
                throw new Error(resJson.message)
            }
        })
        .catch(err => toast(err.message, faile))
    return update
}

export function handleEditPost(bttn, postId) {
    const modalContainer = document.querySelector('.edit-modal')

    const editTitle = document.querySelector('.modal-edit__title');
    const editContent = document.querySelector('.modal-edit__content');

    let info = {};

    bttn.addEventListener('click', (event) => {
        event.preventDefault()
        info = {
            title: editTitle.value,
            content: editContent.value
        }
        modalContainer.close()
        editPost(info, postId)
        window.location.reload()
        closeEditModal()

    })
}

//Deletar post ------------------------------------ok------------------------------

async function deletePost(postId) {
    const token = localStorage.getItem('doit:token');
    const update = await fetch(`${baseUrl}/posts/${postId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(async (res) => {
            const resJson = await res.json()

            if (res.ok) {
                toast('Post excluído com sucesso', sucess)

                return resJson
            } else {
                throw new Error(resJson.message)
            }
        })
        .catch(err => toast(err.message, faile))

    return update
}

export function handleDeletePost() {
    const bttns = document.querySelectorAll('.confirm-delete');
    const modalController= document.querySelector('.delete-modal')
    bttns.forEach(button => {
        button.addEventListener('click', (event) => {
            deletePost(event.target.dataset.postId)
            window.location.reload()
            modalController.close()
            //closeDeleteModal()
            //handlePosts()
        })
    })
}

function handleLogout() {
    const logoutBttn = document.querySelector('.logout-bttn')

    logoutBttn.addEventListener('click', () => {
        localStorage.clear()
        location.replace('../../index.html')
    })
}
handleLogout()


export async function captureInfo() {
    const token = localStorage.getItem('doit:token');
    const info = await fetch(`${baseUrl}/users/profile`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(async (res) => {
            const resJson = await res.json()
            const { username, avatar } = resJson
            if (res.ok) {
                localStorage.setItem('doit:username', username)
                localStorage.setItem('doit:avatar', avatar)
                renderProfileImg()
                renderUsername()
                handlePosts()
                return resJson
            } else {
                throw new Error('Problemas no servidor, tente novamente mais tarde', faile)
            }
        })
        .catch(err => toast(err.message, faile))   
    return info
}

captureInfo()

function redirect(){
    const token = localStorage.getItem('doit:token');
    if(!token){
        window.location.replace('../../index.html')
    }
}

redirect()