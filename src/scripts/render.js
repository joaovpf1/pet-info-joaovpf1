import { handleEditModal, closeDeleteModal, cancelDeleteModal, handleShowPostModal, closeHeaderModal } from "./modal.js";
import { handleDeletePost, handleEditPost, showAllPosts } from "./dashboard.js";

const arrayMonth = ['meses', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'agosto', 'Setembro', 'Outubro', 'Novembro', "Dezembro" ]

export async function handlePosts() {
    const username = localStorage.getItem('doit:username')
    const arrayPosts = await showAllPosts()
    const mainContainer = document.querySelector('.list-container')
    mainContainer.innerHTML = "";
    arrayPosts.forEach((post) => {

        const listItem = document.createElement('li');
        const headerDiv = document.createElement('div')
        const profileDiv = document.createElement('div')
        const postImg = document.createElement('img')
        const postName = document.createElement('p')
        const postP = document.createElement('p')
        const postDate = document.createElement('p')
        const bttnsDiv = document.createElement('div')
        if (username == post.user.username) {
            const editBttn = document.createElement('button')
            const deleteBttn = document.createElement('button')

            bttnsDiv.classList.add('div-bttns')
            editBttn.classList.add('edit-bttn')

            editBttn.dataset.postId = post.id;
            handleEditModal(editBttn, post)

            deleteBttn.classList.add('delete-bttn')
            deleteBttn.dataset.postId = post.id

            editBttn.innerText = 'Editar';
            deleteBttn.innerText = 'Excluir';
            const modalContainer = document.querySelector('.delete-modal')
            deleteBttn.addEventListener('click', () => {
                modalContainer.showModal();
                const bttns = document.querySelector('.confirm-delete');
                bttns.dataset.postId = post.id
                closeDeleteModal();
                cancelDeleteModal();
                handleDeletePost();
            })

            bttnsDiv.append(editBttn, deleteBttn)
        }
        const divText = document.createElement('div')
        const postTitle = document.createElement('h2')
        const postText = document.createElement('p')
        const acessBttn = document.createElement('button')

        listItem.classList.add('list-item');
        headerDiv.classList.add('item-header')
        profileDiv.classList.add('div-profile')
        postImg.classList.add('post-img')
        postName.classList.add('post-name')
        postP.classList.add('post-date')
        postDate.classList.add('post-date')
        divText.classList.add('div-text')

        postTitle.classList.add('post-title')
        postTitle.setAttribute("name", "title")

        postText.classList.add('post-text')
        postText.setAttribute("name", "content")

        acessBttn.classList.add('modal-acess')
        acessBttn.dataset.postId = post.id

        postImg.src = post.user.avatar;
        postName.innerHTML = post.user.username;
        postP.innerText = '|';
        const captureDate = new Date(post.createdAt).toLocaleDateString();
        const monthNumber = captureDate.substring(4,5)
        console.log(monthNumber)
        let convertDate = `${arrayMonth[monthNumber]} de ${captureDate.substring(6)} `;
        postDate.innerHTML = convertDate; //new Date(post.createdAt).toLocaleDateString();
        postTitle.innerHTML = post.title;
        postText.innerHTML = post.content.substr(0, 145);
        acessBttn.innerText = 'Acessar publicação'

        profileDiv.append(postImg, postName, postP, postDate);

        headerDiv.append(profileDiv, bttnsDiv)
        divText.append(postTitle, postText, acessBttn)
        listItem.append(headerDiv, divText)
        mainContainer.appendChild(listItem)
    });
    
    handleShowPostModal()
}

export async function renderShowPostModal(id) {

    const arrayPosts = await showAllPosts()

    const modalContainer = document.querySelector('.header-modal__container')
    modalContainer.innerHTML = "";
    arrayPosts.forEach((post) => {
        if (id === post.id) {
            const divHeader = document.createElement('div')
            const divProfile = document.createElement('div')
            const postImg = document.createElement('img')
            const postName = document.createElement('h2')
            const separation = document.createElement('p')
            const postDate = document.createElement('p')
            const closeModal = document.createElement('button')
            const divText = document.createElement('div')
            const postTitle = document.createElement('h2')
            const postText = document.createElement('p')

            divHeader.classList.add('modal__container-header')
            divProfile.classList.add('div-profile')
            postImg.classList.add('post-img')
            postName.classList.add('post-name')
            postDate.classList.add('post-date')
            separation.classList.add('post-date')
            closeModal.classList.add('close-header__modal')
            divText.classList.add('div-text')
            postTitle.classList.add('post-title')
            postText.classList.add('post-text')

            postImg.src = post.user.avatar;
            postName.innerHTML = post.user.username;
            separation.innerText = '|'
            postDate.innerHTML = new Date(post.createdAt).toLocaleDateString();
            postTitle.innerHTML = post.title;
            postText.innerHTML = post.content;
            closeModal.innerText = 'X';

            divProfile.append(postImg, postName, separation, postDate)
            divHeader.append(divProfile, closeModal)
            divText.append(postTitle, postText)
            modalContainer.append(divHeader, divText)
            closeHeaderModal();
        }
    })
}

export function renderEditModal(post) {
    const modalContainer = document.querySelector('.edit-modal__container')
    modalContainer.innerHTML = '';
    const divHeader = document.createElement('div')
    const modalTitle = document.createElement('h2')
    const closeBttn = document.createElement('button')

    const mainDiv = document.createElement('div')
    const labelTitle = document.createElement('h3')
    const inputTitle = document.createElement('input')
    const labelContent = document.createElement('h3')
    const inputContent = document.createElement('textarea')

    const bttnDiv = document.createElement('div')
    const bttnCancel = document.createElement('button')
    const bttnConfirm = document.createElement('button')

    divHeader.classList.add('edit-modal__header')
    modalTitle.classList.add('edit-title')
    closeBttn.classList.add('close-edit__modal')
    mainDiv.classList.add('edit-inputs')
    labelTitle.classList.add('label-title')
    inputTitle.classList.add('modal-edit__title')
    inputTitle.setAttribute("type", "text")
    labelContent.classList.add('label-content')
    inputContent.classList.add('modal-edit__content')
    bttnDiv.classList.add('edit-bttns')
    bttnCancel.classList.add('cancel-edit__modal')
    bttnConfirm.classList.add('confirm-edit__bttn')

    modalTitle.innerText = 'Edição';
    closeBttn.innerText = 'X';

    labelTitle.innerText = 'Título do post';
    inputTitle.value = post.title;
    labelContent.innerText = 'Conteúdo do post';
    inputContent.value = post.content;

    bttnCancel.innerText = 'Cancelar';
    bttnConfirm.innerText = 'Salva Alterações';

    divHeader.append(modalTitle, closeBttn)
    mainDiv.append(labelTitle, inputTitle, labelContent, inputContent)
    bttnDiv.append(bttnCancel, bttnConfirm)
    modalContainer.append(divHeader, mainDiv, bttnDiv)

    handleEditPost(bttnConfirm, post.id)
    handleDeletePost()

}

export function renderDeleteModal() {
    const modalContainer = document.querySelector('.delete-modal__container')

    const modalheader = document.createElement('div')
    const deleteTitle = document.createElement('h2')
    const closeBttn = document.createElement('button')

    const descriptionDiv = document.createElement('div')
    const questionTitle = document.createElement('h2')
    const informText = document.createElement('p')

    const deleteButtons = document.createElement('div')
    const cancelBttn = document.createElement('button')
    const confirmBttn = document.createElement('button')

    modalheader.classList.add('delete-modal__header')
    deleteTitle.classList.add('delete-title')
    closeBttn.classList.add('close-delete__modal')

    descriptionDiv.classList.add('div-description')
    questionTitle.classList.add('question-title')
    informText.classList.add('inform-text')

    deleteButtons.classList.add('delete-bttns')
    cancelBttn.classList.add('cancel-delete__modal')
    confirmBttn.classList.add('confirm-delete')

    deleteTitle.innerText = 'Confirmação de exclusão';
    closeBttn.innerText = 'X';
    questionTitle.innerText = 'Tem certeza que deseja excluir este post?';
    informText.innerText = 'Essa ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir';
    cancelBttn.innerText = 'Cancelar';
    confirmBttn.innerText = 'Sim, excluir este post';

    modalheader.append(deleteTitle, closeBttn)
    descriptionDiv.append(questionTitle, informText)
    deleteButtons.append(cancelBttn, confirmBttn)
    modalContainer.append(modalheader, descriptionDiv, deleteButtons)
}
renderDeleteModal()

export function renderProfileImg() {
    const img = localStorage.getItem('doit:avatar');
    const elementImg = document.querySelectorAll('.main-img')
    const logoutImg = document.querySelector('.logout-img')
    logoutImg.src = img;

    elementImg.forEach((element) => {
        element.src = img;
    })
}


export function renderUsername() {
    const username = localStorage.getItem('doit:username')
    const logoutName = document.querySelector('.logout-account')

    logoutName.innerText = ''
    logoutName.innerText = `@${username}`
}


