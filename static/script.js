// Select all schedule cards and columns where tasks can be dropped
const cards = document.querySelectorAll('.schedule-card');
const dayColumns = document.querySelectorAll('.day-column');

// Add event listeners for drag events on cards
cards.forEach(card => {
    card.addEventListener('dragstart', dragStart);
    card.addEventListener('dragend', dragEnd);
});

// Add event listeners for drag events on day columns
dayColumns.forEach(column => {
    column.addEventListener('dragover', dragOver);
    column.addEventListener('drop', drop);
});

// Function to handle when dragging starts
function dragStart(e) {
    // Store the ID of the dragged element
    e.dataTransfer.setData('text', e.target.id);
    e.target.classList.add('dragging');  // Add a class to the dragged item
}

// Function to handle when dragging ends
function dragEnd(e) {
    e.target.classList.remove('dragging');  // Remove the dragging class
}

// Function to allow dropping on a day column
function dragOver(e) {
    e.preventDefault();  // Prevent default to allow drop
}

// Function to handle the drop event
function drop(e) {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text');  // Get the ID of the dragged card
    const card = document.getElementById(cardId);
    const newDay = e.target.id;  // Get the ID of the target column

    // Send a POST request to move the schedule to a new day
    fetch(`/schedules/move/${cardId}/${newDay}`, {
        method: 'POST',
    }).then(response => {
        location.reload();  // Reload the page after moving the task
    });
}
