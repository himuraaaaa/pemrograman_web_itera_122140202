// Todo Class Implementation
class TodoItem {
    constructor(id, text, completed = false) {
        this.id = id;
        this.text = text;
        this.completed = completed;
        this.createdAt = new Date();
    }

    toggle() {
        this.completed = !this.completed;
    }

    update(text) {
        this.text = text;
    }
}

// Todo List Manager Class
class TodoList {
    constructor() {
        this.todos = [];
        this.loadFromLocalStorage();
    }

    addTodo(text) {
        const id = Date.now().toString();
        const todo = new TodoItem(id, text);
        this.todos.push(todo);
        this.saveToLocalStorage();
        return todo;
    }

    removeTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveToLocalStorage();
    }

    updateTodo(id, text) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.update(text);
            this.saveToLocalStorage();
        }
    }

    toggleTodo(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.toggle();
            this.saveToLocalStorage();
        }
    }

    filterTodos(filter) {
        switch (filter) {
            case 'active':
                return this.todos.filter(todo => !todo.completed);
            case 'completed':
                return this.todos.filter(todo => todo.completed);
            default:
                return this.todos;
        }
    }

    saveToLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    loadFromLocalStorage() {
        try {
            const storedTodos = localStorage.getItem('todos');
            if (storedTodos) {
                const parsedTodos = JSON.parse(storedTodos);
                this.todos = parsedTodos.map(todo => {
                    const newTodo = new TodoItem(todo.id, todo.text, todo.completed);
                    newTodo.createdAt = new Date(todo.createdAt);
                    return newTodo;
                });
            }
        } catch (error) {
            console.error('Error loading todos:', error);
            this.todos = [];
        }
    }
}

// Dashboard UI Manager
class DashboardUI {
    constructor(todoList) {
        this.todoList = todoList;
        this.currentFilter = 'all';
        
        // DOM elements
        this.todoForm = document.getElementById('todoForm');
        this.todoInput = document.getElementById('todoInput');
        this.todoListElement = document.getElementById('todoList');
        this.emptyStateElement = document.getElementById('emptyState');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.dateTimeElement = document.getElementById('dateTime');
        
        // Initialize event listeners
        this.initEventListeners();
        
        // Initial render
        this.updateDateTime();
        setInterval(() => this.updateDateTime(), 1000);
        this.renderTodos();
    }

    initEventListeners() {
        // Form submission for adding todos
        this.todoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = this.todoInput.value.trim();
            if (text) {
                this.todoList.addTodo(text);
                this.todoInput.value = '';
                this.renderTodos();
            }
        });
        
        // Filter buttons
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.currentFilter = button.dataset.filter;
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                this.renderTodos();
            });
        });
    }

    updateDateTime() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        this.dateTimeElement.textContent = now.toLocaleDateString('id-ID', options);
    }
    
    // Arrow function for rendering todos
    renderTodos = () => {
        const filteredTodos = this.todoList.filterTodos(this.currentFilter);
        
        // Show/hide empty state
        if (filteredTodos.length === 0) {
            this.emptyStateElement.style.display = 'block';
            this.todoListElement.style.display = 'none';
        } else {
            this.emptyStateElement.style.display = 'none';
            this.todoListElement.style.display = 'block';
        }
        
        // Clear current list
        this.todoListElement.innerHTML = '';
        
        // Render each todo item
        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = 'todo-item';
            li.setAttribute('data-id', todo.id);
            
            // Using template literals for dynamic content
            li.innerHTML = `
                <div class="todo-text ${todo.completed ? 'completed' : ''}">
                    <input type="checkbox" class="checkbox" ${todo.completed ? 'checked' : ''}>
                    <span>${todo.text}</span>
                </div>
                <div class="todo-actions">
                    <button class="btn btn-success btn-edit">Edit</button>
                    <button class="btn btn-danger btn-delete">Hapus</button>
                </div>
            `;
            
            // Set up event listeners for this todo item
            this.setupTodoItemListeners(li);
            
            this.todoListElement.appendChild(li);
        });
    }
    
    // Arrow function for setting up todo item event listeners
    setupTodoItemListeners = (todoElement) => {
        const id = todoElement.getAttribute('data-id');
        const checkbox = todoElement.querySelector('.checkbox');
        const editButton = todoElement.querySelector('.btn-edit');
        const deleteButton = todoElement.querySelector('.btn-delete');
        
        // Toggle completion status
        checkbox.addEventListener('change', () => {
            this.todoList.toggleTodo(id);
            this.renderTodos();
        });
        
        // Edit todo
        editButton.addEventListener('click', () => {
            this.activateEditMode(todoElement);
        });
        
        // Delete todo
        deleteButton.addEventListener('click', () => {
            this.todoList.removeTodo(id);
            this.renderTodos();
        });
    }
    
    // Arrow function for activating edit mode
    activateEditMode = (todoElement) => {
        const id = todoElement.getAttribute('data-id');
        const todoText = todoElement.querySelector('.todo-text span').textContent;
        
        // Replace todo item content with edit form
        todoElement.innerHTML = `
            <form class="todo-edit-form">
                <input type="text" class="todo-input" value="${todoText}" required>
                <button type="submit" class="btn btn-success">Simpan</button>
                <button type="button" class="btn btn-danger btn-cancel">Batal</button>
            </form>
        `;
        
        const editForm = todoElement.querySelector('.todo-edit-form');
        const editInput = todoElement.querySelector('.todo-input');
        const cancelButton = todoElement.querySelector('.btn-cancel');
        
        // Focus the input
        editInput.focus();
        
        // Handle form submission
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newText = editInput.value.trim();
            if (newText) {
                this.todoList.updateTodo(id, newText);
                this.renderTodos();
            }
        });
        
        // Handle cancel button
        cancelButton.addEventListener('click', () => {
            this.renderTodos();
        });
    }
}

// Initialize the application
const initApp = async () => {
    try {
        // Simulate loading process
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Initialize Todo List and UI
        const todoList = new TodoList();
        const ui = new DashboardUI(todoList);
        
        console.log('Personal Dashboard initialized successfully!');
    } catch (error) {
        console.error('Error initializing app:', error);
    }
};

// Start the app
document.addEventListener('DOMContentLoaded', initApp);