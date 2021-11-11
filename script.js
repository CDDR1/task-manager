// Global Variables
const list = document.querySelector('.list');
const submitBtn = document.querySelector('.submit-btn');
const input = document.querySelector('.form-input');
const clearBtn = document.querySelector('.clear-btn');
const successMessageColor = 'rgba(52, 235, 143, 0.4)';
const errorMessageColor = 'rgba(255, 0, 0, 0.233)';

// This function shows a message to the user, wheter is an error message or a success message.
const showMessage = (message, color) => {   
    const textNode = document.createTextNode(message);
    const paragraph = document.createElement('p');
    paragraph.appendChild(textNode);
    paragraph.style.backgroundColor = color;
    const messageContainer = document.querySelector('.message-container');
    messageContainer.appendChild(paragraph);
    setTimeout(() => {
        messageContainer.removeChild(paragraph);
    }, 1000);
};

// Show "Clear-All" Button
const showClearBtn = () => {
    clearBtn.style.display = 'block';
};

// "Clear-All Button" 
clearBtn.addEventListener('click', () => {
    list.innerHTML = '';
    clearBtn.style.display = 'none';
    showMessage('Removed All Items', successMessageColor);
});

// Submit Button
submitBtn.addEventListener('click', () => {
    const text = input.value;
    if (text !== '') {

        const li = document.createElement('li');
        li.classList.add('list-item');
        list.appendChild(li);

        const p = document.createElement('p');
        p.classList.add('list-text');
        li.appendChild(p);

        const textNode = document.createTextNode(text);
        p.appendChild(textNode);

        const iconsContainer = document.createElement('div');
        iconsContainer.classList.add('list-icons')
        li.appendChild(iconsContainer);

        // Create and store the edit icon in a variable. The edit icon is using the
        // "fas" and "fa-edit" classes from FONT AWESOME
        const editIcon = document.createElement('i');
        editIcon.classList.add('fas', 'fa-edit');

        editIcon.addEventListener('click', () => {
            // submitBtn.innerHTML = 'Edit';
            // input.value = text;
            // const editBtn = submitBtn;
            // editBtn.addEventListener('click', () => {
            //     p.innerHTML = input.value;
            //     submitBtn.innerHTML = 'Submit';
            // });
        });

        // Add the edit icon to the HTML
        iconsContainer.appendChild(editIcon);

        // Create and store the delete icon in a variable. The delete icon is using the
        // "fas" and "fa-trash" classes from FONT AWESOME
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fas', 'fa-trash');

        // Delete Button: Each time that the delete button is clicked, the li element that
        // the button belongs to, will be removed.
        deleteIcon.addEventListener('click', () => {
            list.removeChild(li);  
            if (list.childNodes.length === 0) clearBtn.style.display = 'none';           
            showMessage('Item deteled from the list', successMessageColor);
        });

        // Add the delete icon to the HTML
        iconsContainer.appendChild(deleteIcon);

        // Clean the input
        input.value = '';

        // Show Success Message
        const messageContent = 'Item Added Successfully';
        showMessage(messageContent, successMessageColor);

        // Show "Clear-All" Button 
        if (list.childNodes.length >= 1) showClearBtn();       
    }
    else {
        // Show Error Message
        const messageContent = 'Please Enter Value';
        showMessage(messageContent, errorMessageColor);
    }
}); 