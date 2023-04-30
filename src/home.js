import React from "react";
import "./home.css";
import "./App.css";
import front1 from "./images/gavil.jpg";
import front2 from "./images/handshake.jpg";
import front3 from "./images/lawyer.jpg";

export default function Step0({ nextPage }) {
    const handleClick = () => {
        nextPage();
    }
    return (
        <>
            <div id="content">
                <div className="container-row">
                    <div id="landingContent">
                        <div id="mainText">
                            <h4 id="mainDesc">
                                Do you want justice? <br />
                                No case too big, no case too small,
                                Morgan & Morgan is the place to call.
                                
                            </h4>
                            <h5 id="shortDesc">Start your claim today down below.</h5>
                            <div className="btn-block">
                                <button className="button" onClick={handleClick}>
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </div>
                    <div id="picWrapper">
                        <img className="frontPic" id="front1" src={front1} alt="img" />
                        <img className="frontPic" id="front2" src={front2} alt="img" />
                        <img className="frontPic" id="front3" src={front3} alt="img" />
                    </div>
                </div>
            </div>
        </>
    )
}
