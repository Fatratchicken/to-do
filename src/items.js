// code for toDo items:
class ToDoItem{
    constructor (title, description, dueDate, priority, notes, complete){
        this.title = title;
        this.description = description;

        this.dueDate = (!!dueDate) ? new Date(dueDate): new Date();

        this.priority = priority; 
        this.notes = notes;

        this.complete = !!complete;
        
        this.checkboxArr = [];
    }

    printItem(){
        for (const key in this){
            if (key == "checkboxArr"){
                for (const checkbox of this[key]){
                    console.log(`checkbox: ${checkbox.title}, checked: ${checkbox.complete}`);
                }
            }

            else{
                console.log(`${key}: ${this[key]}`);
            }
        }
    }
    
    completeItemToggle(){
        this.complete = !this.complete;
    }

    changePriority(num){
        this.priority = num;
    }

    addCheckbox(title, complete){
        this.checkboxArr.push(new Checkbox(title, complete));
    }
}

// checkboxes (private class): 
class Checkbox{
    constructor(title, complete){
        this.title = title;
        this.complete = !!complete;
    }

    completeCheckboxToggle(){
        this.complete = !this.complete;
    }

}

export { ToDoItem };