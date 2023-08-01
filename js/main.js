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
    notes: $entryForm[2].value,
  };
  inputValues.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(inputValues);
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
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
  $div1.setAttribute('class', 'row');
  $div2.setAttribute('class', 'column-half');
  $div3.setAttribute('class', 'column-half');
  $img.setAttribute('src', data.entries[entry].photoURL);
  $h2.setAttribute('class', 'entry-title');
  $p.setAttribute('class', 'entry-content');
  $h2.textContent = data.entries[entry].title;
  $p.textContent = data.entries[entry].notes;

  $li.appendChild($div1);
  $div1.appendChild($div2);
  $div1.appendChild($div3);
  $div2.appendChild($img);
  $div3.appendChild($h2);
  $div3.appendChild($p);

  return $li;
}

// Issue 2, Task #5

const $ul = document.querySelector('ul');

document.addEventListener('DOMContentLoaded', generateDomTree);

function generateDomTree(event) {
  for (let i = 0; i < data.entries.length; i++) {
    const entryDom = renderEntry(i);
    $ul.appendChild(entryDom);
  }
}

// Issue 2, Task #7 Define toggleNoEntries function

function toggleNoEntries() {
  const $noEntries = document.querySelector('#no-entries');
  if ($noEntries.getAttribute('class') === 'no-entries') {
    $noEntries.setAttribute('class', 'hidden');
  } else if ($noEntries.getAttribute === 'hidden') {
    $noEntries.setAttribute('class', 'no-entries');
  }
}

// Issue 2, Task #8 Define viewSwap function

function viewSwap(viewName) {
  const $entriesView = document.querySelector('#entries');
  const $entryFormView = document.querySelector('#entry-form');
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
