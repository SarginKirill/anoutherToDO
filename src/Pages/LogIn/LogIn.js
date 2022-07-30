import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { store } from "../../Redux/store";
import Form from "../../Components/Form/Form";
import classes from './LogIn.module.scss'
import { loginUser } from "../../Redux/createActions";



function LogIn() {

    const dispatch = useDispatch()

    const state = useSelector(store => store.userData)
    

    const [loginValue, loginHandler] = useState('')
    const [passwordValue, passwordHandler] = useState('')



    const formAtributes = [
        {
            type: 'text',
            id: 'login',
            ph: 'Введите ваш логин',
            label: 'Логин',
            value: loginValue,
            onChange: (event) => loginHandler(event.target.value)
        },
        {
            type: 'password',
            id: 'pass',
            ph: 'Введите ваш пароль',
            label: 'Пароль',
            value: passwordValue,
            onChange: (event) => passwordHandler(event.target.value)
        }
    ]

    const btn = {
        name: 'Войти',
        onClick: () => onLoginHandler()
    }



    
    function onLoginHandler() {

        const user = state.users.find(user => user.name.toLocaleLowerCase() === loginValue.toLocaleLowerCase() && user.password === passwordValue)
        

        if (user){
            dispatch({type: loginUser(), payload: user})
        }else{
            alert('Неверно ввели логин или пароль')
        }
        


        loginHandler('')
        passwordHandler('')
    }




    return (

        <div className={classes.conteiner}>

            {
                state.userOnline
                ? null  
                : <>
                    <h3>Добро Пожаловать</h3>
                    <p>Войдите в свой аккаунт</p>
                    <p className={classes.smallText}>Для тестового ознакомления,
                    вы можете использовать "admin",
                    в качестве логина и пароля</p>

                    <Form a={formAtributes} btn={btn}>
                    <span>Или вы можете <NavLink to='registration'>зарегистрироваться</NavLink></span>
                    </Form>
                </>
            }
            
        </div>
    )
}



export default LogIn