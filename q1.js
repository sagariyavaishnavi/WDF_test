// script.js

// Initialize todos from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Function to render todos
function renderTodos() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${todo.text} - ${todo.category} - Due: ${todo.date}
            <button onclick="editTodo(${index})">Edit</button>
            <button onclick="deleteTodo(${index})">Delete</button>
        `;
        todoList.appendChild(li);
    });

    updateCategoryFilter();
}

// Function to add a new todo
document.getElementById('add-todo').addEventListener('click', () => {
    const text = document.getElementById('todo').value;
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;

    if (text && category && date) {
        todos.push({ text, category, date });
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
        clearInputs();
    } else {
        alert("Please fill in all fields.");
    }
});

// Function to clear input fields
function clearInputs() {
    document.getElementById('todo').value = '';
    document.getElementById('category').value = '';
    document.getElementById('date').value = '';
}

// Function to delete a todo
function deleteTodo(index) {
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
}

// Function to edit a todo
function editTodo(index) {
    const todo = todos[index];
    document.getElementById('todo').value = todo.text;
    document.getElementById('category').value = todo.category;
    document.getElementById('date').value = todo.date;

    deleteTodo(index); // Remove the current todo after editing
}

// Function to filter todos by category
document.getElementById('category-filter').addEventListener('change', (event) => {
    const selectedCategory = event.target.value;

    const filteredTodos = selectedCategory ? 
        todos.filter(todo => todo.category === selectedCategory) : 
        todos;

    renderFilteredTodos(filteredTodos);
});

// Render filtered todos
function renderFilteredTodos(filteredTodos) {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    filteredTodos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${todo.text} - ${todo.category} - Due: ${todo.date}
            <button onclick="editTodo(${index})">Edit</button>
            <button onclick="deleteTodo(${index})">Delete</button>
        `;
        todoList.appendChild(li);
    });
};

// Update category filter options dynamically
function updateCategoryFilter() {
    const categoryFilter = document.getElementById('category-filter');

    // Clear existing options
    categoryFilter.innerHTML = '<option value="">All</option>';

    // Get unique categories
    const categories = [...new Set(todos.map(todo => todo.category))];

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Initial render of todos
renderTodos();
