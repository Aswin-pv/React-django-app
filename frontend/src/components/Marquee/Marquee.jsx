import React from "react";

const Marquee = () => {
    return (
        <div className="marquee-container my-5">
            <marquee className="marquee" behavior="scroll" direction="left" scrollamount="15" loop="infinite">
                <span className="marquee-container--text1">EXCITING DISCOUNTS. UPTO </span>
                <span className="marquee-container--text2">60% OFF . </span>
                <span className="marquee-container--text1">
                    GRAB YOUR CHANCES NOW. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>

                <span className="marquee-container--text1">EXCITING DISCOUNTS. UPTO </span>
                <span className="marquee-container--text2">60% OFF . </span>
                <span className="marquee-container--text1">
                    GRAB YOUR CHANCES NOW .&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>

                <span className="marquee-container--text1">EXCITING DISCOUNTS. UPTO </span>
                <span className="marquee-container--text2">60% OFF . </span>
                <span className="marquee-container--text1">
                    GRAB YOUR CHANCES NOW .&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
            </marquee>
        </div>
    );
};

export default Marquee;
