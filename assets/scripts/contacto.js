const formUser = document.getElementById('formUser');
formUser.addEventListener('submit', sendMail);
const buttonSend = document.getElementById('buttonSend');

const serviceID = 'service_pgnmp3m';
const templateID = 'template_0upmum9';
const apiKey = '-cmgQq375g_VAQEst';
function sendMail(event){
    event.preventDefault();
    buttonSend.disabled = true;
    emailjs.init(serviceID);
    emailjs.sendForm(serviceID, templateID, formUser, apiKey)
    .then( resp => {
        alert('Gracias por tu mensaje!');
        window.location.href = '/';
        },
        err => {
            console.log(err);
            alert('Disculpa, algo salio mal. Intenta de nuevo');
            buttonSend.disabled = false;
        }
    )
}