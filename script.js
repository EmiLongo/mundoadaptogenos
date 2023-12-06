const menuDropdown = document.querySelector('.menuDropdown');
const menuHamburguer = document.getElementById('menuDropdownIcon');
const line1 = document.querySelector('.line1')
const line2 = document.querySelector('.line2')
const line3 = document.querySelector('.line3')
const cartPoint = document.getElementById('cartPoint');


menuHamburguer.addEventListener('click', function() {
    line1.classList.toggle('line1click');
    line2.classList.toggle('line2click');
    line3.classList.toggle('line3click');
    
    const currentRightValue = String(menuDropdown.style.right);
    if (currentRightValue == '-1px') {
        menuDropdown.style.right = '-100vw';
    } else {
        menuDropdown.style.right = '-1px';
    }
});


function ocultarCartPoint() {
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
    if(totalSum == "0"){
        cartPoint.style.display = "none";
    } else{
        cartPoint.style.display = "block";
    
    }  }

ocultarCartPoint()

function updateCartTotal2() {
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

// actualizacion de cualquier cambio
updateCartTotal2()


// const menuFixed = document.querySelector('#menuFixed');
// window.addEventListener("scroll", function() {
//     // Cambia el color del menú cuando el usuario se desplaza hacia abajo
//     if (window.scrollY > 180) { // Puedes ajustar el valor según sea necesario
//         menuFixed.style.backgroundColor = "#FCDADA"; // Cambia a tu color deseado
//     } else {
//         menuFixed.style.backgroundColor = "#ecc4a0"; // Vuelve al color predeterminado
//     }
//   });