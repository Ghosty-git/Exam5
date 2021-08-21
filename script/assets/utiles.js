// Elem creator

function createElem(tag, className, text) {
    const node = document.createElement(tag);
    className ? node.classList.add(className):false
    text ? node.innerHTML=text:false;
    return node
};

function closeModal(modal) { 
    modal.classList.remove("activeModal")
};

export {createElem, closeModal}