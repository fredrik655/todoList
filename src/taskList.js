

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

const setNewActive = domObj => {
    setAllListsNonActive();
    domObj.classList.add('active');
}

const setAllListsNonActive = () => {
    const allLists = document.querySelectorAll('.task-container');

    allLists.forEach((e) => {
        e.classList.remove('active');
    });  
}

const addActiveListTask = (priority, taskName) => {
    let activeListContent = document.querySelector('#active-list-content');

    // instantiate dom elements
    const listContainer = document.createElement('div');
    const listPriority = document.createElement('div');
    const listTitle = document.createElement('p');
    const done = document.createElement('button');
    const deleteBtn = document.createElement('button');

    // add ids and class names
    addClassByElement(listPriority, priority);
    addClassByElement(listContainer, 'task-container');

    // generate dots


    listTitle.textContent = taskName;
    done.textContent = 'Done';
    deleteBtn.textContent = 'Delete';

    listContainer.appendChild(listPriority);
    listContainer.appendChild(listTitle);
    listContainer.appendChild(done);
    listContainer.appendChild(deleteBtn);
    activeListContent.appendChild(listContainer);
    setNewActive(listContainer);
    return listContainer;
}

const removeListTasks = () => {
    const activeListContent = document.querySelector('#active-list-content');
    while(activeListContent.firstChild){
        activeListContent.removeChild(activeListContent.lastChild);
    }
};


export {addActiveListTask, removeListTasks};