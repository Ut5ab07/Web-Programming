const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todolist');

todoForm.addEventListener('submit', (event) => {
	event.preventDefault();

	const taskText = todoInput.value.trim();
	if (!taskText) {
		return;
	}

	const todoItem = document.createElement('li');
	const taskLabel = document.createElement('span');
	const completeButton = document.createElement('button');
	const deleteButton = document.createElement('button');

	taskLabel.textContent = taskText;
	completeButton.textContent = 'Done';
	deleteButton.textContent = 'Delete';
	completeButton.className = 'complete-button';
	deleteButton.className = 'delete-button';

	completeButton.addEventListener('click', () => {
		taskLabel.style.textDecoration = taskLabel.style.textDecoration === 'line-through'
			? 'none'
			: 'line-through';
	});

	deleteButton.addEventListener('click', () => {
		todoItem.remove();
	});

	todoItem.append(taskLabel, ' ', completeButton, ' ', deleteButton);
	todoList.appendChild(todoItem);

	todoInput.value = '';
	todoInput.focus();
});
