import React from "react";
import classes from "./Button.module.scss";

const Button = (props) => {

    return (
        <button className={classes['button']} type="button" style={{background: props.color}}
                onClick={() => props.click()}>
            <p>{props.text}</p>
        </button>
    );
};

export default Button;
