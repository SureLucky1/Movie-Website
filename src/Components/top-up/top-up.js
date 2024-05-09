import React from "react";
import "./top-up.css";

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
