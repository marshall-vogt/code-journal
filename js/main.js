// Get Photo URL input value and assign to img element src attribute

const photoUrl = document.querySelector('#photo-url');
const image = document.querySelector('img');

photoUrl.addEventListener('input', updatePhoto);

function updatePhoto(event) {
  image.setAttribute('src', photoUrl.value);
}
