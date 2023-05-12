const mainDiv = document.querySelector(`#post`);
const createBut = document.querySelector(`#createBut`);
const API_KEY = "64389c256a6d20179644053a";
const BASE_URL = "https://dummyapi.io/data/v1/";

async function makeQuery(endpoint, method = `GET`, payload = ``) {
  let options = {
    method,
    headers: {
      "app-id": API_KEY,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    ...((method.toLowerCase() !== "get" && method.toLowerCase() !== "delete") && { body: JSON.stringify(payload) }),
  };
  const response = await fetch(BASE_URL + endpoint, options);
  const { data } = await response.json();
  return data;
}

async function drawPosts() {
  let data = await makeQuery(`post?page=1&limit=10`);
  for (let post of data) {
    let postDiv = document.createElement(`div`);
    let postP = document.createElement(`p`);
    postDiv.classList.add(`post--card`);
    postDiv.setAttribute(`id`, post.id);
    postP.innerHTML = `${post.text}`;
    postP.style.color = `red`;
    postDiv.appendChild(postP);
    let commentData = await makeQuery(`post/${post.id}/comment`);
    for (let comm of commentData) {
      let p = document.createElement(`p`);
      let h5 = document.createElement(`h5`);
      let buttonDel = document.createElement(`button`);
      buttonDel.setAttribute(`idComment`, comm.id);
      buttonDel.setAttribute(`onclic`, `deleteComment()`);
      let br = document.createElement(`br`);
      buttonDel.innerHTML = `Delete`;
      buttonDel.style.backgroundColor = `red`;
      h5.innerHTML = `${comm.owner.firstName} ${comm.owner.lastName}`;
      h5.style.borderTop = `1px solid gray`;
      p.innerHTML = `${comm.message}`;
      p.style.borderBottom = `1px solid gray`;
      postDiv.appendChild(h5);
      postDiv.appendChild(p);
      postDiv.appendChild(buttonDel);
      postDiv.appendChild(br);
    }
    let inputComm = document.createElement(`input`);
    let buttonComm = document.createElement(`button`);
    buttonComm.innerHTML = `Send Comment`;
    buttonComm.setAttribute(`idPostButton`, post.id);
    inputComm.setAttribute(`idPostInput`, post.id);
    buttonComm.classList.add(`PostButton`);
    inputComm.classList.add(`PostInput`);
    postDiv.appendChild(inputComm);
    postDiv.appendChild(buttonComm);
    mainDiv.appendChild(postDiv);
  }
}

drawPosts()
// .then(async () => {
//     let buttonArr = document.querySelectorAll(`.PostButton`);
//     let inputArr = document.querySelectorAll(`.PostInput`);
//     for (let but of buttonArr) {
//       but.addEventListener(`click`, () => {
//         for (let inp of inputArr) {
//           if (
//             but.getAttribute(`idPostButton`) == inp.getAttribute(`idPostInput`)
//           ) {
//             makeQuery(`comment/create`, `POST`, {
//               message: `${inp.value}`,
//               owner: localStorage.getItem(`authorizedUser`),
//               post: but.getAttribute(`idpostbutton`),
//             });
//           }
//         }
//       });
//     }
//   });
async function drawCustomPost() {
  let data = await makeQuery(`post?created=1`);
  let commentData = await makeQuery(`comment?created=1?limit=100000`);
  console.log(data);
  for (let post of data) {
    let postDiv = document.createElement(`div`);
    let postP = document.createElement(`p`);
    postDiv.classList.add(`post--card`);
    postDiv.setAttribute(`id`, post.id);
    postP.innerHTML = `${post.text}`;
    postP.style.color = `red`;
    postDiv.appendChild(postP);
    for (let comm of commentData) {
      if(comm.post == post.id){
        let p = document.createElement(`p`);
        let h5 = document.createElement(`h5`);
        let buttonDel = document.createElement(`button`);
        buttonDel.setAttribute(`idComment`, comm.id);
        buttonDel.setAttribute(`onclick`, `deleteComment('${comm.id}')`);
        let br = document.createElement(`br`);
        buttonDel.innerHTML = `Delete`;
        buttonDel.style.backgroundColor = `red`;
        h5.innerHTML = `${comm.owner.firstName} ${comm.owner.lastName}`;
        h5.style.borderTop = `1px solid gray`;
        p.innerHTML = `${comm.message}`;
        p.style.borderBottom = `1px solid gray`;
        postDiv.appendChild(h5);
        postDiv.appendChild(p);
        postDiv.appendChild(buttonDel);
        postDiv.appendChild(br);    
      }
    }
    let inputComm = document.createElement(`input`);
    let buttonComm = document.createElement(`button`);
    buttonComm.innerHTML = `Send Comment`;
    buttonComm.setAttribute(`idPostButton`, post.id);
    inputComm.setAttribute(`idPostInput`, post.id);
    buttonComm.classList.add(`PostButton`);
    inputComm.classList.add(`PostInput`);
    postDiv.appendChild(inputComm);
    postDiv.appendChild(buttonComm);
    mainDiv.appendChild(postDiv);
  }
}
drawCustomPost().then(async () => {
  let buttonArr = document.querySelectorAll(`.PostButton`);
  let inputArr = document.querySelectorAll(`.PostInput`);
  for (let but of buttonArr) {
    but.addEventListener(`click`, () => {
      for (let inp of inputArr) {
        if (
          but.getAttribute(`idPostButton`) == inp.getAttribute(`idPostInput`)
        ) {
          makeQuery(`comment/create`, `POST`, {
            message: `${inp.value}`,
            owner: localStorage.getItem(`authorizedUser`),
            post: but.getAttribute(`idPostButton`),
          });
        }
      }
    });
  }
});
const createInp = document.querySelector(`#postText`);
createBut.addEventListener(`click`, () => {
  makeQuery(`post/create`, `POST`, {
    text: `${createInp.value}`,
    image: `https://www.youtube.com`,
    likes: 0,
    tags: [],
    owner: localStorage.getItem(`authorizedUser`),
  });
  setTimeout(()=>{
    location.href = `postspage.html`;
  }, 2000)
});
function deleteComment(id) {
  makeQuery(`comment/${id}`, `DELETE`);
  drawCustomPost()
}
