import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { exitUser } from "../../Redux/createActions";
import { CancelButton } from "../../UI/Button/CancelButton";
import classes from './NavBar.module.scss'


function NavBar() {

    const state = useSelector( store => store.userData.userOnline)

    const dispatch = useDispatch()

    return (
        <div className={classes.NavBar}>
            <div className={classes.Logo}><NavLink to='/'>logo</NavLink></div>

            {
            state
            ?   <div className={classes.Profile}>
                    <p>
                        Привет <span>{state.name}</span>
                    </p>
                    <CancelButton onClick={() => dispatch({type: exitUser()})} name='Выйти' />
                </div>
            : null
            }
            
        </div>
    )
}

export default NavBar