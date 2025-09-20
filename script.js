function main() {
    displayRamens();
    addSubmitListener();
}

document.addEventListener('DOMContentLoaded', main);

function displayRamens() {
    fetch('http://localhost:3000/ramens') // GET all ramen
        .then(res => res.json())
        .then(ramens => {
            const menu = document.getElementById('ramen-menu');
            menu.innerHTML = ""; // clear the menu
            ramens.forEach(ramen => {
                const img = document.createElement('img');
                img.src = ramen.image;
                img.alt = ramen.name;

                // Clicking image shows ramen details
                img.addEventListener('click', () => handleClick(ramen));

                menu.appendChild(img);
            });
        });
}
function handleClick(ramen) {
    const detail = document.getElementById('ramen-detail');
    detail.querySelector('img').src = ramen.image;
    detail.querySelector('img').alt = ramen.name;
    detail.querySelector('.name').textContent = ramen.name;
    detail.querySelector('.restaurant').textContent = ramen.restaurant;
    detail.querySelector('#rating-display').textContent = ramen.rating;
    detail.querySelector('#comment-display').textContent = ramen.comment;
}

function addSubmitListener() {
    const form = document.getElementById('new-ramen');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const newRamen = {
            name: form.name.value,
            restaurant: form.restaurant.value,
            image: form.image.value,
            rating: form.rating.value,
            comment: form['new-comment'].value
        };

        // Add the new ramen to the menu
        const menu = document.getElementById('ramen-menu');
        const img = document.createElement('img');
        img.src = newRamen.image;
        img.alt = newRamen.name;
        img.addEventListener('click', () => handleClick(newRamen));
        menu.appendChild(img);

        form.reset(); // clear the form
    });
}

