function getRandomInt() {
    return Math.floor(Math.random() * 20) + 1;
  }

let myBooks = [];
class Book{
    constructor(title, author, date, read, bookcolor){
    this.title = title;
    this.author = author;
    this.date = date;
    this.read = read;
    this.bookcolor = bookcolor;    
    }    
  }
  let opened = 0;
const openFormBtn = document.getElementById('show-form');
const wrapper = document.getElementById('wrapper');
openFormBtn.onclick = function(){
    openForm();
}
const closeFormBtn = document.getElementById('close-form');
closeFormBtn.onclick = function(){
    openForm();
}
function openForm(){
    let addForm = document.getElementById('book-form');
    if (!opened){
        addForm.style.width = '60vmin';
        wrapper.style.zIndex = '1'
        opened = 1;
    }else{
        addForm.style.width = '0';
        wrapper.style.zIndex = '-1'
        opened = 0;
    }
}
const addBookBtn = document.getElementById('add-book-btn');
const editBookBtn = document.getElementById('edit-book-btn');
const dltBookBtn = document.getElementById('dlt-book-btn');
function clear(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('release-year').value = '';
    document.getElementById('read').value = 0;
    document.getElementById('book-color').value = '#281010';
    editIndex = null;
    document.getElementById('add-book-btn').removeAttribute('disabled');
    document.getElementById('dlt-book-btn').setAttribute('disabled', true);
    document.getElementById('edit-book-btn').setAttribute('disabled', true);
}


addBookBtn.onclick = function(){
    if (myBooks.length < 32){
    let currIndex = myBooks.length;
    const bookTitle = document.getElementById('title').value;
    const bookAuthor = document.getElementById('author').value;
    const bookDate = document.getElementById('release-year').value;
    const bookRead = document.getElementById('read').value;
    const bookColor = document.getElementById('book-color').value;
    myBooks.push(new Book(bookTitle, bookAuthor, bookDate, bookRead, bookColor));
    addBookToShelf(currIndex); 
    clear();
    }
}
let editIndex;
editBookBtn.onclick = function(){
    if(editIndex != null){
    myBooks[editIndex].title = document.getElementById('title').value;
    myBooks[editIndex].author = document.getElementById('author').value;
    myBooks[editIndex].date = document.getElementById('release-year').value;
    myBooks[editIndex].read = document.getElementById('read').value;
    myBooks[editIndex].bookcolor = document.getElementById('book-color').value;
    let editTitle = document.querySelectorAll('.title');
    editTitle[editIndex].textContent = myBooks[editIndex].title;
    let editColor = document.querySelectorAll('.color-mark');
    editColor[editIndex].style.backgroundColor = document.getElementById('book-color').value;
    clear();
    }
   
}
dltBookBtn.onclick = function(){
    if(editIndex!=null){
        myBooks.splice(editIndex, 1);
    while (bookshelf.hasChildNodes()) {
        bookshelf.removeChild(bookshelf.firstChild);
      }
    v = 0;
    myBooks.forEach(element => {
    addBookToShelf(v);
    v++;
    });
    clear();  
    }   
}
const bookshelf = document.getElementById('bookshelf');
function addBookToShelf(index){
    let thisBookHolder = document.createElement('div');
    thisBookHolder.classList.add('book-holder');
    
    let thisBook = document.createElement('div');
    thisBook.classList.add('book');
    thisBook.style.height = 80 + getRandomInt()+'%';
    thisBookHolder.appendChild(thisBook);
    thisBook.onclick = function(){
        document.getElementById('title').value = myBooks[index].title;
        document.getElementById('author').value = myBooks[index].author;
        document.getElementById('release-year').value = myBooks[index].date;
        document.getElementById('read').value = myBooks[index].read
        document.getElementById('book-color').value = myBooks[index].bookcolor;
        editIndex = index;

        document.getElementById('add-book-btn').setAttribute('disabled', true);
        document.getElementById('dlt-book-btn').removeAttribute('disabled');
        document.getElementById('edit-book-btn').removeAttribute('disabled');
    }
    let colorMark = document.createElement('div');
    colorMark.classList.add('color-mark');
    thisBook.appendChild(colorMark);
    colorMark.style.backgroundColor = myBooks[index].bookcolor;
    
    let thisBookTitleHolder = document.createElement('div');
    thisBookTitleHolder.classList.add('title-holder');
    let thisBookTitle = document.createElement('div');
    thisBookTitle.classList.add('title');
    thisBookTitle.textContent = myBooks[index].title;
    thisBookTitleHolder.appendChild(thisBookTitle);
    thisBook.appendChild(thisBookTitleHolder);
    bookshelf.appendChild(thisBookHolder);
}

myBooks.push(new Book('The Hobbit', 'J.R.R Tolkien',1890, '0', '#862727'));
myBooks.push(new Book('Percy Jackson', 'Rick Riordan',2008, '1', '#2d314e'));

let v = 0;
myBooks.forEach(element => {
    addBookToShelf(v);
    v++;
});