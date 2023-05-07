import React from "react";
import "./Footer.css";

const Footer = () => {
  // this is foooter component
  return (
    <div className="footer">
      <p className="footer-text">
        Coding problem -{" "}
        <a
          target="_blank"
          href="https://www.geektrust.com/coding/detailed/space"
        >
          www.geektrust.in/finding-falcone
        </a>
      </p>
    </div>
  );
};

export default Footer;
