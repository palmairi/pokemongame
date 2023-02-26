import React from "react";
import classes from './Card.module.scss';
import cardBg from "./card-back.png";


const Card = (props) => {
    return (
        <div className={classes['card-container']} onClick={props.onClick}>
            <div className={`${classes.card} ${(props.isFlipped ? classes.flipped : '')}`}>
                <img className={classes.side} src={props.imageUrl}/>
                <div className={`${classes.side} ${classes.back}`}>
                    <img src={cardBg}/>
                </div>
            </div>
        </div>

    );
}

export default Card;
