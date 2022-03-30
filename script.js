
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


class UI {

    addBookToList(book) {
        const list = document.querySelector("#bookList");
        const row = document.createElement("tr");
        
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</td>
        ` //HILIGHT INNERHTML
    
        list.appendChild(row) 
    }

    showError(message) {

        let tableContainer = document.querySelector(".mainTable");
        let bodyWrapper = document.querySelector(".centerContent");

        let newDiv = document.createElement("div");

        newDiv.className = "alert";

        newDiv.appendChild(document.createTextNode(message));

        bodyWrapper.insertBefore(newDiv,tableContainer);
        
        setTimeout(function(){
            document.querySelector(".alert").remove();
        }, 3000);
    }

    deleteBook(target) {
        if(target.className === "delete"){
            target.parentElement.parentElement.remove();
        }
    }

    clearFields(){
        document.querySelector(".bookInput").value = "";
        document.querySelector(".authorInput").value = "";
        document.querySelector(".isbnInput").value = "";
    }

}


class Store {

    static getBook() {
        let book;
        if(localStorage.getItem("book") === null){
            book = []
        } else {
            book = JSON.parse(localStorage.getItem("book"));
        }
        return book;
    }
    static displayBook() {
        const books = Store.getBook();

        books.forEach((book) => {
            const ui = new UI;

            ui.addBookToList(book);
        });
    }
    static addBook(book) {
        const books = Store.getBook();

        books.push(book);

        localStorage.setItem("book", JSON.stringify(books));
    }
    static removeBook(isbn) {

        const books = Store.getBook();
        books.forEach((book, index) => {
            if(book.isbn === isbn ) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem("book", JSON.stringify(books));
    }

}

document.addEventListener("DOMContentLoaded", Store.displayBook);

document.getElementById("bookForm").addEventListener("submit", function(e){
    const bookTitle = document.querySelector(".bookInput").value;
    const authorTitle = document.querySelector(".authorInput").value;
    const isbnTitle = document.querySelector(".isbnInput").value;

    const book = new Book(bookTitle, authorTitle, isbnTitle);

    const ui = new UI();


    if (bookTitle === "" || authorTitle === "" || isbnTitle === ""){

        ui.showError("Please add info");

    } else {
        ui.addBookToList(book);
        ui.clearFields();

        Store.addBook(book);
    }


    e.preventDefault();
})

// Delete Book
let mainTable = document.querySelector(".mainTable");

mainTable.addEventListener("click", (e) => {
    const ui = new UI();
    ui.deleteBook(e.target); 
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent); // Getting ISBN
});