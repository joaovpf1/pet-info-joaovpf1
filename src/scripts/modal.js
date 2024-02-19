import { renderEditModal, renderShowPostModal } from "./render.js";

//modal header 1
export function handleShowPostModal() {
    const openBttn = document.querySelectorAll('.modal-acess')
    const modalContainer = document.querySelector('.header-modal')

    openBttn.forEach((bttn) => {
        bttn.addEventListener('click', () => {
            modalContainer.showModal();
            renderShowPostModal(bttn.dataset.postId)
        });
    })
}

export function closeHeaderModal() {
    const closeBttn = document.querySelector('.close-header__modal')
    const modalContainer = document.querySelector('.header-modal')

    closeBttn.addEventListener('click', () => {
        modalContainer.close();
    })
}

//modal edit 2
export function handleEditModal(bttn, post) {

    const modalContainer = document.querySelector('.edit-modal')
    bttn.addEventListener('click', () => {
        modalContainer.showModal();

        renderEditModal(post)
        closeEditModal();
        cancelEditModal();
    });
}

export function closeEditModal() {
    const closeBttn = document.querySelector('.close-edit__modal')
    const modalContainer = document.querySelector('.edit-modal')

    closeBttn.addEventListener('click', () => {
        modalContainer.close();
    })
}

function cancelEditModal() {
    const cancelBttn = document.querySelector('.cancel-edit__modal')
    const modalContainer = document.querySelector('.edit-modal')

    cancelBttn.addEventListener('click', () => {
        modalContainer.close();
    })
}

//modal create 3

export function handleCreateModal() {
    const openBttn = document.querySelector('.header-bttn')
    const modalContainer = document.querySelector('.create-modal')

    openBttn.addEventListener('click', () => {
        modalContainer.showModal();

        closeCreateModal();
        cancelCreateModal();
    });
}

function closeCreateModal() {
    const closeBttn = document.querySelector('.close-create__modal')
    const modalContainer = document.querySelector('.create-modal')

    closeBttn.addEventListener('click', () => {
        modalContainer.close();
    })
}

function cancelCreateModal() {
    const cancelBttn = document.querySelector('.cancel-create__modal')
    const modalContainer = document.querySelector('.create-modal')

    cancelBttn.addEventListener('click', () => {
        modalContainer.close();
    })
}

handleCreateModal()

//modal delete
export function closeDeleteModal() {
    const closeBttn = document.querySelector('.close-delete__modal')
    const modalContainer = document.querySelector('.delete-modal')

    closeBttn.addEventListener('click', () => {
        modalContainer.close();
    })
}

export function cancelDeleteModal() {
    const cancelBttn = document.querySelector('.cancel-delete__modal')
    const modalContainer = document.querySelector('.delete-modal')

    cancelBttn.addEventListener('click', () => {
        modalContainer.close();
    })
}

//modal logout
function logoutModal() {
    const modalController = document.querySelector('.logout-modal')
    const imgBttn = document.querySelector('.main-img')

    imgBttn.addEventListener('click', () => {
        modalController.showModal()
    })
}
logoutModal()