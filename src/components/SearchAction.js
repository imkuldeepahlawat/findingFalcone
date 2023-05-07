import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./SearchAction.css";
import axios from "axios";
const SearchAction = () => {
  // random

  /********************************************************
   * Urls For Get and Post
   *********************************************************/
  let planetUrl = `https://findfalcone.geektrust.com/planets`;
  let vehicaleUrl = `https://findfalcone.geektrust.com/vehicles`;
  let posttokenUrl = `https://findfalcone.herokuapp.com/token`;
  let postUrl = `https://findfalcone.herokuapp.com/find`;
  const dropDownArrayList = [1, 2, 3, 4];
  /**
   * Makes an asynchronous GET request using Axios.
   * @param {string} url - The URL to make the GET request to.
   * @returns {Promise} - A Promise that resolves to the response data or null if an error occurs.
   */
  let req = async (url) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (e) {
      return null;
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await req(vehicaleUrl);
      console.log(data);
    };

    fetchData();
  }, []);

  return (
    <div className="hero">
      <Header />
      <div className="hero-container">
        <h2>Select planets you want to search in:</h2>
        <div className="dropDown_container">
          {dropDownArrayList.map((e, i) => {
            return (
              <div className="dropdownElement">
                <h3>{`Destination ${e}`}</h3>
                <div>
                  <label for={`planet${i}`}></label>

                  <select
                    required
                    name={`planet${i}`}
                    id={`planet${i}`}
                    onChange={(event) => console.log(event.target[event.target.selectedIndex].text,`planet ${i}`)}
                  >
                    <option value="" disabled>
                      Select an item
                    </option>
                    <option value="item1">Item 1</option>
                    <option value="item2">Item 2</option>
                    <option value="item3">Item 3</option>
                  </select>
                </div>
              </div>
            );
          })}
          <h3 className="timeCounter">{`Time Taken`}</h3>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default SearchAction;
