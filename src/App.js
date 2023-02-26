import React, {useState} from 'react';
import './scss/global.scss';
import Home from "./containers/Home/Home";
import Memory from "./containers/Memory/Memory";

const App = () => {
    const [gameDifficulty, setGameDifficulty] = useState(null)
    const [activeView, setActiveView] = useState('home');
    const views = {
        'home': <Home setActiveView={setActiveView} setGameDifficulty={setGameDifficulty}/>,
        'memory': <Memory setActiveView={setActiveView} gameDifficulty={gameDifficulty}
                          setGameDifficulty={setGameDifficulty}/>,
    }


    return (
        <div className={activeView}>
            {views[activeView]}
        </div>
    );
};

export default App;
