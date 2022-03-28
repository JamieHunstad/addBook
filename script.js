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

UI.prototype.showError = function(message){

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

UI.prototype.clearFields = function (){
    document.querySelector(".bookInput").value = "";
    document.querySelector(".authorInput").value = "";
    document.querySelector(".isbnInput").value = "";
}

document.getElementById("bookForm").addEventListener("submit", function(e){
    const bookTitle = document.querySelector(".bookInput").value;
    const authorTitle = document.querySelector(".authorInput").value;
    const isbnTitle = document.querySelector(".isbnInput").value;

    const book = new Book(bookTitle, authorTitle, isbnTitle);

    const ui = new UI();


    if (bookTitle === "" || authorTitle === "" || isbnTitle === ""){

        ui.showError("This shit aint workin");

    } else {
        ui.addBookToList(book);
        ui.clearFields();
    }


    e.preventDefault();
})