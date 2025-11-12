// dependencies import (non native js):
import "./styles.css";
import "simple-css-reset";

// native modules: 
import { DialogForm } from "./dom-elements";

// link main event listeners
// document.addEventListener('DOMContentLoaded', () => setUpListeners());

const dialog = new DialogForm('id', 'id', 'id', 'legend', document.querySelector('#to-do'));
dialog.addInput('nigger', 'nigger', 'nigger', 'text', 'nigga');
dialog.addButton('nigger', 'nigger', 'nigger', 'nigger', 'button');
dialog.dialog.showModal();
