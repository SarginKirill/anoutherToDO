import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../../UI/Button/Button";
import { Input } from "../../UI/Input/Input";
import classes from './Form.module.scss'


function Form (props) {


    return (


        <div className={classes.form}>

            <form>
                {

                    props.a.map((i) => (

                        <Input 
                        key={i.id} 
                        onChange={i.onChange} 
                        type={i.type} 
                        id={i.id} 
                        ph={i.ph} 
                        label={i.label} 
                        value={i.value} 
                        />
                        )
                    )
                }

                {
                     props.btn
                     ?   <div className={classes.btnLine}>
                         {/* <NavLink to='/'><Button name={props.btn.name}  onClick={props.btn.onClick}/></NavLink> */}
                         <Button name={props.btn.name}  onClick={props.btn.onClick}/>
                         {props.children}
                         </div>
                     :   null
                }
                
            </form>

        </div>

        
    )

}


export default Form