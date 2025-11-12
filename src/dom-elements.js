// setup event listeners:
export function setUpListeners(){
}

class FormLink(){}
class domInsert(){}

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

    addInput(fieldsetId, labelText, labelId, inputId, type){
        const fieldset = document.createElement('fieldset');
        fieldset.id = fieldsetId;

        const label = document.createElement('label');
        const input = document.createElement('input');

        label.textContent = labelText;
        label.id = labelId;
        label.htmlFor  = inputId;

        input.type = type;
        input.id = inputId;
        input.name = inputId;

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
}

export { DialogForm };


