
const addIdByElement = (domObj, id) => {
    if(id !== '') {
        domObj.id = id;
    }
}

const addClassByElement = (domObj, className) => {
    if(className !== '') {
        domObj.classList.add(className);
    }
}

const addDescription = (title, descriptionText) => {
    let activeListDescription = document.querySelector('#list-description');

    // instantiate dom elements
    const descriptionContainer = document.createElement('div');
    const descTitle = document.createElement('h2');
    const textBox = document.createElement('div');
    const description = document.createElement('p');
    const editBtn = document.createElement('button');

    // add ids and class names
    addIdByElement(descriptionContainer, 'description-container');
    addClassByElement(editBtn, 'description-edit-btn');

    // generate dots
    

    descTitle.textContent = title;
    description.textContent = descriptionText;
    editBtn.textContent = 'Edit';

    descriptionContainer.appendChild(descTitle);
    descriptionContainer.appendChild(editBtn);
    textBox.appendChild(description);
    descriptionContainer.appendChild(textBox);
    activeListDescription.appendChild(descriptionContainer);
}

const removeDescription = () => {
    const descriptionContainer = document.querySelector('#list-description');
    while(descriptionContainer.firstChild){
        descriptionContainer.removeChild(descriptionContainer.lastChild);
    }
}

const generateTextEditArea = (title) => {
    let activeListDescription = document.querySelector('#list-description');

    // instantiate dom elements
    const descriptionContainer = document.createElement('div');
    const descTitle = document.createElement('h2');
    const textBox = document.createElement('div');
    const textEditArea = document.createElement('textarea');
    const doneBtn = document.createElement('button');

    addIdByElement(descriptionContainer, 'description-container');

    descTitle.textContent = title;
    doneBtn.textContent = 'Done';

    descriptionContainer.appendChild(descTitle);
    textBox.appendChild(textEditArea);
    descriptionContainer.appendChild(textBox);
    descriptionContainer.appendChild(doneBtn);
    activeListDescription.appendChild(descriptionContainer);
    
    return doneBtn;
}

export {addDescription, removeDescription, generateTextEditArea};