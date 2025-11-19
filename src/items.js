// code for toDo items:
class ToDoItem{
    constructor (title, description, dueDate, priority){
        this.title = title;
        this.description = description;

        this.dueDate = (!!dueDate) ? new Date(dueDate): new Date();

        this.priority = priority; 

        // non-paramater:
        
        this.complete = false;
        
        this.checkboxArr = [];

        this.uuid = crypto.randomUUID();
    }

    get header(){
        return (`Title: ${this.title}, Duedate: ${this.dueDate}`);
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

    printItem(){
        for (const key in this){
            if (key == "checkboxArr"){
                for (const checkbox of this[key]){
                    console.log(`\tcheckbox: ${checkbox.title}, checked: ${checkbox.complete}. `);
                }

            }

            else{
                console.log(`${key}: ${this[key]}`);
            }
        }
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