let myLibrary = [];

window.addEventListener("load", function () {
  populateStorage();
  render();
});

function populateStorage() {
  if (myLibrary.length === 0) {
    let book1 = new Book("Robinson Crusoe", "Daniel Defoe", "252", true);
    let book2 = new Book("The Old Man and the Sea", "Ernest Hemingway", "127", true);
    myLibrary.push(book1, book2);
  }
}

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const check = document.getElementById("check");

// Add a new book to the library
function addBook() {
  if (!title.value.trim() || !author.value.trim() || !pages.value.trim()) {
    alert("Please fill all fields!");
    return;
  }
  let book = new Book(title.value.trim(), author.value.trim(), pages.value, check.checked);
  myLibrary.push(book);
  render();
}

// Book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = read;
}

// Render the library table
function render() {
  let table = document.getElementById("display");
  let rowsNumber = table.rows.length;

  // Clear existing rows (except the header)
  for (let n = rowsNumber - 1; n > 0; n--) {
    table.deleteRow(n);
  }

  // Populate the table with updated library data
  myLibrary.forEach((book, i) => {
    let row = table.insertRow(1);
    row.insertCell(0).innerText = book.title;
    row.insertCell(1).innerText = book.author;
    row.insertCell(2).innerText = book.pages;

    // Add read/unread toggle button
    let wasReadCell = row.insertCell(3);
    let changeBut = document.createElement("button");
    changeBut.className = "btn btn-success";
    changeBut.innerText = book.check ? "Yes" : "No";
    changeBut.addEventListener("click", function () {
      book.check = !book.check;
      render();
    });
    wasReadCell.appendChild(changeBut);

    // Add delete button
    let deleteCell = row.insertCell(4);
    let delButton = document.createElement("button");
    delButton.className = "btn btn-primary";
    delButton.textContent = "Delete";
    delButton.addEventListener("click", function () {
      if (confirm(`Delete "${book.title}" from your library?`)) {
        myLibrary.splice(i, 1);
        render();
      }
    });
    deleteCell.appendChild(delButton);
  });
}