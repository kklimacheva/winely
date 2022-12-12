async function loadReviews() {
    clearReviewsSection()

    let loadingSection = document.getElementById('preloader');
    let reviews = document.getElementById('reviews');
    let randomNumber = Math.floor(Math.random() * 100 + 1);
    let response;
    let comments;

    loadingSection.innerHTML += `
            <div class="preloader"></div>
        `;

    try {
        response = await fetch(`https://jsonplaceholder.typicode.com/posts/${randomNumber}/comments`);
        comments = await response.json();
    } catch(error) {
        alert("Oops! Something went wrong.")
    }

    loadingSection.innerHTML = ''

    comments.forEach(comment => {
        let reviewItem = document.querySelector('#reviewItem');
        let clone = reviewItem.content.cloneNode(true);

        let name = clone.querySelector('div h3');
        let text = clone.querySelector('div div');

        name.innerHTML = comment.name;
        text.innerHTML = comment.body;

        reviews.appendChild(clone);
    })
}

function getReviewsButtonOnClickHandler() {
    let getReviewsButton = document.getElementById('getReviewsButton');

    getReviewsButton.addEventListener('click', event => loadReviews());
}

function clearReviewsSection() {
    let reviews = document.getElementById('reviews');

    reviews.innerHTML = ''
}

document.addEventListener('DOMContentLoaded', event => getReviewsButtonOnClickHandler())