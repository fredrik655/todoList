

const body = document.querySelector('body');


function loadNavbar() {
    const nav = document.createElement('nav');
    const navbar = document.createElement('div');
    

    navbar.id = 'navbar';

    appendNavAddElement(navbar);
    nav.appendChild(navbar);
    body.appendChild(nav);
}

function appendNavAddElement(navbar) {
    const navAdd = document.createElement('div');
    const text = document.createElement('p');
    const btn = document.createElement('button');

    navAdd.id = 'nav-add';
    btn.id = 'nav-add-btn';
    text.textContent = 'Task Lists';
    btn.textContent = 'New Task List';
    
    //btn.addEventListener('click', btnClick);

    navAdd.appendChild(text);
    navAdd.appendChild(btn);
    appendNavAddInput(navAdd);
    navbar.appendChild(navAdd);
}

function appendNavAddInput(navAdd) {
    const titleInput = document.createElement('input');
    const priorityRed = document.createElement('div');
    const priorityYellow = document.createElement('div');
    const priorityGreen = document.createElement('div');
    const date = document.createElement('input');

    priorityRed.id = 'nav-add-priority-red';
    priorityYellow.id = 'nav-add-priority-yellow';
    priorityGreen.id = 'nav-add-priority-green';
    date.id = 'list-date';
    date.type = 'date';
    titleInput.placeholder = 'Title';


    addDataAttribute(priorityRed, 'data-selected', '0');
    addDataAttribute(priorityYellow, 'data-selected', '0');
    addDataAttribute(priorityGreen, 'data-selected', '0');
    addEventPriorityEventListener(priorityRed, priorityYellow, priorityGreen);

    navAdd.appendChild(titleInput);
    navAdd.appendChild(priorityRed);
    navAdd.appendChild(priorityYellow);
    navAdd.appendChild(priorityGreen);
    navAdd.appendChild(date);
}

function addEventPriorityEventListener(domObj1, domObj2, domObj3) {
    domObj1.addEventListener('click', (ev) => {
        addDataAttribute(ev.target, 'data-selected', '1');
        addDataAttribute(domObj2, 'data-selected', '0');
        addDataAttribute(domObj3, 'data-selected', '0');
        ev.target.id = 'nav-add-priority-red-selected';
        domObj2.id = 'nav-add-priority-yellow';
        domObj3.id = 'nav-add-priority-green';
    });

    domObj2.addEventListener('click', (ev) => {
        addDataAttribute(ev.target, 'data-selected', '1');
        addDataAttribute(domObj1, 'data-selected', '0');
        addDataAttribute(domObj3, 'data-selected', '0');
        domObj1.id = 'nav-add-priority-red';
        ev.target.id = 'nav-add-priority-yellow-selected';
        domObj3.id = 'nav-add-priority-green';
    });

    domObj3.addEventListener('click', (ev) => {
        addDataAttribute(ev.target, 'data-selected', '1');
        addDataAttribute(domObj2, 'data-selected', '0');
        addDataAttribute(domObj1, 'data-selected', '0');
        domObj1.id = 'nav-add-priority-red';
        domObj2.id = 'nav-add-priority-yellow';
        ev.target.id = 'nav-add-priority-green-selected';
    })
}

function addListEventPriorityEventListener(domObj1, domObj2, domObj3) {
    domObj1.addEventListener('click', (ev) => {
        addDataAttribute(ev.target, 'data-selected', '1');
        addDataAttribute(domObj2, 'data-selected', '0');
        addDataAttribute(domObj3, 'data-selected', '0');
        ev.target.id = 'task-add-priority-red-selected';
        domObj2.id = 'task-add-priority-yellow';
        domObj3.id = 'task-add-priority-green';
    });

    domObj2.addEventListener('click', (ev) => {
        addDataAttribute(ev.target, 'data-selected', '1');
        addDataAttribute(domObj1, 'data-selected', '0');
        addDataAttribute(domObj3, 'data-selected', '0');
        domObj1.id = 'task-add-priority-red';
        ev.target.id = 'task-add-priority-yellow-selected';
        domObj3.id = 'task-add-priority-green';
    });

    domObj3.addEventListener('click', (ev) => {
        addDataAttribute(ev.target, 'data-selected', '1');
        addDataAttribute(domObj2, 'data-selected', '0');
        addDataAttribute(domObj1, 'data-selected', '0');
        domObj1.id = 'task-add-priority-red';
        domObj2.id = 'task-add-priority-yellow';
        ev.target.id = 'task-add-priority-green-selected';
    })
}


function addDataAttribute(domObj, attribute, value) {
    domObj.setAttribute(attribute, value);
}

function loadTaskMain() {
    const main = document.createElement('main');
    loadTaskList(main);
    loadTaskDescription(main);
    body.appendChild(main);
}

function loadTaskList(main) {
    const activeList = document.createElement('div');
    activeList.id = 'active-list';
    appendActiveNavElement(activeList);
    appendActiveContentElement(activeList);
    main.appendChild(activeList);
}

function appendActiveNavElement(activeList) {
    const activeListNav = document.createElement('div');
    const navText = document.createElement('h2');
    const btn = document.createElement('button');


    navText.textContent = 'List tasks';
    btn.textContent = 'New Task';
    btn.id = 'task-add-button';
    activeListNav.id = 'active-list-nav';
    activeListNav.appendChild(navText);
    activeListNav.appendChild(btn);
    appendListAddInput(activeListNav);
    activeList.appendChild(activeListNav);
}

function appendListAddInput(activeList) {
    const titleInput = document.createElement('input');
    const priorityRed = document.createElement('div');
    const priorityYellow = document.createElement('div');
    const priorityGreen = document.createElement('div');

    priorityRed.id = 'task-add-priority-red';
    priorityYellow.id = 'task-add-priority-yellow';
    priorityGreen.id = 'task-add-priority-green';
    titleInput.placeholder = 'Title';

    addDataAttribute(priorityRed, 'data-selected', '0');
    addDataAttribute(priorityYellow, 'data-selected', '0');
    addDataAttribute(priorityGreen, 'data-selected', '0');
    addListEventPriorityEventListener(priorityRed, priorityYellow, priorityGreen);

    activeList.appendChild(titleInput);
    activeList.appendChild(priorityRed);
    activeList.appendChild(priorityYellow);
    activeList.appendChild(priorityGreen);
}

function appendActiveContentElement(activeList) {
    const activeListContent = document.createElement('div');
    activeListContent.id = 'active-list-content';
    activeList.appendChild(activeListContent);
}

function loadTaskDescription(main) {
    const listDescription = document.createElement('div');
    listDescription.id = 'list-description';
    main.appendChild(listDescription);
}



function loadBareBone() {
    loadNavbar();
    loadTaskMain();
}

export {loadBareBone};