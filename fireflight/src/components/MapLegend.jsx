import React, { useState, useEffect } from "react";
import fireIcon from "../images/fireIcon.svg";
import exclamationMark from "../images/exclaim.png";
import locationIcon from "../images/locationIcon.svg";
import locationIconGreen from "../images/locationIconGreen.svg";
import mapLegend from "../images/mapLegend.svg";

const MapLegend = () => {
  const [showLegend, setShowLegend] = useState(false);

  //legend toggle open for wider than 576p
  useEffect(() => {
    let w = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    if (w > 576) {
      setShowLegend(true);
    }
  }, []);

  return (
    <div className="legend-container">
      <div className="legend-header">
        <img src={mapLegend} height="18" width="10" alt="map-view" />
        <h4 className="legend-title" onClick={() => setShowLegend(!showLegend)}>
          Map Legend
        </h4>
      </div>

      <div
        style={{
          display: showLegend ? "flex" : "none",
          flexDirection: "column"
        }}
      >
        <span className="legend-item">
          <img
            src={locationIcon}
            height="25"
            width="15"
            style={{ zIndex: 5, transform: "translate(0px, 5px)" }}
            alt="Searched location"
          />
          <h5 className="legend-text">Your searched location</h5>
        </span>
        <span className="legend-item">
          <img
            src={locationIconGreen}
            height="25"
            width="15"
            style={{ zIndex: 5, transform: "translate(0px, 5px)" }}
            alt="Saved location"
          />
          <h5 className="legend-text">Your saved locations</h5>
        </span>
        <span className="legend-item">
          <img
            src={fireIcon}
            height="20"
            width="15"
            style={{ zIndex: 5, transform: "translate(0px, 5px)" }}
            alt="Active Fire"
          />
          <h5 className="legend-text">Active Fire</h5>
        </span>
        <span className="legend-item">
          <img
            src={exclamationMark}
            height="20"
            width="15"
            style={{ zIndex: 5, transform: "translate(0px, 5px)" }}
            alt="Fire within radius"
          />
          <h5 className="legend-text">Fire Within Radius </h5>
        </span>
        {/* <p className="legend-info">
          <em>Location markers</em> can be clicked. There are actions available on the
          <em> temporary location marker</em> that will allow you to save that location to
          your profile. Once saved, you can choose to receive alerts for that
          location and adjust the alert radius.
        </p> */}
      </div>
    </div>
  );
};

export default MapLegend;
