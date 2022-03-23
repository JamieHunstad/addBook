function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

function UI(){
}

UI.prototype.addBookToList = function(book) {
    const list = document.querySelector("#bookList");
    const row = document.createElement("tr"); //CREATE ELEMENT HILIGHT THIS
    
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</td>
    ` //HILIGHT INNERHTML

    list.appendChild(row) // HILIGHT APPEND CHILD
}

document.getElementById("bookForm").addEventListener("submit", function(e){
    const bookTitle = document.querySelector(".bookInput").value;
    const authorTitle = document.querySelector(".authorInput").value;
    const isbnTitle = document.querySelector(".isbnInput").value;

    const book = new Book(bookTitle, authorTitle, isbnTitle);

    const ui = new UI();

    ui.addBookToList(book);


    e.preventDefault();
})