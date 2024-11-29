// Api url
const API_URL = "https://api.github.com/users/";

//   ! Access elements in HTML
const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

// get data with axios
async function getUsers(username) {
  try {
    const { data } = await axios(API_URL + username);
    //create card element
    createUserCard(data);
    // get user's repo
    getRepos(username);
  } catch (err) {
    // console.log(err);
    createErrorCard("Üzgünüz aradığın kullanıcı bulunamadı.. :(");
  }
}

//form submit
form.addEventListener("submit", (e) => {
  // prevent page refresh
  e.preventDefault();

  //   get the value entered into input
  const user = search.value;
  if (user) {
    //call function
    getUsers(user);

    //clear input value
    search.value = "";
  }
});

//creat user card function
function createUserCard(user) {
  const userName = user.name || user.login;
  const userBio = user.bio ? `<p> ${user.bio} </p>` : " ";

  //edit card HTML
  const cardHTML = `
    <div class="card">
        <img src="${user.avatar_url}" class="user-image" alt="${user.name}" />
        <div class="user-info">
          <div class="user-name">
            <h2>${userName}</h2>
            <small>${user.login}</small>
          </div>
        </div>
        <p>
          ${userBio}
        </p>
        <ul>
          <li>
            <i class="fa-solid fa-user-group"></i> ${user.followers}
            <strong>Fallowers</strong>
          </li>
          <li>${user.following} <strong>Following</strong></li>
          <li>
            <i class="fa-solid fa-bookmark"></i> ${user.public_repos} <strong>Repository</strong>
          </li>
        </ul>

        <div class="repos" id="repos">
        </div>
      </div>`;
  main.innerHTML = cardHTML;
}

//create Error message function
function createErrorCard(msg) {
  const cardErrorHTML = `
    <div class="card">
    <h2>${msg}</h2>
    </div>`;
  main.innerHTML = cardErrorHTML;
}

// ! get user's repo function
async function getRepos(username) {
  try {
    const { data } = await axios(API_URL + username + "/repos");
    addReposToCard(data);
  } catch (err) {
    createErrorCard("Üzgünüz repoları çekerken hata oluştu :(");
  }
}

// add repo to card function
function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");
  // add 3 repo
  repos.slice(0, 3).forEach((repo) => {
    const reposLink = document.createElement("a");
    reposLink.href = repo.html_url;
    reposLink.target = "_blank";
    reposLink.innerHTML = `<i class="fa-solid fa-book-bookmark"></i> ${repo.name}`;
    reposEl.appendChild(reposLink);
  });
}
