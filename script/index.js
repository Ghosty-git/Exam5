import { cartAside, navigatorAside } from "./assets/variables.js";
import { createElem } from "./assets/utiles.js";
import { getData } from "./assets/CRUD.js";

// Left aside

const {bars, leftAside, leftX} = navigatorAside;

bars.addEventListener("click", () => leftAside.classList.add("activeLeft"));
leftX.addEventListener("click", () => leftAside.classList.remove("activeLeft"))

// right aside


const {bagIcon, rightX, rightAside} = cartAside

bagIcon.addEventListener("click", () => rightAside.classList.add("activeRight"));
rightX.addEventListener("click", () => rightAside.classList.remove("activeRight"));


const cartsBox = document.querySelector(".main__blocks");

const renderCarts = data => {
    cartsBox.innerHTML = '';

    data.forEach(item => {
        const mainBlock = createElem("div", "main__block");
            const blockImg = createElem("div", "block__img");
                const pict = createElem("img");
                    pict.setAttribute("src", item.image);
                blockImg.append(pict);
            const blockRest = createElem("div", "block__rest");
                const blockName = createElem("h3", "block__name", item.name);
                const blockIngredients = createElem("p", "block__ingredients", item.ingredients);
                const blockCost = createElem("span", "block__cost", `${item.cost}$`);
                blockRest.append(blockName, blockIngredients, blockCost);
            const addToCardBtn = createElem('button', `block__btn`, "Add to cart");
                if(item.inStock <= 0){
                    addToCardBtn.disabled = true;
                    addToCardBtn.classList.add("disabledBtn");
                    addToCardBtn.innerText = "Not avaliable";
                }else {
                    addToCardBtn.classList.add("addToCartBtn");
                }
            mainBlock.append(blockImg, blockRest, addToCardBtn);
        cartsBox.append(mainBlock);

        addToCardBtn.addEventListener("click", addToCart(item));
    })
};


// Cart

const cartBox = document.querySelector(".right__carts");
const cartCounter = document.querySelector(".cart__counter");
const cartTotalBlock = document.querySelector(".cart__total");

let cartData = [];

const addToCart = (item) => () => {

    if(cartData.length <= 0) {
        cartData.push({items: 1, ...item});
    }else {
        let found;
        cartData.find(data => data.name === item.name ? found=data:found = false);

        if(!found) {
            cartData.push({items: 1, ...item});
        }else {
            found.items++
        }
    }

    renderCart(cartData);
};

const renderCart = itemData => {
 
    if(itemData.length >= 1) {
        let items = [];
        for(let every of itemData) {
            items.push(every.items);
        }

        let totalCount = items.reduce((acc, item) => acc+=item);
        cartBox.innerHTML = '';
        cartCounter.innerHTML = totalCount;
        cartTotalBlock.classList.add("cartTotal__active");
    
        let totalData = [];
        itemData.forEach(item => {  
                const itemCart = createElem("div", "right__cart");
                    itemCart.className += " item";
                const itemLeft = createElem("div", "item__left");
                    const itemName = createElem("p", "item__name", item.name);
                    const itemQuanity = createElem("span", "item__quanity", `${item.items} item`);
                    itemLeft.append(itemName, itemQuanity);
                const itemRight = createElem("div", "item__right");
                    let total = item.items * item.cost;
                    totalData.push(total);
                    const itemTotal = createElem("span", "item__total", `${total}$`);
                    itemRight.append(itemTotal);
                itemCart.append(itemLeft, itemRight);
            cartBox.append(itemCart);
        });
    
        const total = document.querySelector(".total");
    
        let summ = totalData.reduce((summ, every) => summ+=every);
        total.innerHTML = `${Math.ceil(summ)}$` 
    }
};


getData("pastry").then(renderCarts)
