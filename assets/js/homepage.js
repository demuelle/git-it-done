var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var getUserRepos = function (user) {
  var apiUrl = "https://api.github.com/users/" + user + "/repos";
  var response = fetch(apiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayRepos(data, user);
        });
    } else {
        alert("Error: GitHub User Not Found");
    }
  })
  .catch(function(error) {
      alert("Unable to connect to GitHub");
  });
  console.log("outisde");
};

var formSubmitHandler = function(event) {
    event.preventDefault();
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("WTF");
    }
}

var displayRepos = function(repos, searchTerm) {
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found";
        return;
    }
    repos.forEach(repo => {
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        
        var titleEl = document.createElement("span");
        titleEl.textContent = `${repo.owner.login}/${repo.name}`;

        repoEl.appendChild(titleEl);

        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        if (repo.open_issues_count > 0) {
            statusEl.innerHTML = 
                "<i class='fas fa-times status-icon icon-danger'></i>" + repo.open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        repoEl.appendChild(statusEl);

        repoContainerEl.appendChild(repoEl);
    })
}

userFormEl.addEventListener("submit", formSubmitHandler);

// getUserRepos();
