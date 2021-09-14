import React, {useState, useEffect} from "react";
import Results from "./TSResults";
import Texts from "./TSTexts";
import "./TS.css";


function TSMinigame() {
    //Answer to: Has the game started?
    const [startGame, setGame] = useState(false);

    //Answer to: Has the game ended and it is time to show the results?
    const [showResults, setResults] = useState(false);

    //Answer to: Should I refresh the Hooks to play the game again?
    const [reset, setReset] = useState(false);

    //Generate text to be typed by user. It is also what is displayed on user's screen
    const [text, setText] = useState(Texts());
    //Using text, create a character array with it
    const [charArray, setCharArray] = useState(String(text).split(""));

    //The background color of each letter of charArray based on index. True should be green, false should be red.
    const [highlights, setHighlights] = useState([]);
    //Answer to: Did the user add a character? true for yes. false for user pressing the backspace button.
    const [added, setAdded] = useState();
    //The number of correct letters the user typed. 
    const [correct, setCorrect] = useState(0);

    //Stores the characters that the user inputs
    const [input, setInput] = useState([]);

    //wpm is the correct words per minute typed by user
    const [wpm, setWPM] = useState(0);
    //This counts the time it takes for user to complete the game in deciseconds
    const [ds, setDS] = useState(0); //DONE

    //A string to represent the time already taken
    const [timeTaken, setTime] = useState("0:00"); //DONE
    //This counts the seconds. Used for creating timeTaken
    const [seconds, setSeconds] = useState(0); //DONE

    //These are the valid keyboard values that the user is allowed to type
    //const [valid] = useState("`1234567890-=~!@#$%^&*()_+qwertyuiop[]\\QWERTYUIOP{}|asdfghjkl;'ASDFGHJKL:\"zxcvbnm,./ZXCVBNM<>? ".split(""));
    //Shortened version: Eliminated the capital letters, but translated user input to lowercase before comparison
    const [valid] = useState(" qwertyuiopasdfghjklzxcvbnm1234567890,./;'[]\\<>?:\"{}|`~!@#$%^&*()_+-=".split(""));
    //Regex: Not sure how well it works
    //const [valid] = useState(/^[a-z0-9!@#$%^&*(){}":>?<,./l;']+/i);

    //Reinitializing game if the user decides to try again
    useEffect(()=>{
        if (reset) {
            const newText = Texts();
            setGame(false);
            setResults(false);
            setReset(false);
            setText(newText);
            setCharArray(newText.split(""));
            setHighlights([]);
            setAdded();
            setCorrect(0);
            setInput([]);
            setWPM(0);
            setDS(0);
            setSeconds(0);
            setTime("0:00");
        }
    }, [reset]);
    

    //This tracks the time passed
    useEffect(()=>{
        if (startGame) {
            const x = setTimeout(()=> {
                setDS(ds => ds + 5);
            }, 500);
            return () => clearTimeout(x);
        }
    }, [ds, startGame]);
    useEffect(()=>{
        if (startGame) {
            const x = setTimeout(()=> {
                setSeconds(seconds => seconds + 1);
            }, 1000);
            return () => clearTimeout(x);
        }
    }, [seconds, startGame]);
    
    //This displays the time passed since start of game to the user
    useEffect(()=> {
        let sec = seconds;
        let minutes = 0;
        let hours = 0;
        
        if (sec >= 60) {
            minutes = Math.floor(sec/60);
            sec %= 60;
            if (minutes >= 60) {
                hours = Math.floor(minutes/60);
                minutes %= 60; 
            }
        }
        if (sec < 10) {
            sec = "0" + sec;
        }
        if (hours === 0) {
            setTime([minutes, sec].join(":"))
        }
        else {
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            setTime([hours, minutes, sec].join(":"));
        }
    }, [seconds]);

    //This tracks the wpm (words per minute)
    useEffect(()=> {
        //1 minute = 60 seconds = 600 deciseconds
        if (ds === 0)
            setWPM(0);
        else 
            //Assume that the words have an average of 5 characters
            //WPM = (characters_typed/5)/minutes_passed = ({correct}/5)/(ds/600)
            setWPM(Math.round(120*(correct/ds)));
    }, [ds, correct]);

    //This sets the condition for the end of game
    useEffect(()=>{
        if(charArray.length === input.length) {
            //It is time to show results
            setResults(true);
        }
    }, [input, charArray]);

    //This sets the background color of the text that the user has typed already. 
    //Green will represent correct user input, red will represent incorrect user input
    useEffect(()=> {
        if (startGame) {
            //Check whether user inputted a value or pressed the backspace button.
            //If the user entered a character
            if (added) {
                //Get the index of new input
                let index = input.length-1;
                let firstHalf = text.slice(0, index);
                let secondHalf = text.slice(index+1);
                //If the user entered the correct value
                if (highlights[index]) {
                    setText([...firstHalf, <span className="TS-green">{charArray[index]}</span>, ...secondHalf]);
                }
                else {
                    setText([...firstHalf, <span className="TS-red">{charArray[index]}</span>, ...secondHalf]);
                }
            }
            else {
                //The user pressed the backspace button.
                //Get the index of background color to reset
                let index = input.length;
                let firstHalf = text.slice(0, index);
                let secondHalf = text.slice(index+1);
                setText([...firstHalf, charArray[index], ...secondHalf]);
            }
        }
        //The comment below seems to solve the warning. Checked that warning is solved for only this useEffect
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [highlights, added, startGame]);
    

    return (
        <div>
            {
                (!showResults) ? (
                    <button className="TS-top-section">
                        {
                            (!startGame) ? (
                                <div className="TS-txt-sty1">
                                    Typing Test
                                </div>
                            ) : (
                                <div className="TS-txt-sty1">
                                    {wpm}
                                </div>
                            )
                        }
                        <div className="TS-txt-sty2">
                            How many words per minute can you type?
                        </div>

                        <div className="TS-gamebox">
                            {text}
                        </div>

                        <textarea
                        className="TS-gamebox-textarea"
                        placeholder="Start Typing Here"
                        autoFocus
                        onKeyDown={(event)=>{
                            event.preventDefault();
                            //if(event.key.match(valid)) {
                            if (valid.indexOf(event.key.toLowerCase()) > -1) {
                                //If user typed a correct letter
                                if (event.key === charArray[input.length]) {
                                    setHighlights(highlights => [...highlights, true]);
                                    setCorrect(correct => correct + 1);
                                }
                                else {
                                    setHighlights(highlights => [...highlights, false]);
                                }
                                //We have a valid letter regardless, so add it to the list of user inputs
                                setInput(input => [...input, event.key]);
                                setGame(true);
                                setAdded(true);
                            }
                            else if ((event.key === "Backspace") && (input.length !== 0)) {
                                setInput((input) => input.filter((_, i) => (i!==input.length-1)));
                                setHighlights((highlights) => highlights.filter((_, i) => (i!==highlights.length-1)));
                                //Get last element of highlights (setHighlights will not activate immediately, 
                                //  so we can still get the element that is just about to be deleted)
                                if (highlights[highlights.length-1]) {
                                    //If the highlights that will be removed is true, reduce correct letters by 1
                                    setCorrect(correct => correct - 1);
                                }
                                setAdded(false);
                            }
                        }}
                        >
                        </textarea>

                        {
                            (!startGame) ? (
                                <div className="TS-txt-sty3">
                                    Start typing to begin.
                                </div>
                            ) : (
                                <div className="TS-txt-sty3">
                                    {timeTaken}
                                </div>
                            )
                        }
                    </button>
                ) : (
                    <Results 
                    textLength={charArray.length}
                    seconds={seconds}
                    wpm={wpm}
                    correct={correct}
                    setReset={setReset}/>
                )
            }
                                
        </div>
    );
}

export default TSMinigame;