import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./SearchAction.css";
const SearchAction = () => {
    
  let planetUrl = `https://findfalcone.geektrust.com/planets`;
  let vehicaleUrl = `https://findfalcone.geektrust.com/vehicles`;
  let tokenUrl = `https://findfalcone.herokuapp.com/token`;
  let postUrl = `https://findfalcone.herokuapp.com/find`;
  // useEffect(() ={

  // },[])
  return (
    <div className="hero">
      <Header />
      <div className="hero-container">
        <h5>Hello</h5>
      </div>
      <Footer />
    </div>
  );
};
export default SearchAction;
