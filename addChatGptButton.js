function addChatGptButton() {
    const buttonId = "chatGptButton";
    const modalId = "chatGptModal";

    const buttonStyle = {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "10px 20px",
        backgroundColor: "#7289da",
        color: "#ffffff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        zIndex: "1000",
    };

    const modalStyle = {
        position: "fixed",
        width: "400px",
        height: "600px",
        backgroundColor: "#2c2f33",
        border: "1px solid #7289da",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
        zIndex: "1001",
        display: "none",
        flexDirection: "column",
        padding: "10px",
        resize: "both",
        overflow: "auto",
    };

    const headerStyle = {
        backgroundColor: "#7289da",
        color: "#ffffff",
        padding: "10px",
        borderRadius: "8px 8px 0 0",
        textAlign: "center",
        fontSize: "16px",
        cursor: "move",
    };

    const closeButtonStyle = {
        position: "absolute",
        top: "5px",
        right: "10px",
        backgroundColor: "transparent",
        border: "none",
        color: "#ffffff",
        fontSize: "18px",
        cursor: "pointer",
    };

    const messageAreaStyle = {
        flex: "1",
        backgroundColor: "#23272a",
        borderRadius: "0 0 8px 8px",
        padding: "10px",
        overflowY: "auto",
        color: "#ffffff",
        fontSize: "14px",
        marginBottom: "10px",
    };

    const inputAreaStyle = {
        display: "flex",
    };

    const inputFieldStyle = {
        flex: "1",
        padding: "10px",
        borderRadius: "8px",
        border: "none",
        fontSize: "14px",
    };

    const sendButtonStyle = {
        padding: "10px 20px",
        backgroundColor: "#7289da",
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        marginLeft: "10px",
        cursor: "pointer",
    };

    const removeElement = (elementId) => {
        const existingElement = document.getElementById(elementId);
        if (existingElement) {
            existingElement.remove();
        }
    };

    const createElement = (tag, id, style, textContent) => {
        const element = document.createElement(tag);
        element.id = id;
        Object.assign(element.style, style);
        if (textContent) {
            element.textContent = textContent;
        }
        return element;
    };

    removeElement(buttonId);
    removeElement(modalId);

    const chatButton = createElement(
        "button",
        buttonId,
        buttonStyle,
        "Chat with ChatGPT"
    );
    const chatModal = createElement("div", modalId, modalStyle);
    const modalHeader = createElement(
        "div",
        null,
        headerStyle,
        "Chat with ChatGPT"
    );
    const closeButton = createElement("button", null, closeButtonStyle, "×");
    const messageArea = createElement("div", null, messageAreaStyle);
    const inputArea = createElement("div", null, inputAreaStyle);
    const inputField = createElement("input", null, inputFieldStyle);
    const sendButton = createElement("button", null, sendButtonStyle, "Send");

    chatModal.appendChild(modalHeader);
    chatModal.appendChild(closeButton);
    chatModal.appendChild(messageArea);
    chatModal.appendChild(inputArea);

    inputArea.appendChild(inputField);
    inputArea.appendChild(sendButton);

    document.body.appendChild(chatButton);
    document.body.appendChild(chatModal);

    const toggleModalVisibility = () => {
        if (
            chatModal.style.display === "none" ||
            chatModal.style.display === ""
        ) {
            chatModal.style.display = "flex";
            chatModal.style.top = "50%";
            chatModal.style.left = "50%";
            chatModal.style.transform = "translate(-50%, -50%)";
        } else {
            chatModal.style.display = "none";
        }
    };

    const dragging = {
        isDragging: false,
        offsetX: 0,
        offsetY: 0,
    };

    const startDragging = (event) => {
        dragging.isDragging = true;
        dragging.offsetX =
            event.clientX - chatModal.getBoundingClientRect().left;
        dragging.offsetY =
            event.clientY - chatModal.getBoundingClientRect().top;
        chatModal.style.position = "absolute";
        document.addEventListener("mousemove", onDrag);
        document.addEventListener("mouseup", stopDragging);
    };

    const onDrag = (event) => {
        if (!dragging.isDragging) {
            return;
        }
        chatModal.style.left = `${event.clientX - dragging.offsetX}px`;
        chatModal.style.top = `${event.clientY - dragging.offsetY}px`;
    };

    const stopDragging = () => {
        dragging.isDragging = false;
        document.removeEventListener("mousemove", onDrag);
        document.removeEventListener("mouseup", stopDragging);
    };

    const closeModal = () => {
        chatModal.style.display = "none";
    };

    const apiKey = "";
    const apiUrl = "https://api.openai.com/v1/chat/completions";

    const sendMessage = async (message) => {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message }],
            }),
        });

        const data = await response.json();
        return data.choices[0].message.content;
    };

    const handleSendMessage = async () => {
        const userMessage = inputField.value.trim();
        if (userMessage === "") return;

        const userMessageElement = createElement(
            "p",
            null,
            null,
            `You: ${userMessage}`
        );
        const botResponse = await sendMessage(userMessage);
        const botMessageElement = createElement(
            "p",
            null,
            null,
            `ChatGPT: ${botResponse}`
        );

        messageArea.appendChild(userMessageElement);
        messageArea.appendChild(botMessageElement);
        messageArea.scrollTop = messageArea.scrollHeight;

        inputField.value = "";
    };

    chatButton.addEventListener("click", toggleModalVisibility);
    closeButton.addEventListener("click", closeModal);
    modalHeader.addEventListener("mousedown", startDragging);
    sendButton.addEventListener("click", handleSendMessage);
    inputField.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            handleSendMessage();
        }
    });
}

// Run the function to add the button and chat modal
addChatGptButton();
