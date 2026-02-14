const movieListEl = document.querySelector('.movie-list');
const form = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-input");
const posterViewEl = document.querySelector(".poster-view");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  posterViewEl.innerHTML = "";
  movieListEl.innerHTML = ""; // optional: clear old results

  const query = searchInput.value.trim();
  if (query) {
    fetchMovies(query);
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

  movieListEl.innerHTML = data.Search
    .map(movie => movieCardHTML(movie))
    .join("");
}


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


// Fetch full movie details and show poster
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
}


