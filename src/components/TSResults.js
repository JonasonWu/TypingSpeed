import React, {useState} from "react";
//import History, {useHistory} from "react-router-dom";
import './TS.css';

function TSResults(props) {
    //const history = useHistory();

    //Words per minute based on calculation
    const [wpm] = useState(props.wpm);
    //Seconds user took to finish the game
    const [seconds] = useState(props.seconds);
    //The number of correct characters typed during the game
    const [correct] = useState(props.correct);
    //The decimal representation of how well the user did in the game
    const [accuracy] = useState(correct/props.textLength); 
    //The recorded score for the user 
    const [score] = useState(Math.round(wpm * accuracy));

    return (
        <div>
            <div className="TS-top-section" style={{userSelect:"none"}}>
                <div className="TS-txt-sty2">
                    Typing Test
                </div>
                <div className="TS-txt-sty4">
                    Score: {score}
                </div>
                <div className="TS-txt-sty3">
                    Your typing speed is {wpm} WPM.
                </div>
                <div className="TS-txt-sty3">
                    Your accuracy is {Math.round(accuracy*10000)/100}%.
                </div>
                <div className="TS-txt-sty3">
                    Save your score to see how you compare.
                </div>
                <div className="TS-txt-sty3">
                    You typed a total of {correct} correct characters in {seconds} seconds.
                </div>

                <div style={{display:"flex", flexDirection:"row", gap:"20px"}}>
                    <button className="TS-save-button" 
                    onClick={()=>{
                        //history.push("/Dashboard");
                    }}>
                        Save Score
                    </button>
                    <button className="TS-redo-button" onClick={()=>{
                        props.setReset(true)
                        }}>
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TSResults;