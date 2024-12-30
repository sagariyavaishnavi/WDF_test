const boardState = JSON.parse(localStorage.getItem('kanbanBoard')) || {
    todo: [],
    'in-progress': [],
    done: [],
  };
  
  // Save state to localStorage
  function saveState() {
    localStorage.setItem('kanbanBoard', JSON.stringify(boardState));
  }
  
  // Render Kanban Board
  function renderBoard() {
    for (const [status, cards] of Object.entries(boardState)) {
      const container = document.getElementById(status);
      container.innerHTML = '';
      cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerHTML = `
          <span>${card.title} (Priority: ${card.priority})</span>
          <button onclick="removeCard('${status}', ${index})">Remove</button>
        `;
        container.appendChild(cardElement);
      });
    }
  }
  
  // Add Card
  function addCard(event, status) {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const priority = form.priority.value;
    if (title && priority) {
      boardState[status].push({ title, priority });
      saveState();
      renderBoard();
      form.reset();
    }
  }
  
  // Remove Card
  function removeCard(status, index) {
    boardState[status].splice(index, 1);
    saveState();
    renderBoard();
  }
  
  // Initial Render
  renderBoard();