document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll(".item");
    const dropZones = document.querySelectorAll(".drop-zone");

    items.forEach(item => {
        item.addEventListener("dragstart", handleDragStart);
        item.addEventListener("dragend", handleDragEnd);
        item.addEventListener("dblclick", handleDoubleClick);
    });

    dropZones.forEach(dropZone => {
        dropZone.addEventListener("dragover", handleDragOver);
        dropZone.addEventListener("drop", handleDrop);
    });

    function handleDragStart(event) {
        event.dataTransfer.setData("text/plain", event.target.id);
    }

    function handleDragEnd(event) {
        // Remove any drop zone highlights
        dropZones.forEach(dropZone => dropZone.classList.remove("highlight"));
    }

    function handleDragOver(event) {
        event.preventDefault(); // Necessary to allow dropping
        event.dataTransfer.dropEffect = "move"; // Set cursor style

        // Add highlight to drop zone when item is dragged over
        this.classList.add("highlight");
    }

    function handleDrop(event) {
        event.preventDefault(); // Prevent default action (open as link for some elements)

        const itemId = event.dataTransfer.getData("text/plain");
        const item = document.getElementById(itemId);
        const dropZone = this;

        // Remove highlight from drop zone
        dropZones.forEach(dropZone => dropZone.classList.remove("highlight"));

        // Check if the item is being dropped onto its current drop zone
        if (!dropZone.contains(item)) {
            // Append item to drop zone
            dropZone.appendChild(item);
        }
    }

    function handleDoubleClick(event) {
        const item = event.target;
        const unrankedDropZone = document.getElementById("unranked-drop-zone");

        // Check if the item is in the unranked drop zone
        if (item.parentElement === unrankedDropZone) {
            // Do nothing if already in the unranked drop zone
            return;
        }

        // Append item to unranked drop zone
        unrankedDropZone.appendChild(item);
    }
});
