const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f9a8dc39f9a72360ff261aad0418e93e&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=f9a8dc39f9a72360ff261aad0418e93e&query=';

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(APILINK);
function returnMovies(url) {
  /*
  Explanation on how each movie is being placed next to each other (multiple in a row) despite the fact that we put only one card in a row and column.
  So for each of the 10 (say) movies:
  1.	You create a new .row
  2.	Inside it, you create a .column
  3.	Inside that .column, you place the .card, which holds the image and title
  4.	Finally, you append this .row to the #section (referred to as main in your JavaScript).
  
  •	In your CSS, you have:
  .column {
    float: left;
    width: 25%;
    padding: 10px 10px;
  }
  •	float: left; makes each .column float next to the previous column if there’s space available.
  •	width: 25%; means 4 columns fit in one horizontal “row” area (4 × 25% = 100% of the container width).
  •	If you place more than 4 columns, the 5th floats down to a new row (wraps around automatically).

  •	The confusion here is that for each movie you’re also creating a new div_row. Typically, you’d create one .row and multiple .column elements inside it. However, because each movie is wrapped in its own .row, you might expect them to stack top-to-bottom. But since each iteration is also creating div_row, you may see each card on its own row unless you rely on the float behavior and certain sizing quirks.
  */
  
  fetch(url).then(res => res.json())
    .then(function(data) {
      console.log(data.results);
      data.results.forEach(element => {
        const div_card = document.createElement('div');
        div_card.setAttribute('class', 'card');
        
        const div_row = document.createElement('div');
        div_row.setAttribute('class', 'row');
        
        const div_column = document.createElement('div');
        div_column.setAttribute('class', 'column');
        
        const image = document.createElement('img');
        image.setAttribute('class', 'thumbnail');
        image.setAttribute('id', 'image');
        
        const title = document.createElement('h3');
        title.setAttribute('id', 'title');
        
        const center = document.createElement('center');

        title.innerHTML = `${element.title}<br><a href="movie.html?id=${element.id}&title=${element.title}">reviews</a>`;
        image.src = IMG_PATH + element.poster_path;
        
        center.appendChild(image);
        div_card.appendChild(center);
        div_card.appendChild(title);
        div_column.appendChild(div_card);
        div_row.appendChild(div_column);

        main.appendChild(div_row);
      })
    })
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  main.innerHTML = ''; // remove previous results

  const searchItem = search.value;

  if (searchItem) {
    returnMovies(SEARCHAPI + searchItem);
    // search.value = "";
  }
})