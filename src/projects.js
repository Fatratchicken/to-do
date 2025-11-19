// code for project objects:
class ToDoProject {
    constructor (title, color){
        this.title = title;
        this.color = color;
        this.toDoArr = [];

        this.uuid = crypto.randomUUID();
        
        projectArr.addToArr(this);
    }

    addItemToProject(toDoItem){
        this.toDoArr.push(toDoItem);
    }

    addArrayToProject(toDoArr){
        this.toDoArr.push(...toDoArr);
    }

    removeFromProject(toDoItem){
        this.toDoArr = this.toDoArr.filter((item) => item != toDoItem);
    }

    sortProject(){
        this.toDoArr.sort((a,b) => a.priority - b.priority);
    }

    printProject(){
        console.log(`title: ${this.title}, color: ${this.color}`);
        console.log("\n");

        for (const item of this.toDoArr){
            item.printItem();
            console.log("\n"); 
        }
    }

}

// IIFE for project list:
const projectArr = (function(){
    const arr = [];

    const addToArr = function(project){
        arr.push(project);
    }

    const removeFromArr = function(project){
        arr = arr.filter((item) => item != project);
    }

    const printArr = function(){
        for (const project of arr){
            project.printProject();
        }
    }   


    return { addToArr, removeFromArr, printArr, arr};


}());

export { ToDoProject, projectArr};