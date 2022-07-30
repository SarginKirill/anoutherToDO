import React from "react";

export const Input = (props) => {


    return (
        <div>
            <label htmlFor={props.id} className="form-label">{props.label}</label>
            <input onChange={props.onChange} type={props.type} className="form-control" value={props.value} id={props.id} aria-describedby="emailHelp" placeholder={props.ph} />
        </div>
    )
}
    