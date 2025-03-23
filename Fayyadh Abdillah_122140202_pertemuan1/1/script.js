document.getElementById("todo-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const todoInput = document.getElementById("todo-input");
    const todoText = todoInput.value.trim();

    if (todoText !== "") {
        addTodo(todoText);
        todoInput.value = ""; 
    } else {
        alert("Silakan masukkan kegiatan!");
    }
});

function addTodo(todoText) {
    const tableBody = document.getElementById("todo-table-body");

   
    const row = document.createElement("tr");

    
    const noCell = document.createElement("td");
    row.appendChild(noCell);

  
    const todoCell = document.createElement("td");
    todoCell.textContent = todoText;
    row.appendChild(todoCell);

    
    const actionCell = document.createElement("td");

   
    const doneButton = document.createElement("button");
    doneButton.textContent = "Selesai";
    doneButton.addEventListener("click", function () {
        todoCell.style.textDecoration = "line-through";
    });

    
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Hapus";
    deleteButton.addEventListener("click", function () {
        row.remove();
        updateRowNumbers(); 
    });

    actionCell.appendChild(doneButton);
    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);

    tableBody.appendChild(row);
    updateRowNumbers();
}

function updateRowNumbers() {
    const tableBody = document.getElementById("todo-table-body");
    const rows = tableBody.querySelectorAll("tr");

    rows.forEach((row, index) => {
        const noCell = row.querySelector("td:first-child");
        noCell.textContent = index + 1; 
    });
}
