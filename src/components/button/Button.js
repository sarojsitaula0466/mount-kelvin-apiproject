import React, { useState, useEffect } from "react";
import "./button.css";
import socket from "../../network/socket";
import config from "../../config.js";

const Button = () => {
  const API_PATH_APPLY_SCENE = "apply/scene";
  const API_PATH_APPLY_DEVICE = "apply/device";
  const API_SEVENTY_REQUEST_VALUE = 178;
  const API_THIRTY_REQUEST_VALUE = 77;
  const API_SCENE_ALL_ON = "allOn";
  const API_SCENE_ALL_OFF = "allOff";

  const STR_DIMMABLE = "dimmable";

  // 1=allOn, 0.7=70%, 0.3=30%, 0=allOff
  const STATE_ALL_ON = 1;
  const STATE_SEVENTY_ON = 0.7;
  const STATE_THIRTY_ON = 0.3;
  const STATE_ALL_OFF = 0;

  const [currentState, setCurrentState] = useState(STATE_ALL_ON);

  const SITEKEY = config.API_KEY;
  const devices = [];

  useEffect(() => {
    // Gather all dimmable devices
    socket.on("site", ({ siteKey, data }) => {
      if (!devices.length && data && data.devices.length) {
        data.devices
          .filter((item) => item.type === STR_DIMMABLE)
          .forEach((item) => devices.push(item.id));
      }
    });
  });

  let handleAllOn = (e) => {
    setCurrentState(STATE_ALL_ON);

    socket.emit(API_PATH_APPLY_SCENE, {
      siteKey: SITEKEY,
      data: {
        id: API_SCENE_ALL_ON,
      },
    });
  };

  let handleOnSeventy = (e) => {
    setCurrentState(STATE_SEVENTY_ON);

    devices.forEach((item) => {
      socket.emit(API_PATH_APPLY_DEVICE, {
        siteKey: SITEKEY,
        data: {
          id: item,
          state: {
            on: true,
            bri: API_SEVENTY_REQUEST_VALUE,
          },
        },
      });
    });
  };

  let handleOnThirty = (e) => {
    setCurrentState(STATE_THIRTY_ON);
    devices.forEach((item) => {
      socket.emit(API_PATH_APPLY_DEVICE, {
        siteKey: SITEKEY,
        data: {
          id: item,
          state: {
            on: true,
            bri: API_THIRTY_REQUEST_VALUE,
          },
        },
      });
    });
  };

  let handleAllOff = (e) => {
    setCurrentState(STATE_ALL_OFF);

    socket.emit(API_PATH_APPLY_SCENE, {
      siteKey: SITEKEY,
      data: {
        id: API_SCENE_ALL_OFF,
      },
    });
  };

  return (
    <div>
      <div className="button-container">
        <div className="button-wrapper">
          <button
            className={
              currentState === STATE_ALL_ON ? "clkBtn all-on" : "btn all-on"
            }
            onClick={handleAllOn}
          >
            <p>All on</p>
          </button>
        </div>
        <div className="button-wrapper">
          <button
            className={
              currentState === STATE_SEVENTY_ON
                ? "clkBtn onSeventy"
                : "btn onSeventy"
            }
            onClick={handleOnSeventy}
          >
            <p>70 %</p>
          </button>
        </div>
      </div>
      <div className="button-container">
        <div className="button-wrapper">
          <button
            className={
              currentState === STATE_THIRTY_ON
                ? "clkBtn onThirty"
                : "btn onThirty"
            }
            onClick={handleOnThirty}
          >
            <p>30 %</p>
          </button>
        </div>
        <div className="button-wrapper">
          <button
            className={
              currentState === STATE_ALL_OFF ? "clkBtn all-off" : "btn all-off"
            }
            onClick={handleAllOff}
          >
            <p>All off</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Button;
