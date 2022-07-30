import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import classes from './Registration.module.scss'
import Form from "../../Components/Form/Form";
import { addUser } from "../../Redux/createActions";


function Registration () {

    const state = useSelector(store => store.userData)
    const navigate = useNavigate()

    const dispatch = useDispatch()
    

    function onClickHandler() {

        let doubleUserValue = false
        

        if (!loginValue.trim()){
            alert('Логин не может быть пустым')
            return
        }
        if (!passwordValue.trim()){
            alert('Пароль не может быть пустым')
            return
        }if (!doublePassword.trim()){
            alert('Повтор пароля очень важен!')
            return
        }
        if (doublePassword !== passwordValue){
            alert('Пароли не совпадают')
            return
        }
        state.users.map((user) => {
            if(user.name === loginValue){
                doubleUserValue = true
            }
        })
        if(doubleUserValue){
            alert('Пользователь с таким именем уже зарегестрирован')
            return
        }
        
        

        const newUser = {
            name: loginValue,
            password: passwordValue,
            categories: ['Все задачи'],
            id: state.users.length + 1
        }

       dispatch({type: addUser(), payload: newUser})

       loginHandler('')
       passwordHandler('')
       doublePasswordHandler('')

       
       navigate('/', {replace: true})
       
    }

    const [loginValue, loginHandler] = useState('')
    const [passwordValue, passwordHandler] = useState('')
    const [doublePassword, doublePasswordHandler] = useState('')

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
        },
        {
            type: 'password',
            id: 'doublepass',
            ph: 'Повторите ваш пароль',
            label: 'Повторите пароль',
            value: doublePassword,
            onChange: (event) => doublePasswordHandler(event.target.value)
        }
    ]

    const btn = {
        name: 'Зарегестрироваться',
        onClick: () => onClickHandler()
    }


    return(
        <div className={classes.conteiner}>

            <h3>Регистрация</h3>
            <p>Заполните все поля</p>


            <Form a={formAtributes} btn={btn}>
                <span>Есть аккаунт? <NavLink to='/'>Aвторизуйтесь</NavLink></span>
            </Form>
           
        </div>
    )
}

export default Registration