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

const dialog = new DialogForm("legened", "dialog", "form", "New Todo", document.getElementById('to-do'));
dialog.addInput("input", "Enter: ", "label", "field", "name", "text");
dialog.addInput("another-input", "temporary", "labelId", 'inputId', 'inputName', 'text', true);
dialog.addButton("button", "Submit", "button", "button");
dialog.open();

document.getElementById('button').addEventListener('click', () => dialog.close());

document.getElementById('new-to-do').addEventListener('click', () => dialog.open());




