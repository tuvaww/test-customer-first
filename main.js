window.onload = () => {
  getAPI(apiUrl);
  getModal();
  closeModal();
};

const apiUrl = "https://reqres.in/api/users/";

async function getAPI(url) {
  const res = await fetch(url);

  let data = await res.json();

  getUsers(data);
}

function getUsers(data) {
  createPersonHTML(data);
}

function createPersonHTML(data) {
  const users = data.data;

  let mainSection = document.getElementsByClassName("mainSection")[0];
  for (let i = 0; i < users.length; i++) {
    let personContainer = document.createElement("article");
    personContainer.classList.add("personContainer");

    let imgContainer = document.createElement("div");
    imgContainer.classList.add("imgContainer");

    let img = document.createElement("img");
    img.classList.add("img");
    img.src = users[i].avatar;
    img.alt = "avatars";
    imgContainer.appendChild(img);

    let nameP = document.createElement("p");
    nameP.classList.add("nameP");
    nameP.innerHTML = users[i].first_name + " " + users[i].last_name;

    personContainer.appendChild(imgContainer);
    personContainer.appendChild(nameP);

    mainSection.appendChild(personContainer);
  }
}

function closeModal() {
  let modal = document.getElementsByClassName("modal")[0];
  let icon = document.getElementsByClassName("bi")[0];

  icon.addEventListener("click", () => {
    modal.remove();
    location.reload();
  });
}

function getModal() {
  let modal = document.createElement("div");
  modal.classList.add("modal");
  modal.style.display = "none";

  let icon = document.createElement("i");
  icon.classList.add("bi");
  icon.classList.add("bi-x-lg");
  modal.appendChild(icon);

  document.body.appendChild(modal);

  let mainSec = document.getElementsByClassName("mainSection")[0];

  mainSec.addEventListener("click", (e) => {
    if (e.target && e.target.classList == "nameP") {
      modal.style.display = "";
      modal.style.zIndex = 1;

      let target = e.target.innerHTML;
      getInfoModal(target, modal);
    }
  });
}

async function getInfoModal(targeted, modal) {
  const res = await fetch(apiUrl);

  let data = await res.json();
  let onlyUsers = data.data;

  for (let i = 0; i < onlyUsers.length; i++) {
    let check = onlyUsers[i].first_name + " " + onlyUsers[i].last_name;

    if (check === targeted) {
      let imgModalContainer = document.createElement("div");
      imgModalContainer.classList.add("imgModalContainer");

      let imgModal = document.createElement("img");
      imgModal.classList.add("imgModal");
      imgModal.src = onlyUsers[i].avatar;
      imgModal.alt = "avatar";

      imgModalContainer.appendChild(imgModal);
      modal.appendChild(imgModalContainer);

      let nameModal = document.createElement("p");
      nameModal.classList.add("nameModal");
      nameModal.innerHTML =
        onlyUsers[i].first_name + " " + onlyUsers[i].last_name;
      modal.appendChild(nameModal);

      let mailModal = document.createElement("p");
      mailModal.classList.add("mailModal");
      mailModal.innerHTML = "Email: " + onlyUsers[i].email;
      modal.appendChild(mailModal);

      let idModal = document.createElement("p");
      idModal.classList.add("idModal");
      idModal.innerHTML = "Id: " + onlyUsers[i].id;
      modal.appendChild(idModal);
    }
  }
}
