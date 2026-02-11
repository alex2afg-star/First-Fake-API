const searchInput = document.querySelector('.search-input');
const movieListEl = document.querySelector('.movie-list');
const posterViewEl = document.querySelector(".poster-view");

// Listen for typing in the search bar
searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim();
  if (query.length > 2) {
    searchMovies(query);
  } else {
    movieListEl.innerHTML = "";
  }
});

// Fetch movies based on search
async function searchMovies(query) {
  posterViewEl.innerHTML = "";
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


