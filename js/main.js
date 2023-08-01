// Task #5- Add Photo URL event listener

const $photoUrl = document.querySelector('#photo-url');
const $image = document.querySelector('img');

$photoUrl.addEventListener('input', updatePhoto);

function updatePhoto(event) {
  $image.setAttribute('src', $photoUrl.value);
}

// Task #6- Add submit event listener

const $entryForm = document.querySelector('form');

$entryForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const inputValues = {
    title: $entryForm[0].value,
    photoURL: $entryForm[1].value,
    notes: $entryForm[2].value,
  };
  inputValues.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(inputValues);
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
}
