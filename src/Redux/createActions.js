import { 
    ADD_CATEGORY,
    ADD_TODO, 
    ADD_USER, 
    DELETE_CATEGORY, 
    EXIT_USER, 
    FILTER_CATEGORY, 
    LOGIN_USER, 
    REMOVE_TODO, 
    TOGGLE_TODO } from "./actions";

//TASK crateACTIONS
export function addToDo() {
    return ADD_TODO
}

export function removeToDo() {
    return REMOVE_TODO
}

export function toggleToDo() {
    return TOGGLE_TODO
}
export function filterCategory() {
    return FILTER_CATEGORY
}



//USER createACTIONS
export function addUser() {
    return ADD_USER
}

export function loginUser() {
    return LOGIN_USER
}

export function exitUser() {
    return EXIT_USER
}

export function addCategory() {
    return ADD_CATEGORY
}

export function deleteCategory(){
    return DELETE_CATEGORY
}
