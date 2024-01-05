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


const shareURL = document.querySelector('#shareURL');
 
shareURL.addEventListener("click", (event) => {
  if ("share" in navigator) {
    navigator
      .share({
        title: "Página Web Mundo Adaptógenos",
        url: 'https://mundoadaptogenos.netlify.app/'
      })
 
      .then(() => {
        console.log("Contenido Compartido !");
      })
      .catch(console.error);
  } else {
    alert('Lo siento, este navegador no tiene soporte para recursos compartidos.')
  }
});