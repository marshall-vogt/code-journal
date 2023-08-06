// Issue 1, Task #5- Add Photo URL event listener

const $photoUrl = document.querySelector('#photo-url');
const $image = document.querySelector('img');

$photoUrl.addEventListener('input', updatePhoto);

function updatePhoto(event) {
  $image.setAttribute('src', $photoUrl.value);
}

// Issue 1, Task #6- Add submit event listener

const $entryForm = document.querySelector('form');
$entryForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const inputValues = {
    title: $entryForm[0].value,
    photoURL: $entryForm[1].value,
    notes: $entryForm[4].value,
  };
  if (event.submitter.textContent === 'SAVE') {
    if (data.editing === null) {
      inputValues.entryId = data.nextEntryId;
      data.nextEntryId++;
      data.entries.unshift(inputValues);
      $image.setAttribute('src', 'images/placeholder-image-square.jpg');
      $ul.prepend(renderEntry(inputValues));
    } else {
      inputValues.entryId = data.editing.entryId;
      for (let i = 0; i < data.entries.length; i++) {
        if (data.entries[i].entryId === inputValues.entryId) {
          data.entries[i] = inputValues;
        }
      }
      const $oldLi = document.querySelector(
        `li[data-entry-id="${inputValues.entryId}"]`
      );
      const newLi = renderEntry(inputValues);
      $oldLi.replaceWith(newLi);
      $h1.textContent = 'New Entry';
      data.editing = null;
    }
    viewSwap('entries');
    toggleNoEntries();
  } else if (event.submitter.textContent === 'Delete Entry') {
    openModal();
  }
}

// Issue 2, Task #4

function renderEntry(entry) {
  const $li = document.createElement('li');
  const $div1 = document.createElement('div');
  const $div2 = document.createElement('div');
  const $div3 = document.createElement('div');
  const $img = document.createElement('img');
  const $h2 = document.createElement('h2');
  const $p = document.createElement('p');
  const $i = document.createElement('i');
  $div1.setAttribute('class', 'row');
  $div2.setAttribute('class', 'column-half');
  $div3.setAttribute('class', 'column-half');
  $img.setAttribute('src', entry.photoURL);
  $img.setAttribute('alt', entry.title + ' image');
  $h2.setAttribute('class', 'entry-title');
  $p.setAttribute('class', 'entry-content');
  $i.setAttribute('class', 'fa-solid fa-pencil');
  $li.setAttribute('data-entry-id', entry.entryId);
  $h2.textContent = entry.title;
  $p.textContent = entry.notes;

  $li.appendChild($div1);
  $div1.appendChild($div2);
  $div1.appendChild($div3);
  $div2.appendChild($img);
  $div3.appendChild($h2);
  $h2.appendChild($i);
  $div3.appendChild($p);

  return $li;
}

// Issue 2, Task #5

const $ul = document.querySelector('ul');
document.addEventListener('DOMContentLoaded', generateDomTree);

function generateDomTree(event) {
  for (let i = 0; i < data.entries.length; i++) {
    const entryDom = renderEntry(data.entries[i]);
    $ul.appendChild(entryDom);
  }
  viewSwap(data.view);
  if (data.entries.length !== 0) {
    toggleNoEntries();
  }
}
// Issue 2, Task #7 Define toggleNoEntries function
const $noEntries = document.querySelector('#no-entries');

function toggleNoEntries() {
  if (data.entries.length === 0) {
    $noEntries.setAttribute('class', 'no-entries');
  } else {
    $noEntries.setAttribute('class', 'hidden');
  }
}

// Issue 2, Task #8 Define viewSwap function
const $entriesView = document.querySelector('#entries');
const $entryFormView = document.querySelector('#entry-form');

function viewSwap(viewName) {
  if (viewName === 'entries') {
    $entriesView.setAttribute('class', 'row');
    $entryFormView.setAttribute('class', 'hidden');
    data.view = viewName;
  } else if (viewName === 'entry-form') {
    $entriesView.setAttribute('class', 'hidden');
    $entryFormView.setAttribute('class', 'row');
    data.view = viewName;
  }
}

// Issue 2
const $entriesAnchor = document.querySelector('.entries-anchor');
$entriesAnchor.addEventListener('click', entriesViewSwap);

function entriesViewSwap() {
  viewSwap('entries');
}

const $entryFormAnchor = document.querySelector('.entry-form-anchor');
$entryFormAnchor.addEventListener('click', entryFormViewSwap);
const $deleteEntry = document.querySelector('#delete-button');

function entryFormViewSwap() {
  $entryForm.reset();
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $h1.textContent = 'New Entry';
  $deleteEntry.setAttribute('class', 'delete-button visibility');
  viewSwap('entry-form');
}

// Issue 3, Task #2
const $title = document.querySelector('#title');
const $notes = document.querySelector('#notes');
const $h1 = document.querySelector('h1');

$ul.addEventListener('click', pencilClick);

function pencilClick(event) {
  if (event.target.tagName === 'I') {
    const closestLI = event.target.closest('li');
    const liEntryId = closestLI.getAttribute('data-entry-id');
    viewSwap('entry-form');
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === Number(liEntryId)) {
        data.editing = data.entries[i];
        $title.value = data.editing.title;
        $notes.value = data.editing.notes;
        $image.setAttribute('src', data.editing.photoURL);
        $photoUrl.value = data.editing.photoURL;
        $h1.textContent = 'Edit Entry';
      }
    }
    $deleteEntry.setAttribute('class', 'delete-button shown');
  }
}

// Modal functions
const $overlay = document.querySelector('.overlay');
const $modal = document.querySelector('.modal');
const $cancelButton = document.querySelector('.cancel-button');
$cancelButton.addEventListener('click', closeModal);
const $confirmButton = document.querySelector('.confirm-button');
$confirmButton.addEventListener('click', handleConfirm);

function openModal(event) {
  $overlay.className = 'overlay shown';
  $modal.className = 'modal shown';
}

function closeModal(event) {
  $overlay.className = 'overlay hidden';
  $modal.className = 'modal hidden';
}

function handleConfirm(event) {
  const $allLiElements = document.querySelectorAll('li');

  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i] === data.editing) {
      data.entries.splice(i, 1);
    }
  }

  for (let j = 0; j < $allLiElements.length; j++) {
    if (
      Number($allLiElements[j].getAttribute('data-entry-id')) ===
      data.editing.entryId
    ) {
      $allLiElements[j].remove();
    }
  }

  if (data.entries.length === 0) {
    toggleNoEntries();
    data.nextEntryId = 1;
  }
  data.editing = null;
  closeModal();
  viewSwap('entries');
}
