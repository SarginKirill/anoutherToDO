import { async } from "@firebase/util";
import React from "react";
import { useSelector } from "react-redux";
import LogIn from "../LogIn/LogIn";
import TaskWindow from "../TaskWindow/TaskWindow";


function HomePage() {

    const state = useSelector(store => store.userData)

    // fetch('https://jsonplaceholder.typicode.com/todos/1')
    // .then(response => response.json())
    // .then(json => console.log(json))

    const url ='https://jsonplaceholder.typicode.com/users'

    async function test() {
        const response = await fetch(url)
        const users = await response.json()
        console.log(users)
    }

    test()

    return(

        <>
            {
                state.userOnline
                ? <TaskWindow />  
                : <LogIn />
            }
            
        </>

    )
}


export default HomePage