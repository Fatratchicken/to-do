// dependencies import (non native js):
import "./styles.css";
import "simple-css-reset";

// native modules: 
import { projectDialog, toDoDialog, editDialog } from "./dom-elements";


const tdDialog = new toDoDialog();
const pjDialog = new projectDialog();
const edDialog = new editDialog();

document.getElementById('new-to-do').addEventListener('click', () => tdDialog.open());
document.getElementById('new-project').addEventListener('click', () => pjDialog.open());
document.getElementById('edit-to-do').addEventListener('click', () => edDialog.open());