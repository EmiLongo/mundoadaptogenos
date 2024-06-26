import{ catalogo } from './catalogue.js';

let cartSelection = document.getElementById("cartSelection");
let datos={
    nombre: '',
    direccion: '',
    codigoPostal: '',
    localidad: '',
    provincia: '',
    telefono: '',
    email: ''}

catalogo.forEach((producto) => {
    //     // agrega los div del carrito de compras
    let cartProductDiv = document.createElement("div");
    cartProductDiv.classList.add("cartitems"); 
    cartProductDiv.classList.add("container"); 
    cartProductDiv.classList.add(`${producto.type}`);
    cartProductDiv.id = `cart${producto.id}`;

    let cartProductLeftDiv = document.createElement("div");
    cartProductLeftDiv.classList.add("productLeft");
    let productsCart = localStorage.getItem(producto.id) ? localStorage.getItem(producto.id) : "0";
    if (productsCart == "0") {
        cartProductDiv.classList.add("invisible"); 
   }
    cartProductLeftDiv.innerHTML = `<span class="units">${productsCart}</span><span>x</span>`; 
  
    let cartProductCenterDiv = document.createElement("div");
    cartProductCenterDiv.classList.add("productCenter");
    cartProductCenterDiv.innerHTML = `<img src="${producto.thumbnail}" alt="">`;

    let cartProductRightDiv = document.createElement("div");
    cartProductRightDiv.classList.add("productRight");

    let cartTitleP = document.createElement("p");
    cartTitleP.classList.add("title");
    cartTitleP.innerHTML = producto.title;

    let cartSubtotalP = document.createElement("p");
    cartSubtotalP.classList.add("cartPrice");
    let productoSubtotal = productsCart * producto.price
    cartSubtotalP.textContent = `AR$ ${productoSubtotal}`;
    
    let cartProductDeleteDiv = document.createElement("div");
    cartProductDeleteDiv.classList.add("delete");
    cartProductDeleteDiv.innerHTML = `<img src="./assets/img/trash.svg" alt="">`;

    let buttomDecrement = document.createElement("div");
    buttomDecrement.classList.add("buttomQuantity");
    buttomDecrement.classList.add("cartDecrement");
    buttomDecrement.textContent = `-`;

    let buttomIncrement = document.createElement("div");
    buttomIncrement.classList.add("buttomQuantity");
    buttomIncrement.classList.add("cartIncrement");
    buttomIncrement.textContent = `+`;



    cartSelection.appendChild(cartProductDiv);
    cartProductDiv.appendChild(cartProductLeftDiv);
    cartProductDiv.appendChild(cartProductCenterDiv);
    cartProductDiv.appendChild(cartProductRightDiv);
    cartProductDiv.appendChild(cartProductDeleteDiv);

    cartProductRightDiv.appendChild(cartTitleP);
    cartProductRightDiv.appendChild(cartSubtotalP);

    cartProductLeftDiv.appendChild(buttomDecrement);
    cartProductLeftDiv.appendChild(buttomIncrement);


},
);

let atras = document.getElementById('atras');
atras.addEventListener('click', function(){
    window.history.back();
},
);

// define variables del usuario


// localStorage.setItem("datos", JSON.stringify(datos));

const units = document.querySelectorAll('.units');
const cartDecrements = document.querySelectorAll('.cartDecrement');
const cartIncrements = document.querySelectorAll('.cartIncrement');
const prices = document.querySelectorAll('.cartPrice');
const totalPrice = document.querySelector('.totalPrice');
const cartProducts = document.getElementById('cartProductsSum')


// Agrega eventos click a todos los botones de decremento (-)
cartDecrements.forEach((cartDecrement, index) => {
    cartDecrement.addEventListener('click', () => {
        let quantity = parseInt(units[index].textContent);
        let contenedor = cartDecrement.closest('.cartitems');
        let contenedorId = contenedor.getAttribute('id');
        let contenedorIdResuelto = contenedorId.slice(4);
        if (quantity > 1) {
            quantity -= 1;
            // actualiza el numero en el html y en la cookie
            units[index].textContent = quantity;
            localStorage.setItem(contenedorIdResuelto, quantity);
            console.log(`${contenedorIdResuelto}: ${localStorage.getItem(contenedorIdResuelto)}`)
            
            let precioResuelto = quantity * catalogo[index].price
            prices[index].textContent = `AR$ ${precioResuelto}`;
            actualizarTotal() 
        }
    });
});

// Agrega eventos click a todos los botones de incremento (+)
cartIncrements.forEach((cartIncrement, index) => {
    cartIncrement.addEventListener('click', () => {
        let quantity = parseInt(units[index].textContent);
        let contenedor = cartIncrement.closest('.cartitems');
        let contenedorId = contenedor.getAttribute('id');
        let contenedorIdResuelto = contenedorId.slice(4);
        quantity += 1;
        units[index].textContent = quantity;
        localStorage.setItem(contenedorIdResuelto, quantity);
        console.log(`${contenedorIdResuelto}: ${localStorage.getItem(contenedorIdResuelto)}`)
        
        let precioResuelto = quantity * catalogo[index].price
        prices[index].textContent = `AR$ ${precioResuelto}`;
        actualizarTotal() 
    });
});
let importeTotal = 0; 

const cartEmpty = document.querySelector('#cartEmpty');
const cartSubtotal = document.querySelector('#cartSubtotal');

function actualizarTotal() {
    importeTotal = 0; 
    prices.forEach((price, index) => {
        let precioTexto = price.textContent; 
        let precioNumerico = parseFloat(precioTexto.replace("AR$", "").trim());
        importeTotal += precioNumerico;
    });

    totalPrice.textContent = `Total: AR$ ${importeTotal}`

    let productsSum = 0;
      
    for (let i = 1; i <= 11; i++) {
        
        let key = i>= 10 ? "0" + i : "00" + i;
        if (localStorage.getItem(key)) {
            let valor = parseInt(localStorage.getItem(key));
            if (!isNaN(valor)) {
                productsSum += valor;
            }
        }
    }
    cartProducts.textContent = productsSum;
    if(!productsSum){
        cartSubtotal.style.display = "none";
        cartEmpty.style.display = "block";
    } else {
        cartSubtotal.style.display = "block";
        cartEmpty.style.display = "none";
    }
};

const deleteProducts = document.querySelectorAll('.delete');
const dialog = document.getElementById('dialog');
deleteProducts.forEach((deleteProduct, index) => {
    deleteProduct.addEventListener('click', () => {
        let deleteDecision = confirm('¿Estás seguro de borrar el producto?')
        if(deleteDecision){
        let contenedor = deleteProduct.closest('.cartitems');
        let contenedorId = contenedor.getAttribute('id');
        let contenedorIdResuelto = contenedorId.slice(4);
        localStorage.setItem(contenedorIdResuelto, 0);
        }
        location.reload();
    });
});
actualizarTotal() 
// vincular los inputs con las variables
const formNombre = document.querySelector("#formNombre");
const formDireccion = document.querySelector("#formDireccion");
const formCodigoPostal = document.querySelector("#formCodigoPostal");
const formLocalidad = document.querySelector("#formLocalidad");
const formProvincia = document.querySelector("#formProvincia");
const formTelefono = document.querySelector("#formTelefono");
const formEmail = document.querySelector("#formEmail");

const cartSend = document.getElementById('cartSend');
cartSend.addEventListener('click', () =>{
    formContainer.classList.add('formContainerVisible')
    // fijarse los datos de la persona en las cookies
    if (localStorage.getItem('datos')) {
        formNombre.value = localStorage.getItem('datos.nombre')
    };
    if (localStorage.getItem('datos')) {
        formDireccion.value = localStorage.getItem('datos.direccion')
    };
    if (localStorage.getItem('datos')) {
        formCodigoPostal.value = localStorage.getItem('datos.codigoPostal')
    };
    if (localStorage.getItem('datos')) {
        formLocalidad.value = localStorage.getItem('datos.localidad')
    };
    if (localStorage.getItem('datos')) {
        formProvincia.value = localStorage.getItem('datos.provincia')
    };
    if (localStorage.getItem('datos')) {
        formTelefono.value = localStorage.getItem('datos.telefono')
    };
    if (localStorage.getItem('datos')) {
        formEmail.value = localStorage.getItem('datos.email')
    };
})


const buttonSend = document.getElementById('buttonSend');
buttonSend.addEventListener('click', () => {
    // Chequear si hay algún campo vacío
    if (
        formNombre.value === '' ||
        formDireccion.value === '' ||
        formCodigoPostal.value === '' ||
        formLocalidad.value === '' ||
        formProvincia.value === '' ||
        formTelefono.value === '' ||
        formEmail.value === ''
    ) {
        alert('Por favor, completa todos los campos antes de enviar el pedido.');
        return
    }


    datos = {
        nombre: formNombre.value,
        direccion: formDireccion.value,
        codigoPostal: formCodigoPostal.value,
        localidad: formLocalidad.value,
        provincia: formProvincia.value,
        telefono: formTelefono.value,
        email: formEmail.value
    }
    localStorage.setItem('datos', JSON.stringify(datos));

    SendMessage();
})
function SendMessage(){
    let order=``
    let total=0
    let datosGuardados = JSON.parse(localStorage.getItem('datos'));
    for (let i = 1; i <= 11; i++) {
    
        let key = i>= 10 ? "0" + i : "00" + i;
        if (localStorage.getItem(key)) {
          let cantidad = parseInt(localStorage.getItem(key));
          let subtotal = cantidad * parseInt(catalogo[i-1].price);
          total += subtotal;
          if (!isNaN(cantidad) && cantidad!==0) {
            order += `- ${cantidad} x ${catalogo[i-1].title} = $AR ${subtotal}
`;
          }
        }
      }    // sumar los datos de la persona en el msj
    order += `Total = $AR ${total}`;
    const message = `
Hola! Soy ${datosGuardados.nombre}. Te quiero hacer el siguiente pedido:

${order} 

Si te querés comunicar conmigo lo podés hacer a este número o al ${datosGuardados.telefono}.

Los datos del envío son:
Dirección: ${datosGuardados.direccion}
Localidad: ${datosGuardados.localidad}
C.P.: ${datosGuardados.codigopostal}
Provincia: ${datosGuardados.provincia}
Email: ${datosGuardados.email}

Muchas gracias!
`
    const link = `http://wa.me/+5493412423633?text=${encodeURI(message)}`
    window.open(link, '_blank');

    let sendDecision = confirm('¿Pudiste enviar el pedido?');
    if (sendDecision) {
        localStorage.clear();
        location.replace('./index.html');
    }
}

const formContainer = document.querySelector('.formContainer')
const divClose = document.querySelector('.divClose')
divClose.addEventListener('click', function(){
    formContainer.classList.remove('formContainerVisible');
});
