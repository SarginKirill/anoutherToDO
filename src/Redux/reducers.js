import { combineReducers } from "redux";
import { ADD_CATEGORY, ADD_TODO, ADD_USER, DELETE_CATEGORY, EXIT_USER, FILTER_CATEGORY, LOGIN_USER, REMOVE_TODO, TOGGLE_TODO } from "./actions";






import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite'
import { getDatabase, ref, set, get, child } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyDYZNlRecHorQydRO1-i34CbvHgezIVh8M",
  authDomain: "test-a21b4.firebaseapp.com",
  projectId: "test-a21b4",
  storageBucket: "test-a21b4.appspot.com",
  messagingSenderId: "985111483387",
  appId: "1:985111483387:web:60d551dc32c88da990f15e",
  databaseURL: 'https://test-a21b4-default-rtdb.europe-west1.firebasedatabase.app/'
}

// const firebaseInit = initializeApp(firebaseConfig)
// // console.log(firebaseInit);

// const link = getFirestore(firebaseInit)
// // console.log(link);




// const dbRef = ref(getDatabase())
// const initialStateUsers = get(child(dbRef, `users/`)).then((users) => {
// if(users.exists()){
//     return users
// }else{
//     alert('Не получил данные с сервера')
// }
// }).catch((error) => {
// console.log(error);
// })















const initialStateUsers = {
    users: [
        {
         name: 'admin',
         password: 'admin',
         id: 1,
         categories: ['Все задачи']
        },
        {
            name: '1',
            password: '1',
            id: 2,
            categories: ['Все задачи', 'категория'],
        }
    ]
}

const initialStateTasks = {
    chooseCategory: 'Все задачи',
    todos: [
        {
            text: 'Tst todo from state',
            userID: 2,
            taskID: 1,
            completed: false,
            cat: 'Все задачи'
        },
        {
            text: 'Test tdo from state',
            userID: 1,
            taskID: 12,
            completed: false,
            cat: 'Все задачи'
        },
        {
            text: 'Test todo frm state',
            userID: 2,
            taskID: 18,
            completed: false,
            cat: 'Все задачи'
        },
        {
            text: 'Test todo from sate',
            userID: 2,
            taskID: 112,
            completed: false,
            cat: 'Все задачи'
        },
    ]
}

const taskReducer = (state = initialStateTasks, action) => {
    switch (action.type){
        case TOGGLE_TODO: //A
            const test = [...state.todos].find((el) => (el.taskID === action.payload.taskID))
            test.completed = !test.completed
            
            return {
                ...state,
                todos: [...state.todos] 
            }

        case REMOVE_TODO: //A
            const task = [...state.todos].indexOf(action.payload)
            state.todos.splice(task, 1)
            
            return {
                ...state,
                todos: [...state.todos]
            }

        case ADD_TODO: //A
            return{
                ...state,
                todos: [...state.todos, action.payload]
            }

        case DELETE_CATEGORY: //A
            action.tasks.todos.map((task, index) => {
                if (task.completed && task.cat === action.filter){
                    state.todos.splice(index, 1)
                }
            })
            return {
                ...state,
                chooseCategory: 'Все задачи'
            }

        case FILTER_CATEGORY:
            return{
                ...state,
                chooseCategory: action.payload
            }

        case EXIT_USER:
            return {
                ...state,
                chooseCategory: 'Все задачи'
            }

        


        default:
            return state
    }

}



const userReducer = (state = initialStateUsers, action) => {
    switch (action.type){
        case ADD_USER: //A
            return {
                ...state,
                userOnline: action.payload,
                users: [...state.users, action.payload]
            }
        
        case LOGIN_USER: //A
            return {
                ...state,
                userOnline: action.payload
            }

        case EXIT_USER:
            return {
                ...state,
                userOnline: null
            }
        
        case ADD_CATEGORY: //A
            const user = action.payload.user
            const text = action.payload.value

            const globalUsers = state.users.find((userOfAll) => userOfAll.id === user.id)
            globalUsers.categories.push(text)

            return {
                ...state,
                userOnline: {...user}
                
            }
 
            case DELETE_CATEGORY:  //A
                const userOnline = state.userOnline
                const allTodos = action.tasks.todos

                const actionTodos = allTodos.filter((task) => task.cat === action.filter)

                actionTodos.map((task, index) => {
                    if (!task.completed){
                        task.cat = 'Все задачи'
                    }else{
                        actionTodos.splice(index, 1)
                    }

                   
                })

                const removeCategory = [...userOnline.categories].indexOf(action.filter)
                userOnline.categories.splice(removeCategory, 1)
    
                return {
                    ...state,
    
                }
            
            


        default:
            
            return state
    }
}








// function writeUserData(name, password, id, categories) {
//     const db = getDatabase();
//     set(ref(db, 'users/' + id), {
//       name: name,
//       password: password,
//       id: id,
//       categories: categories
//     });
//   }

//   function writeTodosData(text, userID, taskID, completed, cat) {
//     const db = getDatabase()
//     set(ref(db, 'todos/' + taskID), {
//         text,
//         userID,
//         taskID,
//         completed,
//         cat
//     })
//   }

//   initialStateUsers.users.map((user) => {
//     writeUserData(user.name, user.password, user.id, user.categories)
//   })

//   initialStateTasks.todos.map((task) => {
//     writeTodosData(task.text, task.userID, task.taskID, task.completed, task.cat)
//   })

//   const dbRef = ref(getDatabase())

  

//   get(child(dbRef, `testName/`)).then((action) => {
//     if (action.exists()) {
//       console.log(action.val());
//     } else {
//       console.log("No data available");
//     }
//   }).catch((error) => {
//     console.error(error);
//   });


//   get(child(dbRef, `todos`))
//   .then((todos) =>{
//     if (todos.exists()) {
//         console.log(todos.val())
//     }else {
//         console.log("No data available");
//       }
//     }).catch((error) => {
//       console.error(error);
//     });
  


  




export const rootReducer = combineReducers({taskData: taskReducer, userData: userReducer})