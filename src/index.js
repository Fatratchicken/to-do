// dependencies import (non native js):
import "./styles.css";
import "simple-css-reset";

// native modules: 
import { projectDialog, toDoDialog } from "./dom-elements";


const tdDialog = new toDoDialog();
const pjDialog = new projectDialog();

document.getElementById('new-to-do').addEventListener('click', () => tdDialog.open());
document.getElementById('new-project').addEventListener('click', () => pjDialog.open());