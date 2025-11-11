// dependencies import (non native js):
import "./styles.css";
import "simple-css-reset";

// native modules: 
import { ToDoItem  } from "./items";
import { ToDoProject } from "./projects";




const item = new ToDoItem("Morning", "morning routine", "", 1, "");
const item2 = new ToDoItem("Night", "night routine", "", 2, "")

const project = new ToDoProject("Tasks", "red");
const project2 = new ToDoProject("Tasks 2", "blue");


project.addItemToProject(item2);
project.addItemToProject(item);
item.addCheckbox("Wash hands");

project.sortProject();

project.printProject();

project2.printProject();