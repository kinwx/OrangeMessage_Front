const fetchData = async () => {
    try {
        // fetch messages
        const { data } = await fetch('https://training-backend-message.onrender.com/messages').then( res => res.json());

        const messagesArea = document.querySelector('[data-messages]');
        messagesArea.innerHTML = '';
        const profile = document.querySelector('[data-profile]').textContent;

        // render messages 
        data.forEach( content => {
            const message = document.createElement('p');
            message.textContent = content.message;
            (profile.toLowerCase() === content.name)
                ? message.classList.add('message', 'right')
                : message.classList.add('message', 'left');

            messagesArea.appendChild(message);
        });
    } catch (error) {
        console.log(error.message);
    }
}
fetchData();
