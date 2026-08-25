const repositoryList = document.querySelector("#repository-list");

function formatDate(dateString) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium"
  }).format(new Date(`${dateString}T00:00:00`));
}

function renderRepositories(repositories) {
  if (repositories.length === 0) {
    repositoryList.innerHTML = '<li class="status">No starred repositories yet.</li>';
    return;
  }

  repositoryList.innerHTML = repositories.map((repository) => `
    <li class="repository">
      <h2><a href="${repository.url}">${repository.repository}</a></h2>
      <p>${repository.description}</p>
      <div class="repository-meta">
        <span aria-label="Programming language">${repository.language}</span>
        <span aria-label="Stars">&#9733; ${repository.stars.toLocaleString()} stars</span>
        <span>Starred ${formatDate(repository.starredAt)}</span>
      </div>
    </li>
  `).join("");
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");

    if (!response.ok) {
      throw new Error(`Could not load repositories: ${response.status}`);
    }

    renderRepositories(await response.json());
  } catch (error) {
    repositoryList.innerHTML = '<li class="status">Repositories could not be loaded.</li>';
    console.error(error);
  }
}

loadRepositories();
