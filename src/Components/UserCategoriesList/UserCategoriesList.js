import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, deleteCategory, filterCategory } from "../../Redux/createActions";
import { Button } from "../../UI/Button/Button";
import classes from './/UserCategoriesList.module.scss'



function UserCategoriesList(props) {
    const [value, setValue] = useState('')

    const user = useSelector(store => store.userData.userOnline)
    const tasks = useSelector(store => store.taskData)
    const dispatch = useDispatch()

    function addCategoryHendler() {
        setValue('')
        return {user, value}
    }



    function changeCategoryHandler(event) {
        const action = event.target.dataset.action
        const filter = event.target.dataset.name

        if(action === 'del'){
            dispatch({type: deleteCategory(), payload: user, filter, tasks})
        }
        if(action === 'filter'){
            dispatch({type: filterCategory(), payload: filter})
        }

    }

    

    return(
        <>
    <ul>
        {
        props.array.map((cat, index) => {
        return(
            <li 
            onClick={(e) => changeCategoryHandler(e)} 
            key={index+cat}
            className={cat === tasks.chooseCategory ? classes.active : null}
            data-action='filter'
            data-name={cat}
            ><span data-name={cat} data-action='filter'>{ cat }</span>{index > 0 ? <span data-name={cat} data-action='del' className={classes.del}>удалить</span> : null}

            </li>
                )
            })
        }
    </ul>

    <div className={classes.row_input}>
        <input 
        type="text" 
        className="form-control" 
        placeholder="Добавить категорию" 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        />

        <Button 
                name='добавить'
                onClick={() => (dispatch({type: addCategory(), payload: addCategoryHendler()}))}
            />
        </div>
        </>
    )
}


export default UserCategoriesList