// dependencies import (non native js):
import "./styles.css";
import "simple-css-reset";

// native modules: 
import { ToDoItem  } from "./items";
import { ToDoProject, projectsArr } from "./projects";

import { toDoDialog } from "./dom-elements";

document.querySelector("#new-to-do").addEventListener('click', toDoDialog);

