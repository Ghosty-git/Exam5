

// left aside 
const navigatorAside = {
    bars: document.querySelector(".burger__icon"),
    leftAside: document.querySelector(".left__aside"),
    leftX: document.querySelector(".left__x"),
}

// Right asdie
const cartAside = {
    bagIcon: document.querySelector(".header__counter"),
    rightX: document.querySelector(".right__x"),
    rightAside: document.querySelector(".right__aside"),
}


// Admin

const modal = {
    addBtn: document.querySelector(".addBtn"),
    modalLayer: document.querySelector(".modal__layer"),
};

// Add item Inputs 


const addItemInputs = {
    inputs: document.querySelectorAll(".modal__input"),
    inputName: document.querySelector(".input__name"),
    inputImage: document.querySelector(".input__image"),
    inputIngredients: document.querySelector(".input__ingredients"),
    inputInStock: document.querySelector(".input__InStock"),
    inputCost: document.querySelector(".input__cost"),
};


export {navigatorAside, cartAside, modal, addItemInputs}