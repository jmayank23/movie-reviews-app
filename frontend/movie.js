const url = new URL(location.href); // get the current URL
const movieId = url.searchParams.get("id");
console.log("MovieID from URL:", movieId, "Type:", typeof movieId);
const movieTitle = url.searchParams.get("title");

// Update the API link to use the local backend server
const APILINK = 'http://localhost:8000/api/v1/reviews/';

const main = document.getElementById("section");
const title = document.getElementById("title");

title.innerText = movieTitle;

// Could have done this in the HTML file as well. 
// How to figure out HTML vs JS? If we are not using any variables then we can put it in the HTML file.
const div_new = document.createElement('div');
div_new.innerHTML = `
<div class="row">
  <div class="column">
    <div class="card">
      New Review
      <p><strong>Review: </strong>
        <input type="text" id="new_review" value="" />
      </p>
      <p><strong>User: </strong>
        <input type="text" id="new_user" value="" />
      </p>
      <p>
        <a href="#" onclick="saveReview('new_review', 'new_user')">Save</a>
      </p>
    </div>
  </div>
</div>
`
// note, we are only passing two parameters to saveReview instead of three, because we dont have a review id yet.

main.appendChild(div_new);

returnReviews(APILINK);


function returnReviews(url) {
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
  •	float: left; makes each .column float next to the previous column if there's space available.
  •	width: 25%; means 4 columns fit in one horizontal "row" area (4 × 25% = 100% of the container width).
  •	If you place more than 4 columns, the 5th floats down to a new row (wraps around automatically).

  •	The confusion here is that for each movie you're also creating a new div_row. Typically, you'd create one .row and multiple .column elements inside it. However, because each movie is wrapped in its own .row, you might expect them to stack top-to-bottom. But since each iteration is also creating div_row, you may see each card on its own row unless you rely on the float behavior and certain sizing quirks.
  */

  fetch(url + "movie/" + movieId).then(res => res.json())
    .then(function(data) {
      console.log(data);
      data.forEach(review => {
        const div_card = document.createElement('div');
        div_card.innerHTML = `
        <div class="row">
          <div class="column">
            <div class="card" id="${review._id}">
              <p><strong>Review: </strong>${review.review}</p>
              <p><strong>User: </strong>${review.user}</p>
              <p>
                <a href="#" onclick="editReview('${review._id}', '${review.review}', '${review.user}')">Edit</a>
                <a href="#" onclick="deleteReview('${review._id}')">Delete</a>
              </p>
            </div>
          </div>
        </div>
      `

        main.appendChild(div_card);
      })
    })
}

function editReview(id, review, user) {

  const element = document.getElementById(id);
  const reviewInputId = "review" + id; // we are creating a unique id for each review
  const userInputId = "user" + id;

  // we are replacing the innerHTML of div_card in returnReviews() with the following:
  element.innerHTML = `
  <p><strong>Review: </strong>
    <input type="text" id="${reviewInputId}" value="${review}">
  </p>
  <p><strong>User: </strong>
    <input type="text" id="${userInputId}" value="${user}">
  </p>
  <p>
    <a href="#" onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}', )">Save</a>
  </p>
  `
}

function saveReview(reviewInputId, userInputId, id="") {
  const review = document.getElementById(reviewInputId).value;
  const user = document.getElementById(userInputId).value;
  
  if (!review || !user) {
    alert("Please fill in both review and user fields");
    return;
  }

  if (id) {
    fetch(APILINK + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "user": user, "review": review})
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        location.reload();
      })
  }
  else {
    const requestBody = { "user": user, "review": review, "movieId": parseInt(movieId) };
    console.log("Sending review data:", requestBody);
    console.log("To endpoint:", APILINK + "new");
    
    fetch(APILINK + "new", {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    }).then(res => {
      console.log("Response status:", res.status);
      console.log("Response headers:", [...res.headers].map(h => `${h[0]}: ${h[1]}`).join(', '));
      return res.json();
    })
      .then(res => {
        console.log("Response data:", res);
        if (res.error) {
          console.error("Server error:", res.error);
          alert("Error saving review: " + res.error);
        } else {
          location.reload();
        }
      })
      .catch(error => {
        console.error("Fetch error:", error);
        alert("Error saving review: " + error.message);
      })
  }
}

function deleteReview(id) {
  fetch(APILINK + id, {
    method: 'DELETE'
  }).then(res => res.json())
    .then(res => {
      console.log(res);
      location.reload();
    })
    .catch(error => {
      console.error(error);
      alert("Error deleting review");
    })
}