import{ catalogo } from './catalogue.js';

const productsSelection = document.getElementById("productsSelection");
const inMotionCarrouselItemContainer = document.querySelector('#inMotionCarrouselItemContainer');
// crea los contenedores por hongo
const uniqueProductTags = [...new Set(catalogo.map(producto => producto.productTag))];
const uniqueProductBenefits = [...new Set(catalogo.map(producto => producto.productBenefits))];

uniqueProductTags.forEach((productTag, i) => {
    let tagDiv = document.createElement("div");
    tagDiv.id = productTag.replace(/\s/g, ""); // Remover espacios en blanco del id
    tagDiv.classList.add("productTag");
    tagDiv.innerHTML = `<div class="productTagTitle"><div class="productTagContainer"><div class="circlePlus"><div class="line1Plus"></div><div class="line2Plus"></div></div><div><p class="productTagP">${productTag}</p></div></div><div class="productTagText"><p class="productBenefits">${uniqueProductBenefits[i]}</p></div></div>`;

    productsSelection.appendChild(tagDiv);
});
  

let targetDiv
let searchTag
let inMotionId
catalogo.forEach((producto) => {
    // suma uno a uno cada producto en su contenedor por hongo
    searchTag = producto.productTag.replace(/\s/g, "");
    targetDiv = document.getElementById(searchTag);
    
    let productCollapsedDiv = document.createElement("div");
    productCollapsedDiv.classList.add("items"); 
    productCollapsedDiv.classList.add("productTagItems"); 
    productCollapsedDiv.classList.add("invisible"); 
    productCollapsedDiv.classList.add("productCollapsed"); 
    productCollapsedDiv.classList.add(`${producto.type}`);
    productCollapsedDiv.id = producto.id;
    
    let productLeftDiv = document.createElement("div");
    productLeftDiv.classList.add("productLeft");
    productLeftDiv.innerHTML = '<span><div class="lineLeft1Plus"></div><div class="lineLeft2Plus"></div></span>';
    
    let productCenterDiv = document.createElement("div");
    productCenterDiv.classList.add("productCenter");
    productCenterDiv.innerHTML = `<img src="${producto.thumbnail}" alt="">`;
    
    let productRightDiv = document.createElement("div");
    productRightDiv.classList.add("productRight");
    
    let titleP = document.createElement("p");
    titleP.classList.add("title");
    titleP.innerHTML = producto.title;
    
    let pricesDiv = document.createElement("div");
    pricesDiv.classList.add("prices");
    pricesDiv.innerHTML = `<span class="priceBefore">AR$ ${producto.priceBefore}</span>
    <span class="price">AR$ ${producto.price}</span>`;
    
    targetDiv.appendChild(productCollapsedDiv);
    productCollapsedDiv.appendChild(productLeftDiv);
    productCollapsedDiv.appendChild(productCenterDiv);
    productCollapsedDiv.appendChild(productRightDiv);
    
    productRightDiv.appendChild(titleP);
    productRightDiv.appendChild(pricesDiv);
    // suma uno a uno imagen producto en carrousel in motion
    
    let inMotionCarrouselItem = document.createElement("div");
    inMotionCarrouselItem.classList.add("inMotionCarrouselItem");
    inMotionId = producto.id + "im"
    inMotionCarrouselItem.id = inMotionId;
    inMotionCarrouselItem.innerHTML = `<img src="${producto.thumbnail}" alt=""><p>${producto.title}</p>`;
    inMotionCarrouselItemContainer.appendChild(inMotionCarrouselItem);

},
);




// botones de cantidad y calculo de subtotal del producto
const decrementButton = document.querySelector('.decrement');
const incrementButton = document.querySelector('.increment');
const quantityElement = document.querySelector('.quantity');

// Agrega eventos click a todos los botones de decremento (-)
decrementButton.addEventListener('click', () => {
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) {
        quantity -= 1;
        quantityElement.textContent = quantity;
        //  calcular subtotal
        let idItem = String(itemSell.id);
        let indexCatalogue = idArray.indexOf(idItem);
        quantityText.textContent = quantity;
        let subtotal = +catalogo[indexCatalogue].price * quantity;
        quantitySubtotal.textContent = subtotal;
    }
});

// Agrega eventos click a todos los botones de incremento (+)
incrementButton.addEventListener('click', () => {
    let quantity = parseInt(quantityElement.textContent);
    quantity += 1;
    quantityElement.textContent = quantity;
    //  calcular subtotal
    let idItem = String(itemSell.id);
    let indexCatalogue = idArray.indexOf(idItem);
    quantityText.textContent = quantity;
    let subtotal = +catalogo[indexCatalogue].price * quantity;
    quantitySubtotal.textContent = subtotal;
});


// pasa los datos del catalogo al itemsell
const items = document.querySelectorAll('.items');
const itemSell = document.querySelector('.itemSell');
const itemSellContainer = document.querySelector('.itemSellContainer');
const itemSellTitle = document.querySelector('#itemSellTitle');
const itemSellProductFeature = document.querySelector('#itemSellProductFeature');
const itemSellCircleText = document.querySelector('#itemSellCircleText');
const itemSellPriceBefore = document.querySelector('#itemSellPriceBefore');
const itemSellPrice = document.querySelector('#itemSellPrice');
const quantity = document.querySelector('.quantity');
const quantityText = document.querySelector('.quantityText');
const quantitySubtotal = document.querySelector('.quantitySubtotal');
const itemSellImg = document.querySelector('#itemSellImg');
// cambiar el src de la foto
let idArray = catalogo.map(catalogo => catalogo.id);

// falta enlazar el carrousel <div class="singleProductCarrousel">
// ojo que sigue la misma foto

items.forEach( function(item){
    item.addEventListener('click', function(){
        itemSellContainer.classList.add('itemSellContainerVisible');
        let idItem = String(item.id);
        let indexCatalogue = idArray.indexOf(idItem);
        
        itemSell.id= idItem;
        itemSell.classList.remove(`combo`);
        itemSell.classList.remove(`product`);
        itemSell.classList.add(`${catalogo[indexCatalogue].type}`);
        itemSellTitle.textContent = `${catalogo[indexCatalogue].title}`;
        itemSellProductFeature.textContent = `${catalogo[indexCatalogue].productFeature}`;
        itemSellImg.src = `${catalogo[indexCatalogue].singleProductCarrousel}`;
        itemSellCircleText.textContent = `${catalogo[indexCatalogue].off}% OFF`;
        itemSellPriceBefore.textContent = `AR$ ${catalogo[indexCatalogue].priceBefore}`;
        itemSellPrice.textContent = `AR$ ${catalogo[indexCatalogue].price}`;
        quantity.textContent = '1';
        quantityText.textContent = '1';
        quantitySubtotal.textContent = catalogo[indexCatalogue].price;
    });
});

const divClose = document.querySelector('.divClose')
divClose.addEventListener('click', function(){
    itemSellContainer.classList.remove('itemSellContainerVisible');
});



const productTagsTitle = document.querySelectorAll('.productTagTitle');
const lines1PlusClick = document.querySelectorAll('.line1Plus')
const productsTag = document.querySelectorAll('.productTag')
const productTagItems = document.querySelectorAll('.productTagItems')
productTagsTitle.forEach((productTagTitle, index) => {
    productTagTitle.addEventListener('click', () => {
        let calcHeight = `auto`;
        let calcHeightOriginal = '12vh';

        lines1PlusClick[index].classList.toggle('line1PlusClick');
        const items = productTagTitle.parentElement.querySelectorAll('.items');
        items.forEach((item) => {
            item.classList.toggle('invisible');
        });
        if (productsTag[index].style.height == calcHeight) {
            productsTag[index].style.height = calcHeightOriginal ;
        } else{
            productsTag[index].style.height = calcHeight;
        }
    });
});



// boton de accion abre el itemSell con el combo
const buttonToAction = document.querySelector("#buttonToAction");
buttonToAction.addEventListener('click', function () {
    const targetPosition = productsSelection.getBoundingClientRect().top + window.scrollY - 60;
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
        block: "end"
});
});
// buttonToAction.addEventListener('click', function(){
//     // itemSellContainer.classList.add('itemSellContainerVisible')
//     // let idItem = "002";
//     // let indexCatalogue = idArray.indexOf(idItem);
    
//     // // en un futuro hacer funcion que ejecute aca y en items
//     // itemSell.id= idItem;
//     // itemSell.classList.remove(`combo`);
//     // itemSell.classList.remove(`product`);
//     // itemSell.classList.add(`${catalogo[indexCatalogue].type}`);
//     // itemSellTitle.textContent = `${catalogo[indexCatalogue].title}`;
//     // itemSellProductFeature.textContent = `${catalogo[indexCatalogue].productFeature}`;
//     // itemSellCircleText.textContent = `${catalogo[indexCatalogue].off}% OFF`;
//     // itemSellPriceBefore.textContent = `AR$ ${catalogo[indexCatalogue].priceBefore}`;
//     // itemSellPrice.textContent = `AR$ ${catalogo[indexCatalogue].price}`;
//     // quantity.textContent = '1';
//     // quantityText.textContent = '1';
//     // quantitySubtotal.textContent = catalogo[indexCatalogue].price;
//     console.log("emi")
//     callToActionTarget.scrollIntoView({
//         behavior: "smooth",
//         block: "end"
//     })
// },
// );



const buttonAddCart = document.querySelector('.buttonAddCart');
const buttonShop = document.querySelector('.buttonShop');
const cartProductsSum = document.querySelector('#cartProductsSum');

// Agrega un controlador de eventos click a cada botón
buttonAddCart.addEventListener('click', () => {
    let contenedorId = itemSell.id;
    let cantidad = +quantityElement.textContent;

    let nuevoValorCarrito = +localStorage.getItem(contenedorId)+cantidad
    localStorage.setItem(contenedorId, nuevoValorCarrito);

    // updateCartTotal();
    alert(`Se agregaron ${cantidad} productos en el carrito`);
    location.reload();
  });
  buttonShop.addEventListener('click', () => {
    let contenedorId = itemSell.id;
    let cantidad = +quantityElement.textContent;

    let nuevoValorCarrito = +localStorage.getItem(contenedorId)+cantidad
    localStorage.setItem(contenedorId, nuevoValorCarrito);

    alert(`Se agregaron ${cantidad} productos en el carrito`);
    location.href = "./cart.html";
  });




// actualiza el valor de cantidad de productos en el logo de carrito o el total de la compra
function updateCartTotal() {
  let totalSum = 0;

  for (let i = 1; i <= 11; i++) {
    
    let key = i>= 10 ? "0" + i : "00" + i;
    if (localStorage.getItem(key)) {
      let valor = parseInt(localStorage.getItem(key));
      if (!isNaN(valor)) {
        totalSum += valor;

      }
    }
  }
  cartProductsSum.textContent = totalSum;
}

const dotsCarrousel = document.querySelectorAll('.dotCarrousel');
const imgContainer = document.querySelector('#imgContainer');

dotsCarrousel.forEach((dotCarrousel, index) => {
    dotCarrousel.addEventListener('click', () => {
        dotsCarrousel.forEach((dotCarrousel) => {
            dotCarrousel.classList.remove('dotActive');

        })
        dotCarrousel.classList.add('dotActive');
        let moveCarrousel = index * -100;
        imgContainer.style.transform = `translateX(${moveCarrousel}vw)`

    });
});

const flechaIzq = document.querySelector('#flechaIzq');
const flechaDer = document.querySelector('#flechaDer');

flechaIzq.addEventListener('click', () =>{
    let dotPosition = 0;
    dotsCarrousel.forEach((dotCarrousel, index) => {
        if (dotCarrousel.classList.contains('dotActive')){
                dotPosition = index;
       }
    });
    if (dotPosition == 0){
        let lastDot = dotsCarrousel.length - 1;
        dotsCarrousel[lastDot].click();
    } else {
        let lastDot = dotPosition - 1;
        dotsCarrousel[lastDot].click();
    }
});


flechaDer.addEventListener('click', () =>{
    let dotPosition = 0;
    dotsCarrousel.forEach((dotCarrousel, index) => {
        if (dotCarrousel.classList.contains('dotActive')){
                dotPosition = index;
        }
    });
    if (dotPosition == (dotsCarrousel.length - 1)){
        dotsCarrousel[0].click();
    } else {
        let lastDot = dotPosition + 1;
        dotsCarrousel[lastDot].click();
    }
});

const inMotionCarrousel = document.querySelector('#inMotionCarrousel');
let inMotionMaxScrollLeft = inMotionCarrouselItemContainer.scrollWidth - inMotionCarrousel.clientWidth;
let inMotionInterval = null;
let inMotionStep = 1;
const inMotionStart = () => {
    inMotionInterval = setInterval(() => {
        inMotionCarrousel.scrollLeft = inMotionCarrousel.scrollLeft + inMotionStep;
        if (inMotionCarrousel.scrollLeft === inMotionMaxScrollLeft){
            inMotionStep = inMotionStep * -1;
        } else if(inMotionCarrousel.scrollLeft === 0){
            inMotionStep = inMotionStep * -1;
        };
    }, 10);
}
inMotionStart();
const inMotionStop = () => {
    clearInterval(inMotionInterval);
}
// guardado para formato escritorio
// inMotionCarrousel.addEventListener('mouseover', () =>{
//     inMotionStop();
// })
// inMotionCarrousel.addEventListener('mouseout', () =>{
//     inMotionStart();
// })

// accion cuando hacen click en el div del in motion carrousel
const inMotionCarrouselItem = document.querySelectorAll('.inMotionCarrouselItem');
inMotionCarrouselItem.forEach(item => {
    item.addEventListener("click", () => {
        let itemIdRaw = String(item.id);
        let itemId = itemIdRaw.slice(0, 3);
        let itemClick = document.getElementById(itemId);
        itemClick.click();

    })
});