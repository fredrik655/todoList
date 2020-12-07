

class ListItem {
    constructor(title, priority, id, date) {
        this.title = title;
        this.priority = priority;
        this.id = id;
        this.date = date;
        this.tasks = [];
    }

    

    addNewTask(taskTitle, taskPriority, taskId, taskDone = false) {
        this.tasks.push(new TaskItem(taskTitle, taskPriority, taskId, taskDone));
    };

    setTaskDescription(descriptionText, index) {
        if(this.tasks.length > index) {
            this.tasks[index].setDescription(this.tasks[index].title, descriptionText);
        }
        else {
            console.warn('index out of bound');
        }
        
    };

    

    returnTaskList() {
        return this.tasks;
    };

    printData() {
        console.table(this.tasks);
        console.log(this.title);
        console.log(this.priority);
        console.log(this.id);
    };
}

class TaskItem {
    constructor(title, priority, id, taskDone = false){
        this.title = title;
        this.priority = priority;
        this.id = id;
        this.description =  {title: '', description: '',};
        this.done = taskDone;
    }

    setDone() {
        if(this.done){
            this.done = false;
        }
        else {
            this.done = true;
        }
    }


    setDescription(titleText, descriptionText) {
        this.description.title = titleText;
        this.description.description = descriptionText;
    }
}

export {ListItem};