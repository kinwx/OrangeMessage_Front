const form = document.querySelector('[data-form]');
form.addEventListener('submit', e => {
    e.preventDefault(e);
    const login = {};
    
    for(let key in e.target) {
        if(!isNaN(key)) {
            if(e.target[key].localName === 'input'){
                login[e.target[key].id] = e.target[key].value;
                e.target[key].value = '';
            }
        };
    };
    request(login);
});

const request = async (data) => {
    try {
        const button = document.querySelector('[data-btn]');
        button.setAttribute('disabled', true);
        
        const image = document.querySelector('[data-image]');
        image.classList.add('load');

        const required = await fetch('https://training-backend-message.onrender.com/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data),
        });
        const res = await required.json();

        button.removeAttribute('disabled');
        image.classList.remove('load');
        
        switch(res.status){
            case 200:
                if(res.user){
                    window.location.href = `./app/${res.user}.html`;
                };
                break;
            default:
                const visualResponse = document.querySelector('[data-res]');
                const span = document.createElement('span');
                span.textContent = 'Usuário não reconhecido!';
                visualResponse.appendChild(span);
                visualResponse.classList.add('not-sucess');
    
                setTimeout(() => {
                    visualResponse.classList.remove('not-sucess');
                    visualResponse.removeChild(span);
                }, 3000);
        } 
    } catch (error) {
        console.log(error.message);
    };
};
