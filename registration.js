let email_input = document.querySelector("#email_input");
let sendCode = document.querySelector("#sendCode");
let code_input = document.querySelector("#code");
let sign_up = document.querySelector("#sign_up");
let first_name_input = document.querySelector("#first_name_input");
let last_name_input = document.querySelector("#last_name_input");
let random = Math.floor(Math.random()*9000) + 1000
const API_KEY = "64389c256a6d20179644053a";
const BASE_URL = "https://dummyapi.io/data/v1/";
async function makeQuery(endpoint, method=`GET`, payload=``){
    let options = {
        method,
        headers: {
            'app-id': API_KEY,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        ...(method.toLowerCase() !== 'get' && { body: JSON.stringify(payload) }),
    }
    const response = await fetch(BASE_URL + endpoint, options);
    return await response.json();
}
sendCode.addEventListener("click", async () =>{
    const templateParams = {
        from_name: "Ahmar World",
        to_email: email_input.value,
        content: random
    };
    emailjs.send('Ahmar_World', 'template_06xep8a', templateParams)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });
});

sign_up.addEventListener("click", () => {
    const enteredCode = parseInt(code_input.value);
    const first_name = first_name_input.value.trim();
    const last_name = last_name_input.value.trim();
    
    if (first_name === "" || last_name === "") {
        alert("Пожалуйста, заполните все поля.");
        return;
    }
    
    if (enteredCode === random) {
        location.href = "authorization.html";
        alert("Suda!");
    }

    makeQuery(`user/create`, `POST`, {
        firstName: first_name_input.value,
        lastName: last_name_input.value,
        email: email_input.value,
    })
})

