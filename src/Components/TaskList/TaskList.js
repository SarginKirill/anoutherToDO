import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToDo,
  filterCategory,
  removeToDo,
  toggleToDo,
} from '../../Redux/createActions'
import { Button } from '../../UI/Button/Button'
import classes from './List.module.scss'

function TaskList() {
  const user = useSelector((store) => store.userData.userOnline)
  const allTodos = useSelector((store) => store.taskData.todos)
  const chooseCategory = useSelector((store) => store.taskData.chooseCategory)
  const dispatch = useDispatch()

  const [value, setValue] = useState('')
  const [cat, setCat] = useState('')

  const myTodos = allTodos.filter((item) => {
    if (item.userID === user.id) {
      if (chooseCategory === 'Все задачи') {
        return item
      } else {
        if (item.cat === chooseCategory) {
          return item
        }
      }
    }
  })

  function addTaskHandler() {
    const newTask = {
      text: value,
      userID: user.id,
      taskID: allTodos.length + 1,
      completed: false,
      cat: cat,
    }

    dispatch({ type: addToDo(), payload: newTask })

    setValue('')
  }

  return (
    <div className={classes.TaskList}>
      <div>
        {myTodos.length ? (
          myTodos.map((task) => {
            return (
              <label
                onChange={(e) =>
                  dispatch({
                    type: toggleToDo(),
                    payload: myTodos.find(
                      (el) => el.taskID === Number(e.target.id)
                    ),
                  })
                }
                key={task.taskID}
              >
                <div className={classes.task}>
                  <input
                    id={task.taskID}
                    type="checkbox"
                    defaultChecked={task.completed}
                  />
                  <p className={task.completed ? classes.done : null}>
                    {task.text}
                  </p>
                </div>
                <label
                  className={classes.delete}
                  id={task.taskID}
                  onClick={(e) => {
                    dispatch({
                      type: removeToDo(),
                      payload: myTodos.find(
                        (el) => el.taskID === Number(e.target.id)
                      ),
                    })
                  }}
                >
                  &#10006; <span id={task.taskID}>удалить</span>
                </label>
              </label>
            )
          })
        ) : (
          <h3>Нет задач</h3>
        )}
      </div>

      <div className={classes.row_input}>
        <input
          type="text"
          className="form-control"
          placeholder="Добавить задачу"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <select
          className="form-select"
          style={{ maxWidth: '150px', marginRight: '10px' }}
          onChange={(e) => setCat(e.target.value)}
        >
          {user.categories.map((category, index) => {
            return (
              <option key={index} value={category}>
                {category}
              </option>
            )
          })}
        </select>

        <Button name="добавить" onClick={() => addTaskHandler()} />
      </div>
    </div>
  )
}

export default TaskList
