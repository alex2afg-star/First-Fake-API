const movieListEl = document.querySelector('.movie-list');
const form = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-input");
const posterViewEl = document.querySelector(".poster-view");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal__close");
const nav = document.querySelector("nav");
const headerRow = document.querySelector(".header__row");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Hide both header elements
  nav.classList.add("hidden");
  headerRow.classList.add("hidden");

  posterViewEl.innerHTML = "";

  const query = searchInput.value.trim();
  if (query) {
    fetchMovies(query);
  }
});

function openModal() {
  modal.classList.add("show");
}

function closeModal() {
  modal.classList.remove("show");
}

function showTitlePoster(id) {
  openModal();
}

modalClose.addEventListener("click", closeModal);

// close when clicking outside content
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  posterViewEl.innerHTML = "";
  movieListEl.innerHTML = ""; 

  const query = searchInput.value.trim();
  if (query) {
    fetchMovies(query);
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Hide both header elements
  nav.classList.add("hidden");
  headerRow.classList.add("hidden");

  posterViewEl.innerHTML = "";

  const query = searchInput.value.trim();
  if (query) {
    fetchMovies(query);
  }
});

searchInput.addEventListener("input", () => {
  if (searchInput.value.trim() === "") {
    nav.classList.remove("hidden");
    headerRow.classList.remove("hidden");
  }
});

// Fetch movies based on search
async function fetchMovies(query) {
  const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=ccf21e06`);
  const data = await res.json();

  if (!data.Search) {
    movieListEl.innerHTML = "<p>No results found.</p>";
    return;
  }

  currentResults = data.Search;
  await attachRatings(currentResults);
  renderMovies(currentResults);

  document.querySelector(".filter-bar").classList.remove("hidden");
}

async function attachRatings(list) {
  for (let movie of list) {
    const res = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=ccf21e06`);
    const full = await res.json();
    movie.imdbRating = parseFloat(full.imdbRating) || 0;
  }
}

function renderMovies(list) {
  movieListEl.innerHTML = list
    .map(movie => movieCardHTML(movie))
    .join("");
}

document.getElementById("sortSelect").addEventListener("change", (e) => {
  const value = e.target.value;

  let sorted = [...currentResults];

  if (value === "newest") {
    sorted.sort((a, b) => b.Year - a.Year);
  } else if (value === "oldest") {
    sorted.sort((a, b) => a.Year - b.Year);
  }

  renderMovies(sorted);
});

document.getElementById("alphaSelect").addEventListener("change", (e) => {
  const value = e.target.value;
  let sorted = [...currentResults];

  if (value === "az") {
    sorted.sort((a, b) => a.Title.localeCompare(b.Title));
  } else if (value === "za") {
    sorted.sort((a, b) => b.Title.localeCompare(a.Title));
  }

  renderMovies(sorted);
});


// Movie card component
function movieCardHTML(movie) {
  return `
    <div class="user-card" onclick="showTitlePoster('${movie.imdbID}')">
      <img class="movie-poster" src="${movie.Poster}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p><b>Year:</b> ${movie.Year}</p>
    </div>
  `;
}

async function showTitlePoster(id) {
  const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=ccf21e06`);
  const movie = await res.json();

  posterViewEl.innerHTML = `
    <div class="poster-card">
      <img src="${movie.Poster}" alt="${movie.Title}">
      <h2>${movie.Title}</h2>
      <p><b>Released:</b> ${movie.Released}</p>
      <p><b>Runtime:</b> ${movie.Runtime}</p>
      <p><b>Rated:</b> ${movie.Rated}</p>
      <p><b>Plot:</b> ${movie.Plot}</p>
    </div>
  `;

  // Smooth scroll to the poster
  posterViewEl.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}



