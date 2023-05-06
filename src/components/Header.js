import React from "react";
import "./Header.css";
/*
@param {String
 */
const Header = () => {
    // {/* finding falcone! <reset | geetktrust home> */}
    // console.log("Header Loaded");
    return (
        <div className="header">
            <div className="header_heading">
                <h1>Finding Falcone!</h1>
            </div>
            <div className="header__buttons">
                  <p>
                    
                        <span className="hButton" onClick={()=>{
                            window.location.href='/';
                        }}>Reset</span>
                    {` | `}
                        <span className="hButton">GeekTrust Home</span>
                    
                  </p>
            </div>
        </div>
    )
}
export default Header;