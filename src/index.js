// dependencies import (non native js):
import "./styles.css";
import "simple-css-reset";

// native modules: 
import { projectDialog, toDoDialog, editDialog, linkItem, displayItem, displayProjects } from "./dom-elements";
import { projectArr } from "./projects";
import { ToDoProject } from "./projects";


const tdDialog = new toDoDialog();
const pjDialog = new projectDialog();
const edDialog = new editDialog();

document.getElementById('new-to-do').addEventListener('click', () => tdDialog.open());
document.getElementById('new-project').addEventListener('click', () => pjDialog.open());
document.getElementById('edit-to-do').addEventListener('click', () => edDialog.open());

document.getElementById('sidebar').addEventListener('click', (event) => {
    const target = event.target;

    if (target.dataset.id){
        for (const project of projectArr.arr){
            for(const toDo of project.toDoArr){
                if (target.dataset.id == toDo.uuid){
                    linkItem.currentItem = toDo;
                    toDoDialog.currentProject = project;

                    const projectDisplay = new displayProjects(projectArr);
                    projectDisplay.display();
            
                    const display = new displayItem(toDo);
                    display.display();
                }
            }
        }
    }

    // for project selection:
    if (target.dataset.projectId){
        for (const project of projectArr.arr){
            if (project.uuid == target.dataset.projectId){
                toDoDialog.currentProject = project;
                linkItem.currentItem = toDoDialog.currentProject.toDoArr[0];
            }
        }

        const projectDisplay = new displayProjects(projectArr);
        projectDisplay.display();

        if (toDoDialog.currentProject.toDoArr.length > 0){
            const display = new displayItem(linkItem.currentItem);
            display.display();
        }

    }
})

document.getElementById('delete').addEventListener('click', () => {
    const currentProject = toDoDialog.currentProject;
    const currentItem = linkItem.currentItem;

    currentProject.toDoArr = currentProject.toDoArr.filter(toDo => toDo.uuid != currentItem.uuid);

    if (currentProject.toDoArr.length > 0){
        linkItem.currentItem = currentProject.toDoArr[currentProject.toDoArr.length - 1];


        const display = new displayItem(linkItem.currentItem);
        display.display();

    }

    else{
        linkItem.currentItem = '';
        document.getElementById('to-do').innerHTML = '';
        document.getElementById('header').textContent = 'header';

    }

    const projectDisplay = new displayProjects(projectArr);
    projectDisplay.display();

});

document.getElementById('delete-project').addEventListener('click', () => {
    const currentProject = toDoDialog.currentProject;

    projectArr.removeFromArr(currentProject);

    if (projectArr.arr.length > 0){
        toDoDialog.currentProject = projectArr.arr[projectArr.arr.length - 1];

        if (toDoDialog.currentProject.toDoArr.length > 0){
            linkItem.currentItem = toDoDialog.currentProject.toDoArr[toDoDialog.currentProject.toDoArr.length - 1];

            const display = new displayItem(linkItem.currentItem);
            display.display();
        }

        else{
            linkItem.currentItem = '';
        }



        const projectDisplay = new displayProjects(projectArr);
        projectDisplay.display();

    }

    else{
        toDoDialog.currentProject =  new ToDoProject('default', 'blue');
        document.getElementById('sidebar').innerHTML = '';
    }

})