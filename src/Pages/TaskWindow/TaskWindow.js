import React from "react";
import { useSelector } from "react-redux";
import UserCategoriesList from "../../Components/UserCategoriesList/UserCategoriesList";
import classes from './TaskList.module.scss'
import TaskList from "../../Components/TaskList/TaskList";


function TaskWindow() {

    const userOnline = useSelector(store => store.userData.userOnline)
    // console.log(userOnline);

    const category = userOnline.categories


    return (

        <div className={classes.conteiner}>

            <div className={classes.cat_colum}>
                <div className={classes.zag}>
                    <p>Категории:</p>
                </div>

                <div>
                    <UserCategoriesList array={category}/>
                </div>


            </div>



            <div className={classes.task_column}>

            <div className={classes.task_zag}>
                <p>Задачи:</p>
            </div>
            <div className={classes.tasklist}>
                <TaskList />
            </div>
            </div>

        </div>

    )
}

export default TaskWindow