const addListModal = document.getElementById('add-modal');
const addListBtn = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddAction = addListModal.querySelector('.btn--passive');
const confirmAddAction = cancelAddAction.nextElementSibling;
const createListNode = document.getElementById('createListNode');
//get Input field
const userInputs = addListModal.querySelectorAll('input');
let myNodelist = addListModal.querySelector('#task-list');
console.log(userInputs);

// place to show your list
const entryTextSection = document.getElementById('entry-text');
const deleteListModal = document.getElementById('delete-modal');
const editListModal = document.getElementById('edit-modal');

// temporary array
const MAX = 5;
const MIN = 1;
const movies = [];
const imgUrls = [
  './img/cute1.png',
  './img/cute2.png',
  './img/cute3.png',
  './img/cute4.png',
  './img/cute5.png',
];
const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

// update classlist with display block or none
const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
};

//Show pop message of input list
const showListModal = () => {
  addListModal.classList.add('visible');
  toggleBackdrop();
};

const cancelAddHandler = () => {
  closeListModal();
  toggleBackdrop();
  clearInput();
};

//Close
const closeListModal = () => {
  addListModal.classList.remove('visible');
};

//Clear input
const clearInput = () => {
  for (const usrInput of userInputs) {
    usrInput.value = '';
  }
};

const closeDeletionModal = () => {
  toggleBackdrop();
  deleteListModal.classList.remove('visible');
};

const deleteWithId = (Id) => {
  let Index = 0;
  for (const movie of movies) {
    if (movie.id === Id) {
      break;
    }
    Index++;
  }
  movies.splice(Index, 1);
  const listRoot = document.getElementById('list-content');
  listRoot.children[Index].remove();
  listRoot.removeChild(listRoot.children[Index]);
  closeDeletionModal();
  updateUI();
};

const deleteListHandler = (listId) => {
  deleteListModal.classList.add('visible');
  toggleBackdrop();

  const cancelBtn = deleteListModal.querySelector('.btn--passive');
  let confirmBtn = deleteListModal.querySelector('.btn--danger');

  confirmBtn.replaceWith(confirmBtn.cloneNode(true));

  confirmBtn = deleteListModal.querySelector('.btn--danger');

  cancelBtn.removeEventListener('click', closeDeletionModal);

  cancelBtn.addEventListener('click', closeDeletionModal);
  confirmBtn.addEventListener('click', deleteListHandler.bind(null, listId));
};

// create HTML for input text
// need pre input list
const renderNewListElement = (id, title, imageUrl, rating, ulist) => {
  const newEl = document.createElement('li');
  newEl.className = 'list-element';
  newEl.innerHTML = `
  <div class="list-element__image">
  <img src=${imageUrl} alt=${id} class="round-img">
  </div>
  <div class="list-element__info">
  <div class="wrapper-title alert-dark">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
  </div>
  <div class="wrapper-content">
      <ul>
      </ul>
      <button class="btn  btn-primary update ">EDIT</button>
      <button class="btn  btn-danger delete ">DELETE</button>
  </div>
  </div>
  `;
  ulistEl = newEl.querySelector('.wrapper-content').querySelector('ul');
  for (el of ulist) {
    ulistEl.appendChild(el);
  }
  console.log(ulist);
  console.log(newEl.innerHTML);
  // newEl.addEventListener('click', deleteListHandler.bind(null, id));
  const listRoot = document.getElementById('list-content');
  listRoot.append(newEl);
};

//Confirm save New
const confirmAddHandler = () => {
  const titleValue = userInputs[0].value;
  console.log(titleValue);
  const ratingValue = userInputs[1].value;
  console.log(ratingValue);
  const imageUrlValue = imgUrls[Math.floor(Math.random() * (MAX - MIN + 1))];
  console.log(Math.random() * (MAX - MIN + 1));
  const ListItems = myNodelist.querySelectorAll('li'); // array here
  console.log(ListItems);
  if (
    titleValue.trim() === '' ||
    ratingValue.trim() === '' ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert('Please enter valid values (rating between 1 and 5).');
    return;
  }

  const newList = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
    ulist: ListItems,
  };

  movies.push(newList);
  console.log(newList);
  closeListModal();
  toggleBackdrop();
  clearInput();
  renderNewListElement(
    newList.id,
    newList.title,
    newList.image,
    newList.rating,
    newList.ulist
  );
  updateUI();
};

//backdropLCickHandler
const backdropClickHandler = () => {
  closeListModal();
  closeDeletionModal();
  clearInput();
};
/**
 * task list
 *
 */

// Create a new list item when clicking on the "Add" button
const subListElement = () => {
  console.log(myNodelist);
  const limit = document.getElementById('task-list').dataset.limit;
  console.log(myNodelist.childNodes.length);
  if (myNodelist.childNodes.length < limit) {
    let li = document.createElement('li');
    let inputValue = document.getElementById('taskValue').value;
    let t = document.createTextNode(inputValue);
    li.className = 'task-element';
    li.appendChild(t);
    createCloseTask(li);
    if (inputValue === '') {
      alert('You must write something!');
    } else {
      document.getElementById('task-list').appendChild(li);
    }
    document.getElementById('taskValue').value = '';

    closeTask();
  } else {
    alert('Only 5');
  }
};

// Create a "close" button and append it to each list item
const createCloseTask = (t) => {
  console.log(t);

  const hasSpan = t.querySelector('span');
  console.log(hasSpan);
  if (!hasSpan) {
    var span = document.createElement('span');
    // var txt = document.createTextNode('\u00D7');
    span.className = 'close btn btn--danger fas fa-times';
    // span.appendChild(txt);
    t.appendChild(span);
  }
};

// Click on a close button to hide the current list item
const closeTask = () => {
  let close = document.getElementsByClassName('close btn btn--danger');
  let j;
  for (j = 0; j < close.length; j++) {
    close[j].onclick = function () {
      var div = this.parentElement;
      myNodelist.removeChild(div);
    };
  }
};

// Add a "checked" symbol when clicking on a list item
let list = document.getElementById('task-list');
list.addEventListener(
  'click',
  (ev) => {
    if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');
    }
  },
  false
);

//Click ADD => show
addListBtn.addEventListener('click', showListModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddAction.addEventListener('click', cancelAddHandler);
confirmAddAction.addEventListener('click', confirmAddHandler);
createListNode.addEventListener('click', subListElement);
