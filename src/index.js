// dependencies import (non native js):
import "./styles.css";
import "simple-css-reset";

// native modules: 
import { projectDialog, toDoDialog, editDialog, linkItem, displayItem, displayProjects } from "./dom-elements";
import { projectArr } from "./projects";


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
})