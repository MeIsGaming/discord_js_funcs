function unregisterAndDeleteElements() {
    // Get all elements with the IDs "chatGptButton" and "chatGptModal"
    const button = document.getElementById("chatGptButton");
    const modal = document.getElementById("chatGptModal");

    // Remove event listeners from the button
    button.removeEventListener("click", addChatGptButton);

    // Remove the button and modal from the DOM
    button.parentNode.removeChild(button);
    modal.parentNode.removeChild(modal);
}
unregisterAndDeleteElements();
