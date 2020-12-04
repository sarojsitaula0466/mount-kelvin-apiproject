import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";
import "./header.css";

const Header = () => {
  const [Title, setTitle] = useState("");

  const fetchData = async () => {
    try {
      await axios.get(config.API_URL_WITH_KEY).then((response) => {
        const result = response.data;
        setTitle(result);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="header-div">
      <h1 className="heading-title">{Title.name}</h1>
    </div>
  );
};

export default Header;
