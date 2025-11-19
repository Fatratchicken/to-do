import { ToDoItem } from "./items";
import { ToDoProject, projectArr } from "./projects";

class DialogForm{
    constructor(dialogId, formId, parent){
        this.dialog = document.createElement('dialog');
        this.form = document.createElement('form');

        this.dialog.id = dialogId;
        this.form.id = formId;

        this.dialog.appendChild(this.form);
        parent.appendChild(this.dialog);
    }

    addInput(labelText, labelId, inputId, inputName, type, parent, temporary, editForm){
        const label = document.createElement('label');
        const input = document.createElement('input');

        label.textContent = labelText;
        label.id = labelId;
        label.htmlFor  = inputId;

        input.type = type;
        input.id = inputId;
        input.name = inputName;

        if (!!temporary){
            parent.classList.add('temporary');
        }

        parent.appendChild(label);
        parent.appendChild(input);

        if (!editForm){
            this.form.appendChild(parent);
        }

    }

    addButton(buttonText, buttonId, type, parent, editForm){
        const button = document.createElement('button');

        button.id = buttonId;
        button.type = type;
        button.textContent = buttonText;

        parent.appendChild(button);

        if (!editForm){
            this.form.appendChild(parent);
        }
    }

    addLegend(legendId, legendText, parent, editForm){
        const legend = document.createElement('legend');
        legend.id = legendId;
        legend.textContent = legendText;

        parent.appendChild(legend);

        if (!editForm){
            this.form.append(parent);
        }
    }

    createFieldset(fieldsetId){
        const fieldset = document.createElement('fieldset');
        fieldset.id = fieldsetId;

        return fieldset;
    }

    open(){
        this.dialog.showModal();
    }

    close(){
        this.dialog.close();

        // delete temporary controls:
        const temporaryControls = document.querySelectorAll('.temporary');

        temporaryControls.forEach((control) => {
            control.remove();
        })

    }
}


class projectDialog extends DialogForm{
    constructor(){
        const projectDialogContainer = document.querySelector('body');
        super("project-dialog", "project-form", projectDialogContainer);

        this.dialogInit();
        this.eventHandler();
    }   

    dialogInit(){
        this.addLegend("new-project-legend", "New Project", this.createFieldset("new-project-legend-fieldset"));
        this.addInput("Name: ", "project-name-label", "project-name-input", "name", "text", this.createFieldset("new-project-name-input"));
        this.addInput("Color: ", "project-color-label", "project-color-input", "color", "text", this.createFieldset("new-project-color-input"));

        const buttonContainer = this.createFieldset("new-project-button-container");

        this.addButton("Add", "project-add-button", "button", buttonContainer);
        this.addButton("Cancel", "project-cancel-button", "button", buttonContainer);
    }

    eventHandler(){
        const addButton = document.getElementById("project-add-button");
        const cancelButton = document.getElementById("project-cancel-button");

        addButton.addEventListener('click', () => this.addAction());
        cancelButton.addEventListener('click', () => this.close());
    }

    addAction(){
        const linkedProject = new linkProject(this.form);
        toDoDialog.currentProject = linkedProject.project;

        const projectDisplay = new displayProjects(projectArr);
        projectDisplay.display();

        this.close();
    }
}

class toDoDialog extends DialogForm{
    static currentProject = new ToDoProject('default', 'blue');

    constructor(){
        const toDoDialogContainer = document.querySelector('body');
        super("to-do-dialog", "to-do-form", toDoDialogContainer);

        this.checkboxIdCount = 1;

        this.dialogInit();
        this.eventHandler();
    }

    dialogInit(){
        this.addLegend("new-to-do-legend", "New To Do", this.createFieldset("new-to-do-legend-fieldset"));
        this.addInput("Title: ", "to-do-title-label", "to-do-title-input", "title", "text", this.createFieldset("new-to-do-title-input"));
        this.addInput("Description: ", "to-do-description-label", "to-do-description-input", "description", "text", this.createFieldset("new-to-to-description-input"));
        this.addInput("Duedate: ", "to-do-dueDate-label", "to-do-dueDate-input", "dueDate", "date", this.createFieldset("new-to-do-dueDate-fieldset"));
        this.addInput("Priority: ", "to-do-priority-label", "to-do-priority-input",  "priority", "number", this.createFieldset("new-to-do-priority-fieldset"));

        const checkboxContainer =  this.createFieldset("to-do-checkbox-container");
        this.addButton("Add Checkbox", "to-do-add-checkbox-button", "button",checkboxContainer);

        const buttonContainer = this.createFieldset("new-to-to-button-container");
        this.addButton("Add", "to-do-add-button", "button", buttonContainer);
        this.addButton("Cancel", "to-do-cancel-button", "button", buttonContainer);
    }

    eventHandler(){
        const addCheckboxButton = document.getElementById("to-do-add-checkbox-button");
        const addButton = document.getElementById("to-do-add-button");
        const cancelButton = document.getElementById("to-do-cancel-button");

        addCheckboxButton.addEventListener('click', () => this.addCheckboxAction(document.getElementById("to-do-checkbox-container")));
        addButton.addEventListener('click', () => this.addAction());
        cancelButton.addEventListener('click', () => this.close());
    }

    addCheckboxAction(EmptyParent){
        const parent = this.createFieldset(`checkbox-fieldset-${this.checkboxIdCount}`);
        EmptyParent.appendChild(parent);

        this.addInput("Checkbox: ", `checkbox-label-${this.checkboxIdCount}`, `checkbox-input-${this.checkboxIdCount}`, `checkbox-${this.checkboxIdCount}`, "text", parent, true, true);

        this.checkboxIdCount++;
    }

    addAction(){
        const linkedItem = new linkItem(this.form);
        toDoDialog.currentProject.addItemToProject(linkedItem.item);

        const projectDisplay = new displayProjects(projectArr);
        projectDisplay.display();

        const display = new displayItem(linkedItem.item);
        display.display();

        this.close();
    }
}

class editDialog extends DialogForm{
    constructor(){
        const editDialogContainer = document.querySelector('body');
        super("edit-dialog", "edit-form", editDialogContainer);

        this.dialogInit();
        this.eventHandler();
    }

    dialogInit(){
        this.addLegend("edi-to-do-legend", "Edit To Do", this.createFieldset("edit-to-do-legend-fieldset"));
        this.addInput("Title: ", "edit-title-label", "edit-title-input", "title", "text", this.createFieldset("edit-to-do-title-input"));
        this.addInput("Description: ", "edit-description-label", "edit-description-input", "description", "text", this.createFieldset("edit-to-to-description-input"));
        this.addInput("Duedate: ", "edit-dueDate-label", "edit-dueDate-input", "dueDate", "date", this.createFieldset("edit-to-do-dueDate-fieldset"));
        this.addInput("Priority: ", "edit-priority-label", "edit-priority-input",  "priority", "number", this.createFieldset("edit-to-do-priority-fieldset"));


        const buttonContainer = this.createFieldset("edit-to-to-button-container");
        this.addButton("Edit", "to-do-edit-button", "button", buttonContainer);
        this.addButton("Cancel", "edit-cancel-button", "button", buttonContainer);
    }

    eventHandler(){
        const editButton = document.getElementById("to-do-edit-button");
        const cancelButton = document.getElementById("edit-cancel-button");

        editButton.addEventListener('click', () => this.editAction());
        cancelButton.addEventListener('click', () => this.cancelAction());
    }

    editAction(){
        const linkedItem = new linkItem(this.form, true);

        if (linkItem.currentItem != ''){
            const projectDisplay = new displayProjects(projectArr);
            projectDisplay.display();

            const display = new displayItem(linkItem.currentItem);
            display.display();


        }

        this.close();

    }

    cancelAction(){
        this.close();
    }
}


class linkItem{
    static currentItem = '';

    constructor(form, isEdit){
        this.data = new FormData(form);

        if (!isEdit){
            this.item = new ToDoItem(this.data.get("title"), this.data.get("description"), this.data.get("dueDate").split('-'), this.data.get("priority"));
            linkItem.currentItem = this.item;
            
            this.linkCheckbox();
        }

        else{
            if (linkItem.currentItem == ''){
                return;

            }

            else{
                linkItem.currentItem.title = (this.data.get("title")) == '' ?  linkItem.currentItem.title: this.data.get("title");
                linkItem.currentItem.description = (this.data.get("description")) == '' ? linkItem.currentItem.description: this.data.get("description");
                linkItem.currentItem.dueDate = this.data.get("dueDate").split("-") == '' ? linkItem.currentItem.dueDate: this.data.get("dueDate");
                linkItem.currentItem.priority = this.data.get("priority") == '' ? linkItem.currentItem.priority: this.data.get("priority");
            }

        }

    }

    linkCheckbox(){
        for (const data of this.data.entries()){
            if (data[0].includes("checkbox")){
                this.item.addCheckbox(data[1]);
            }
        }
    }
}

class linkProject{
    constructor(form){
        this.data = new FormData(form);
        this.project = new ToDoProject(this.data.get("name"), this.data.get("color"));
    }
}

class displayItem{
    constructor(item){
        this.item = item;
        this.parent = document.getElementById('to-do');
        this.header = document.getElementById('header');

        this.parent.innerHTML = '';
    }

    display(){
        this.header.textContent = this.item.title;

        const descriptionDom = document.createElement('p');
        descriptionDom.textContent = this.item.description;
        this.parent.appendChild(descriptionDom);

        const dueDateDom = document.createElement('p');
        dueDateDom.textContent = this.item.dueDate;
        this.parent.appendChild(dueDateDom);

        const priorityDom = document.createElement('p');
        priorityDom.textContent = this.item.priority;
        this.parent.appendChild(priorityDom);

        this.checkboxDisplay();
    }

    checkboxDisplay(){
        let checkboxIdCount = 1;

        for (const checkbox of this.item.checkboxArr){
            const checkboxDom = document.createElement('input');
            const label = document.createElement('label');

            label.textContent = checkbox.title;
            
            checkboxDom.id = `checkbox-dom-${checkboxIdCount}`;
            checkboxDom.type = "checkbox";

            label.htmlFor = checkboxDom.id;

            this.parent.appendChild(label);
            this.parent.appendChild(checkboxDom);

            checkboxIdCount++;
        }
    }
}


class displayProjects{
    constructor(projectArr){
        this.projectArr = projectArr.arr;
        this.parent = document.getElementById('sidebar');

        this.parent.innerHTML = '';
    }

    display(){
        for (const project of this.projectArr){
            project.sortProject();

            if (project.toDoArr.length == 0 && project.title == 'default' && this.projectArr.length > 1){
                this.projectArr = this.projectArr.filter(project => project.title != "default");
            }

            else{
                const title = document.createElement('h1');
                title.textContent = project.title;

                this.parent.appendChild(title);

                for (const todo of project.toDoArr){
                    const todoTitle = document.createElement('button');
                    todoTitle.textContent = `__${todo.title}`;
                    todoTitle.dataset.id = todo.uuid;

                    this.parent.appendChild(todoTitle);
                }
            }

        }
    }
}

export { toDoDialog, projectDialog, editDialog, linkItem, displayItem, displayProjects }