import {loadBareBone} from './barebone';
import {addList, removeList} from './navbar';
import {addActiveListTask, removeListTasks} from './taskList';
import {addDescription, removeDescription, generateTextEditArea} from './taskDescription';
import {ListItem} from './listItem';
import {format, formatDistance, getOverlappingDaysInIntervals} from 'date-fns';
import {loadLocalStorage, setLocalStorage, removeAll, removeItem, printStorage} from './storage';



loadBareBone();
let list = [];



const navBtn = document.querySelector('#nav-add-btn');
const listBtn = document.querySelector('#task-add-button');
const inputs = Array.from(document.querySelectorAll('input'));
const listDate = document.querySelector('#list-date');
const navPrioritySelect = Array.from(document.querySelector('#nav-add').querySelectorAll('div'));
const listPrioritySelect = Array.from(document.querySelector('#active-list-nav').querySelectorAll('div'));

addEventListerners();
loadAndGenerateStorage();

function loadAndGenerateStorage() {
    list = generateListFromStorageOutput(loadLocalStorage('list'));
    let container;
    if(list.length > 0){
        list.forEach(element => {
            container = addList(element.priority, element.title, element.date);
            container.addEventListener('click', taskListAddEventListener);
            container.querySelector('button').addEventListener('click', navDeleteList);
            container.setAttribute('data-index', element.id);
        });
        
        loadTasks(list[list.length-1].tasks);
    }
    else {
        list = [];
    }
    
}

function generateListFromStorageOutput(output) {
    let tempList = [];
    if(output !== null){
        output.forEach((element) => {
            tempList.push(new ListItem(element.title, element.priority, element.id, element.date));
            element.tasks.forEach(el => {
                tempList[tempList.length -1].addNewTask(el.title, el.priority, el.id, el.done);
                tempList[tempList.length -1].setTaskDescription(el.description.description, tempList[tempList.length -1].tasks.length -1);

            });
        });
    }
    else {
        tempList =  [];
    }
    

    return tempList;
}


function addEventListerners(){
    listBtn.addEventListener('click', () => {
        const allLists = document.querySelectorAll('.task-list-container');
        const listIndex = returnListByIndex(allLists);
        const titleText = inputs[2].value;
        if(titleText.length > 0){
            if(listPrioritySelect[0].getAttribute('data-selected') === '1'){
                const index = assignTaskId(list[listIndex]);
                list[listIndex].addNewTask(titleText, 'task-priority-red', index);
                loadTasks(list[listIndex].tasks);
                list[listIndex].setTaskDescription('', list[listIndex].tasks.length-1);
                loadDescription(list[listIndex].tasks[list[listIndex].tasks.length-1]);
                listPrioritySelect[0].setAttribute('data-selected', '0');
                listPrioritySelect[0].id = 'task-add-priority-red';
            }
            else if(listPrioritySelect[1].getAttribute('data-selected') === '1'){
                const index = assignTaskId(list[listIndex]);
                list[listIndex].addNewTask(titleText, 'task-priority-yellow', index);
                loadTasks(list[listIndex].tasks);
                list[listIndex].setTaskDescription('', list[listIndex].tasks.length-1);
                loadDescription(list[listIndex].tasks[list[listIndex].tasks.length-1]);
                listPrioritySelect[1].setAttribute('data-selected', '0');
                listPrioritySelect[1].id = 'task-add-priority-yellow';
            }
            else if(listPrioritySelect[2].getAttribute('data-selected') === '1'){
                const index = assignTaskId(list[listIndex]);
                list[listIndex].addNewTask(titleText, 'task-priority-green', index);
                loadTasks(list[listIndex].tasks);
                list[listIndex].setTaskDescription('', list[listIndex].tasks.length-1);
                loadDescription(list[listIndex].tasks[list[listIndex].tasks.length-1]);
                listPrioritySelect[2].setAttribute('data-selected', '0');
                listPrioritySelect[2].id = 'task-add-priority-green';
            }
            inputs[2].value = '';
            setLocalStorage(list);
        }
    });


    
    navBtn.addEventListener('click', () => {
        const titleText = inputs[0].value;
        const listDueDate = listDate.value;
        let container;
        if(titleText.length > 0 && listDate.value !== ''){
            if(navPrioritySelect[0].getAttribute('data-selected') === '1'){
                const index = assignId();
                container = addList('priority-red', titleText,listDueDate);
                list.push(new ListItem(titleText, 'priority-red', index, listDueDate));
                container.setAttribute('data-index', index);
                navPrioritySelect[0].setAttribute('data-selected', '0');
                navPrioritySelect[0].id = 'nav-add-priority-red';
            }
            else if(navPrioritySelect[1].getAttribute('data-selected') === '1'){
                const index = assignId();
                container = addList('priority-yellow', titleText, listDueDate);
                list.push(new ListItem(titleText, 'priority-yellow', index, listDueDate));
                container.setAttribute('data-index', index);
                navPrioritySelect[1].setAttribute('data-selected', '0');
                navPrioritySelect[1].id = 'nav-add-priority-yellow';
            }
            else if(navPrioritySelect[2].getAttribute('data-selected') === '1'){
                const index = assignId();
                container = addList('priority-green', titleText, listDueDate);
                list.push(new ListItem(titleText, 'priority-green', index, listDueDate));
                container.setAttribute('data-index', index);
                navPrioritySelect[2].setAttribute('data-selected', '0');
                navPrioritySelect[2].id = 'nav-add-priority-green';
            }
            container.addEventListener('click', taskListAddEventListener);
            container.querySelector('button').addEventListener('click', navDeleteList);
            loadTasks(list[list.length-1].tasks);
            
            
        }
        inputs[0].value = '';
        setLocalStorage(list);
    });
}

function navDeleteList(ev) {
    ev.stopPropagation();
    const parent = ev.target.parentNode;
    removeListById(parent.getAttribute('data-index'));
    removeList(parent);
    
    const allLists = document.querySelectorAll('.task-list-container');
;
    if(allLists.length > 0){
        allLists.forEach((e) => {
            e.classList.remove('active');
        }); 
        allLists[0].classList.add('active');
        loadTasks(list[returnListByIndex(allLists)].tasks);
        if(list[returnListByIndex(allLists)].tasks.length > 0) {
            loadDescription(list[returnListByIndex(allLists)].tasks[list[returnListByIndex(allLists)].tasks.length -1]);
        }
        else {
            removeDescription();
        }
    }
    if(list.length === 0){
        removeListTasks();
        removeDescription();
    }
}

function removeListById(id){
    for(let i = 0; i < list.length; i++){
        if(id == list[i].id){
            list.splice(i,1);
        }
    }
    setLocalStorage(list);
}

function removeTaskById(listId, taskId){
    for(let i = 0; i < list[listId].tasks.length; i++){
        if(taskId == list[listId].tasks[i].id){
            list[listId].tasks.splice(i,1);
        }
    }
    setLocalStorage(list);
}



function assignId() {
    let id = 0;
    while(1) {
        let temp = list.find(element => {return element.id === id;});
        if(temp === undefined) {
            break;
        }
        else {
            id++;
        }
    }
    return id;
}

function assignTaskId(listItem){
    let id = 0;
    while(1) {
        let temp = listItem.tasks.find(element => {return element.id === id;});
        if(temp === undefined) {
            break;
        }
        else {
            id++;
        }
    }
    return id;
}

function editBtnEventListener(ev){
    const title = ev.target.parentNode.querySelector('h2').textContent;
    removeDescription();

    const btn = generateTextEditArea(title);
    btn.addEventListener('click', editBtnDoneEvent);
}

function editBtnDoneEvent(){
    const textArea = document.querySelector('textarea');
    const allLists = document.querySelectorAll('.task-list-container');
    const listIndex = returnListByIndex(allLists);
    const allContent = document.querySelectorAll('.task-container');
    if(textArea.value !== ''){
        list[listIndex].setTaskDescription(textArea.value, returnTaskByIndex(allContent));
    }

    loadDescription(list[returnListByIndex(allLists)].tasks[returnTaskByIndex(allContent)]);
    setLocalStorage(list);
}

function taskListAddEventListener(ev){
    const allLists = document.querySelectorAll('.task-list-container');

    allLists.forEach((e) => {
        e.classList.remove('active');
    });  
    ev.target.classList.add('active');
    loadTasks(list[returnListByIndex(allLists)].tasks);
    if(list[returnListByIndex(allLists)].tasks.length > 0) {
        loadDescription(list[returnListByIndex(allLists)].tasks[list[returnListByIndex(allLists)].tasks.length -1]);
    }
    else {
        removeDescription();
    }
    
}

function taskAddEventListener(ev){
    const allContent = document.querySelectorAll('.task-container');
    const allLists = document.querySelectorAll('.task-list-container');

    allContent.forEach((e) => {
        e.classList.remove('active');
    });  
    ev.target.classList.add('active');
    loadDescription(list[returnListByIndex()].tasks[returnTaskByIndex(allContent)]);
}

function returnTaskByIndex(tasks) {
    let activeDataIndex = 0;
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].classList.contains('active')){
            activeDataIndex = i;
        }
    }; 
    return activeDataIndex;
}

function returnListByIndex() {
    const containerList  = document.querySelectorAll('.task-list-container');
    let activeDataIndex = 0;
    for(let i = 0; i < containerList.length; i++){
        if(containerList[i].classList.contains('active')){
        activeDataIndex = +containerList[i].getAttribute('data-index');
        }
    }; 
    for(let i = 0; i < list.length; i++){
        if(activeDataIndex === list[i].id){
            return i;
        }
    }
}

function loadDescription(task){
    removeDescription();
    if(task.description.title !== ''){
        addDescription(task.description.title, task.description.description);
    }

    const editBtn = document.querySelector('.description-edit-btn');
    editBtn.addEventListener('click', editBtnEventListener);
    
}

function loadTasks(taskList) {
    let container;
    removeListTasks();
    taskList.forEach((task) => {
        container = addActiveListTask(task.priority, task.title);
        container.setAttribute('data-index', task.id);
        container.addEventListener('click', taskAddEventListener);
        const btns = container.querySelectorAll('button');
        btns[0].addEventListener('click', taskDoneEvent);
        btns[1].addEventListener('click', deleteTask);

        if(task.done === true){
            container.querySelector('p').style.textDecoration = 'line-through';
        }
        else {
            container.querySelector('p').style.textDecoration = 'none';
        }
    });
}

function deleteTask(ev){
    ev.stopPropagation();
    const activeList = returnActiveListElement();
    const parent = ev.target.parentNode;
    removeTaskById(activeList.getAttribute('data-index'), parent.getAttribute('data-index'));
    removeList(parent);
    
    const allTasks = document.querySelectorAll('.task-container');

    if(allTasks.length > 0){
        allTasks.forEach((e) => {
            e.classList.remove('active');
        }); 
        allTasks[0].classList.add('active');
        
        loadDescription(list[returnListByIndex()].tasks[0]);
    }
    if(list.length === 0){
        removeListTasks();
    }
}

function taskDoneEvent(ev) {
    ev.stopPropagation();
    const activeListIndex = returnListByIndex();
    list[activeListIndex].tasks.forEach((e) => {
        if(e.id === +ev.target.parentNode.getAttribute('data-index')){
            e.setDone(); 
            if(e.done === true){
                ev.target.parentNode.querySelector('p').style.textDecoration = 'line-through';
            }
            else {
                ev.target.parentNode.querySelector('p').style.textDecoration = 'none';
            }
            setListAsDone();
        }
    });

    setLocalStorage(list);
}

function setListAsDone() {
    let notDone = true;
    const index = returnListByIndex();
    list[index].tasks.forEach(element => {
        if(element.done === false){
            notDone = false;
        }
    });
    const container = returnActiveListElement();

    if(!notDone){
        container.querySelector('p').style.textDecoration = 'none';
    }
    else {
        container.querySelector('p').style.textDecoration = 'line-through';
    }
    
}

function returnActiveListElement(){
    const containers = document.querySelectorAll('.task-list-container');
    for(let i = 0; i < containers.length; i++){
        if(containers[i].classList.contains('active')){
            return containers[i];
        }
    }
}


