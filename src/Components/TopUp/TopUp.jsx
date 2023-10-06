import React from "react";
import "./TopUp.css";

function TopUp() {
    const scrollToTop = () =>{
        window.scrollTo({
          top: 0, 
          behavior: 'smooth'
        });
      }; 
    
    return(
        <div>
            <button id="top_btn" onClick={scrollToTop}>↑</button>
        </div>
    ); 
}

export default TopUp;
