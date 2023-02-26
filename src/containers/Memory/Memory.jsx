import React, {useEffect, useState} from 'react';
import {cardImages} from "../../store/store"
import Card from "../../components/Card/Card";
import classes from "./Memory.module.scss"
import Button from "../../components/Button/Button";


function generateCards(count) {
    const cards = shuffleArray(cardImages)
        .slice(0, count)
        .map((imageUrl, i) => ({
            id: i,
            imageUrl: "./assets/images/cards/" + imageUrl,
            isFlipped: false,
            canFlip: true
        }))
        .flatMap(e => [e, {...e, id: e.id * 2 + "copy"}]);

    return shuffleArray(cards);
}

function shuffleArray(array) {
    return array.sort(() => .5 - Math.random());
}

const Memory = (props) => {

    const [cards, setCards] = useState(generateCards(props.gameDifficulty));
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [newDifficulty, setNewDifficulty] = useState(5);

    useEffect(() => {
        flipAll()
    }, [])


    const flipAll = () => {
        setTimeout(() => {
            setCards(prevState => prevState.map((card) => ({
                ...card,
                isFlipped: true
            })))
        }, 3000)
    }

    const cardClick = (card) => {
        if (!card.isFlipped) {
            return;
        }
        Flips(card.id)
        if (firstCard === null) {
            setFirstCard(card);
            return;
        }
        setSecondCard(card);
    }

    function Flips(cardId) {
        setCards(prevState => prevState.map((card) => card.id === cardId ? {
            ...card,
            isFlipped: !card.isFlipped
        } : card))
    }

    useEffect(() => {
        if (secondCard !== null) {
            setTimeout(() => {
                firstCard.imageUrl === secondCard.imageUrl ? Pair(firstCard, secondCard) : FlipBack(firstCard, secondCard)
                setFirstCard(null);
                setSecondCard(null);
            }, 1500)

        }
    }, [secondCard])

    function Pair(firstCard, secondCard) {
        setCards(prevState => prevState.map(card => card.id === (firstCard.id || secondCard.id) ? {
            ...card,
            canFlip: false
        } : card))
    }

    function FlipBack(firstCard, secondCard) {
        Flips(firstCard.id);
        Flips(secondCard.id);
    }


    return (
        <div>
            <div>
                <div className={classes['game-controls']}>
                    <Button text="Home" click={() => props.setActiveView('home')} color={"#FDD723"}/>
                    <select name="" id="" onChange={e => {
                        setNewDifficulty(parseInt(e.target.value))
                    }}>
                        <option selected disabled={true} hidden={true}>Deck Size</option>
                        <option value="5">5</option>
                        <option value="7">7</option>
                        <option value="10">10</option>
                    </select>

                    <Button text="Start New Game" click={() => {
                        setCards(generateCards(newDifficulty));
                        flipAll()
                        props.setGameDifficulty(newDifficulty);
                    }} color={"#FDD723"}/>
                    <Button text="Restart" click={() => {
                        setCards(generateCards(props.gameDifficulty));
                        flipAll()
                    }} color={"#FDD723"}/>
                </div>

                <div className={classes['card-holder']}>
                    {cards.map(card => <Card onClick={() => cardClick(card)} key={card.id} {...card}/>)}
                </div>
            </div>
        </div>
    );
};

export default Memory;
