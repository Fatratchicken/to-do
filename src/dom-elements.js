// setup event listeners:
export function setUpListeners(){
}

class DialogForm{
    constructor(legendId,  dialogId, formId, legendText, parent){
        this.legend = document.createElement('legend');
        this.legend.textContent = legendText;
        
        this.dialog = document.createElement('dialog');
        this.form = document.createElement('form');

        this.legend.id = legendId;
        this.dialog.id = dialogId;
        this.form.id = formId;

        this.inputTypes = {
            Text: "text",
            Date: "date",
            Number: "number"
        };

        this.buttonTypes = {
            Button: "button"
        }
        
        this.form.appendChild(this.legend);
        this.dialog.appendChild(this.form);
        parent.appendChild(this.dialog);
    }

    addInput(fieldsetId, labelText, labelId, inputId, inputName, type, temporary){
        const fieldset = document.createElement('fieldset');
        fieldset.id = fieldsetId;

        const label = document.createElement('label');
        const input = document.createElement('input');

        label.textContent = labelText;
        label.id = labelId;
        label.htmlFor  = inputId;

        input.type = type;
        input.id = inputId;
        input.name = inputName;

        if (!!temporary){
            fieldset.classList.add('temporary');
        }

        fieldset.appendChild(label);
        fieldset.appendChild(input);
        this.form.appendChild(fieldset);
    }

    addButton(fieldsetId, buttonText, buttonId, type){
        const fieldset = document.createElement('fieldset');
        fieldset.id = fieldsetId;

        const button = document.createElement('button');

        button.id = buttonId;
        button.type = type;
        button.textContent = buttonText;

        fieldset.appendChild(button);
        this.form.appendChild(fieldset);
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

const newToDoForm = (function(){
    const toDoContainer = document.getElementById('to-do');
    const dialog = new DialogForm("to-do-legend", "to-do-dialog", "to-do-form", "New Todo", toDoContainer);
    
    function init(){
        dialog.addInput("item-title", "Title: ", "title-label", "title-input", "title", dialog.inputTypes.Text);
        dialog.addInput("item-description", "Description: ", "description-label", "description-input", "description", dialog.inputTypes.Text);
        dialog.addInput("item-due-date", "Duedate: ", "duedate-label", "duedate-input", "duedate", dialog.inputTypes.Date);
        dialog.addInput("item-priority", "Priority: ", "priority-label", "priority-input", "priority", dialog.inputTypes.Number);

        dialog.addButton("checkbox-button", "Add Checkbox", "checkbox-button", dialog.buttonTypes.Button);

        dialog.addButton("add-button", "Add", "add-button", dialog.buttonTypes.Button);
        dialog.addButton("cancel-button", "Cancel", "cancel-button", dialog.buttonTypes.Button);
    }

    function eventHandlers(){
        const checkboxButton = document.getElementById("checkbox-button");
        const addButton = document.getElementById("add-button");
        const cancelButton = document.getElementById("cancel-button");
    
        checkboxButton.addEventListener('click', checkboxAction);
        addButton.addEventListener('click', addAction);
        cancelButton.addEventListener('click', cancelAction);
    }   

    function checkboxAction(){}
    function addAction(){}
    function cancelAction(){}

    return { init };
}())    


// dialog.addInput("input", "Enter: ", "label", "field", "name", "text");
// dialog.addInput("another-input", "temporary", "labelId", 'inputId', 'inputName', 'text', true);
// dialog.addButton("button", "Submit", "button", "button");
// dialog.open();



document.getElementById('new-to-do').addEventListener('click', () => );




