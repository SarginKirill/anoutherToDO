import React from "react";


export  const Button = (props) => (
    <button onClick={props.onClick} type="button" className="btn btn-primary">{props.name}</button>
)