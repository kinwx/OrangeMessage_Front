const sendButton = document.querySelector('[data-send]');
const inputMessage = document.querySelector('[data-input-message]');
inputMessage.addEventListener('keypress', e => {
    (e.key === 'Enter') && sendEvent();
});

sendButton.addEventListener('click', () => {
    sendEvent();
});

const sendEvent = () => {
    const profile = document.querySelector('[data-profile]').textContent.toLowerCase();
    const message = inputMessage.value.trim();
    if(!message) return;
    
    // send message
    sendMessage(profile, message);
    inputMessage.value = '';

    // render your message
    const messagesArea = document.querySelector('[data-messages]');
    const myMessage = document.createElement('p');
    myMessage.textContent = message;
    myMessage.classList.add('message', 'right');

    messagesArea.appendChild(myMessage);
};

const sendMessage = async (name, message) => {
    try {
        const res = await fetch('https://training-backend-message.onrender.com/messages', {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, message})
        });
        console.log(res.status);
    } catch (error) {
        console.log(error.message);
    }
};
