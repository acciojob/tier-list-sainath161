//your JS code here. If required.
document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.item');
    const dropZones = document.querySelectorAll('.drop-zone');

    // Add dragstart event listener to each item
    items.forEach(item => {
        item.addEventListener('dragstart', () => {
            item.classList.add('dragging');
        });
    });

    // Add dragend event listener to each item
    items.forEach(item => {
        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
        });
    });

    // Add dragover event listener to each drop zone to allow items to be dropped on it
    dropZones.forEach(dropZone => {
        dropZone.addEventListener('dragover', e => {
            e.preventDefault();
        });
    });

    // Add drop event listener to each drop zone
    dropZones.forEach(dropZone => {
        dropZone.addEventListener('drop', e => {
            const draggedItem = document.querySelector('.dragging');
            if (!draggedItem) return;

            const currentDropZone = draggedItem.parentElement;
            if (dropZone === currentDropZone) return; // If dropped in the same drop zone, do nothing

            dropZone.appendChild(draggedItem);
        });
    });

    // Add double click event listener to each item to move it to the unranked section
    items.forEach(item => {
        item.addEventListener('dblclick', () => {
            const unrankedDropZone = document.getElementById('unranked-drop-zone');
            const currentDropZone = item.parentElement;
            if (currentDropZone === unrankedDropZone) return; // If already in unranked section, do nothing

            unrankedDropZone.appendChild(item);
        });
    });
});
