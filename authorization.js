// let email_input = document.querySelector("#email_input")
// let sendCode = document.querySelector("#sendCode")
// let code_input = document.querySelector("#code")
let sign_up = document.querySelector("#sign_up");
// let random = Math.floor(Math.random() * 9000) + 1000
let firstname_input = document.querySelector(`#firstname_input`);
let lastname_input = document.querySelector(`#lastname_input`);
const API_KEY = "64389c256a6d20179644053a";
const BASE_URL = "https://dummyapi.io/data/v1/";
async function makeQuery(endpoint, method = `GET`, payload = ``) {
  let options = {
    method,
    headers: {
      "app-id": API_KEY,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    ...(method.toLowerCase() !== "get" && { body: JSON.stringify(payload) }),
  };
  const response = await fetch(BASE_URL + endpoint, options);
  const { data } = await response.json();
  return data;
}
// sendCode.addEventListener("click", async () => {
//     const templateParams = {
//         from_name: "Ahmar World",
//         to_email: email_input.value,
//         content: random
//     };
//     emailjs.send('Ahmar_World', 'template_06xep8a', templateParams)
//         .then(function (response) {
//             console.log('SUCCESS!', response.status, response.text);
//         }, function (error) {
//             console.log('FAILED...', error);
//         });
// })

sign_up.addEventListener("click", async () => {
  let data = await makeQuery(`user?created=1`);
  console.log(data);
  for (let person of data) {
    console.log(person.id);
    if (person.firstName == firstname_input.value &&lastname_input.value == person.lastName) {
      localStorage.setItem(`authorizedUser`, person.id);
      location.href = "postspage.html";
      alert("Кайф!");
    }
  }
});
