import React from "react";
import Minigame from "../components/TSMinigame"; 
import '../components/TS.css';

//TypingSpeed game
function TS() {
    return(
        <div>
            <Minigame />
            <div className="TS-middle-section">
                <div className="TS-container">
                    <div className="TS-box1">
                        <div style={{fontSize: '30px', fontWeight: '400', paddingBottom: '10px',}}>
                            Statistics
                        </div>
                        <div>
                            <img src="https://images.saymedia-content.com/.image/t_share/MTc0MTYyMTE1NzA2NDMwOTcy/how-to-draw-a-scientific-graph.gif" width="600px" alt=""/>
                        </div>
                    </div>
                    <div className="TS-box2">
                        <div style={{fontSize: '30px', fontWeight: '400', paddingBottom: '10px',}}>
                            About the Test
                        </div>
                        <div className="TS-description">
                            <div>
                                This is a simple test of typing speed, measuring words per minute, or WPM.
                            </div>
                            <div>
                                The standard measure of WPM is (number of correct characters typed / 5) / (time taken in minutes). By that measurement, "quick brown fox" is 15 characters, including spaces.
                            </div>
                            <div>
                                The recorded score is WPM * Accuracy.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TS;
