import React from "react";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";

export const CancelButton = (props) => <button onClick={props.onClick} type="button" className="btn btn-light">{props.name}</button>