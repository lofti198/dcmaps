///<reference types="chrome"/>
import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";
import { injectOnPageLoad } from "./libs/inject";
import html2canvas from "html2canvas";
function getLogo() {
  if (window.chrome) {
    return window.chrome.runtime.getURL(logo);
  }

  return logo;
}

function App() {
  useEffect(() => {
    console.log("comp mount");
    injectOnPageLoad();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <button
          onClick={() => {
            // document.dispatchEvent(
            //   new CustomEvent("seek_to_event", {
            //     detail: { seconds: 15 },
            //   })
            // );
            // document.dispatchEvent(new CustomEvent("pause_video"));

            console.log("onclick1");
          }}
        >
          Tap1
        </button>
      </header>
    </div>
  );
}

export default App;
