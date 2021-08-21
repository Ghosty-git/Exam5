import { navigatorAside,addItemInputs,modal} from "./assets/variables.js";
import { getData, postData, deleteData, updateData } from "./assets/CRUD.js";
import { createElem, closeModal } from "./assets/utiles.js";

// Left aside
const {bars, leftAside, leftX} = navigatorAside;
bars.addEventListener("click", () => leftAside.classList.add("activeLeft"));
leftX.addEventListener("click", () => leftAside.classList.remove("activeLeft"))

// Modal

const {addBtn, modalLayer} = modal

addBtn.addEventListener("click", () => modalLayer.classList.add("activeModal"));
window.addEventListener("click", e => e.target === modalLayer ? closeModal(modalLayer): false);


// Render Func

const columnBox = document.querySelector(".main__columns");
const renderColumns = data => {
    columnBox.innerHTML = '';

    data.forEach(item => {

        let activeInStock = null
        item.inStock < 1 ? activeInStock = '0':activeInStock = item.inStock;

            const column = createElem("div", "column");
                const columnLeft = createElem("div", "column__left");
                    const columnName = createElem("input", "column__name");
                        columnName.disabled = true;
                        columnName.setAttribute("value", item.name);
                    const editIconName = createElem("img", "editIconForName");
                        editIconName.setAttribute("src", "./media/components/admin/editIcon.svg");
                    columnLeft.append(columnName, editIconName);

                const columnCenter = createElem("div", "column__center");
                    const priceText = createElem("span", "", "price:");
                        const cost = createElem("input", "column__cost");
                        cost.setAttribute("value", `${item.cost}$`);
                        cost.disabled = true;
                        priceText.append(cost);
                    const editIconCost = createElem("img", "editIconForCost");
                        editIconCost.setAttribute("src", "./media/components/admin/editIcon.svg");
                    columnCenter.append(priceText, editIconCost);

                const columnRight = createElem("div", "column__right");
                    const rightLeft = createElem("div", "right__left");
                        const inStockText = createElem("span", "", "in stock:");
                        const decreaseBtn = createElem("button", "decreaseBtn");
                            decreaseBtn.className += " columnbtn";
                            const decreaseIcon = createElem("img");
                                decreaseIcon.setAttribute("src", "../media/components/admin/decrease.svg");
                            decreaseBtn.append(decreaseIcon);
                            const inStock = createElem("span", "inStock", activeInStock); 
                        const increaseBtn = createElem("button", "increaseBtn")
                            increaseBtn.className += " columnbtn";
                            const increaseIcon = createElem("img");
                                increaseIcon.setAttribute("src", "../media/components/admin/increase.svg");
                            increaseBtn.append(increaseIcon);
                    rightLeft.append(inStockText, decreaseBtn, inStock, increaseBtn);

                    const rightRight = createElem("div", "right__right");
                        const deleteBtn = createElem("img", "deleteBtn");
                            deleteBtn.setAttribute("src", "./media/components/admin/bin.svg");
                        rightRight.append(deleteBtn);

                columnRight.append(rightLeft, rightRight);
            column.append(columnLeft, columnCenter, columnRight);

        columnBox.append(column);

        editIconName.addEventListener("click", () => {
            editIconName.setAttribute("src", '../media/components/admin/put.svg');  
            columnName.disabled = false
            columnName.classList.add("enableField");

            editIconName.addEventListener("click", () => {
                let body = {name: columnName.value};
                updateData(item.id, body);
                getData('pastry').then(renderColumns);
            });
        });

        editIconCost.addEventListener("click", () => {
            editIconCost.setAttribute("src", '../media/components/admin/put.svg'); 
            cost.setAttribute("value", item.cost);  
            cost.disabled = false;
            cost.classList.add("enableField");

                editIconCost.addEventListener("click", () => {
                    let body = {cost: Number(cost.value)};
                    updateData(item.id, body);
                    getData('pastry').then(renderColumns);
                });
        })

        increaseBtn.addEventListener("click", () => {
            let body = {inStock: ++activeInStock};
            updateData(item.id, body);
            getData('pastry').then(renderColumns);
        });

        if(!activeInStock <= 0) {
            decreaseBtn.addEventListener("click", () => {
                let body = {inStock: --activeInStock};
                updateData(item.id, body);
                getData('pastry').then(renderColumns);
            })
        }

        deleteBtn.addEventListener("click", () => {
            deleteData(item.id);
            getData("pastry").then(renderColumns);
        });
    });
}


// Add item

const {inputs, inputName, inputImage, inputIngredients, inputInStock, inputCost} = addItemInputs

const addItemBtn = document.querySelector(".addItemBtn");

if(addItemBtn) {
    addItemBtn.addEventListener("click", () => {
        let isVlid = false;
    
        for(let every of inputs) {
            if(!every.value) {
                every.style.border = "1px solid red";
                isVlid = false;
                break;
            }else {
                every.style.border = "none";
                isVlid = true
            }
        }
    
        if(isVlid) {
            const inputIngre = inputIngredients.value;
            const ingredients = inputIngre.split(',');
    
            const body = {
                name: inputName.value,
                image: inputImage.value,
                ingredients: ingredients,
                inStock: Number(inputInStock.value),
                cost: Number(inputCost.value) 
            };
    
            postData(body);
            closeModal(modalLayer);
            getData("pastry").then(renderColumns);
        }
    })  
}

getData("pastry").then(renderColumns);
