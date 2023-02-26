import React, {useState} from 'react';
import classes from './Home.module.scss';
import Button from "../../components/Button/Button";

const Home = (props) => {

    const [deckSize, setDeckSize] = useState(5);

    const onStart = () => {
        props.setActiveView('memory');
        props.setGameDifficulty(deckSize);
    }

    return (
        <>

            <div className={classes['home']}>
                <div>
                    <img src="./assets/pokemon-title.png" alt=""/>
                </div>
                <div className={classes['start-items']}>
                    <select name="" id="" onChange={e => {
                        setDeckSize(parseInt(e.target.value))
                    }}>
                        <option selected disabled={true} hidden={true}>Deck Size</option>
                        <option value="5">5</option>
                        <option value="7">7</option>
                        <option value="10">10</option>
                    </select>
                    <Button text={"Start New Game"} click={onStart} color={"#FDD723"}/>
                </div>
                <p className={classes['rules']}>Hi! Here are the rules to play the game:</p>
            </div>
        </>
    );
}

export default Home;
