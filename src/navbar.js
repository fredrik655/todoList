import {compareAsc, formatDistance, parseISO} from 'date-fns';

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
    const allLists = document.querySelectorAll('.task-list-container');

    allLists.forEach((e) => {
        e.classList.remove('active');
    });  
}


const addList = (priority, taskName, date) => {
    let navbar = document.querySelector('#navbar');

    // instantiate dom elements
    const taskContainer = document.createElement('div');
    const taskPriority = document.createElement('div');
    const taskTitle = document.createElement('p');
    const deleteBtn = document.createElement('button');
    const dateText = document.createElement('p');

    // add ids and class and data attributes names
    addClassByElement(taskContainer, 'task-list-container');
    addClassByElement(taskPriority, priority);
    addClassByElement(taskTitle, 'task-list-title');
    addClassByElement(dateText, 'nav-date');


    taskTitle.textContent = taskName;
    deleteBtn.textContent = 'Delete';
    setDateForList(date, dateText);
    

    taskContainer.appendChild(taskPriority);
    taskContainer.appendChild(taskTitle);
    taskContainer.appendChild(deleteBtn);
    taskContainer.appendChild(dateText);
    navbar.appendChild(taskContainer);
    setNewActive(taskContainer);
    return taskContainer;
}

const removeList = (container) => {
    while(container.firstChild){
        container.removeChild(container.lastChild);
    }
    container.remove();
}

const setDateForList = (date, domObj) => {
    if(compareAsc(new Date(), parseISO(date)) === -1) {
        domObj.textContent = `Due date: ${date}, ${formatDistance(new Date(date), new Date())} left`;
    }
    else {
        domObj.textContent = `Due date: ${date}, ${formatDistance(new Date(date), new Date())} ago`;
    }
}




export {addList, removeList};