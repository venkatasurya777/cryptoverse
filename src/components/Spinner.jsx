import React from "react";
import { Spin } from "antd";

const Spinner = () => {
  return (
    <div className="loader">
      <Spin size="large"/>
    </div>
  );
};

export default Spinner;
