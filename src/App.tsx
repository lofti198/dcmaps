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
  /*
    This is the part where the data is read from the dom by checking the url when the new tab is opened.
    This part does not work on the query and list page. (Due to the /maps/place condition.)
  */
  const source_key: string = 'places_source'; // localstorage query key
  if (window.location.href.includes('/maps/place/') && window.location.href.includes('listen_to_me')) {
    const wrapper: any = document.querySelector('div[jstcache][aria-label][role="main"][jsan][data-js-log-root]');
    const data: any = {};
    data.Title = wrapper.querySelector('h1').innerText; //Example element queries from the dom on the screen.
    data.Address = wrapper.querySelector('div.RcCsl.fVHpi.w4vB1d.NOE9ve.M0S7ae.AG25L button').innerText; //Example element queries from the dom on the screen.
    data.Href = window.location.href; // Current tab location href

    const json: any = localStorage.getItem(source_key);
    const source: any = JSON.parse(json) || [];
    source.push(data);
    localStorage.setItem(source_key, JSON.stringify(source));
    window.close();
  }

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


            /*
              The part where the names written places are scanned and the links are taken. It is exemplary.
            */
            const places = document.querySelectorAll('div.Nv2PK.tH5CWc.THOPZb a[jsaction][href*="www.google.com"]');
            places.forEach((link, index) => {
              const url: any = link.getAttribute('href') + '&listen_to_me';
              setTimeout(() => {
                console.log('new tab reading.. left: ' + (places.length - index - 1));
                chrome.runtime.sendMessage({ create: { url: url, active: false, pinned: true } });
              }, 2000 * index);
            });

            /*
              This recursive method checks with a delay until it is sure that the entire list is complete. When it is sure, it enters the console.log line.
            */
            const get_places = () => {
              const json: any = localStorage.getItem(source_key);
              const source = JSON.parse(json) || [];
              if (places.length == source.length) {
                localStorage.removeItem(source_key);

                console.log(source); // Search done. Json parsed Array is ready here.
              } else {
                setTimeout(get_places, 1000);
              }
            }
            get_places();
          }}
        >
          Tap1
        </button>
      </header>
    </div>
  );
}

export default App;
