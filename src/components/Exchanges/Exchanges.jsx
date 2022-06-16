import React from "react";
import image from "../../images/subscribe.png";
import { Button } from "antd";

const Exchanges = () => {
  return (
    <div
      style={{
        display: "flex",
        marginBottom: "500px",
      }}
    >
      <h1>SUBSCRIBE FOR EXCHANGES</h1>
      <div style={{ marginTop: "250px" }}>
        <h1>You need premium plan to view exchanges</h1>
        <a href="https://rapidapi.com/" target="_blank">
          <Button style={{ marginLeft: "150px" }}>CLick Here</Button>
        </a>
      </div>
    </div>
  );
};

export default Exchanges;
