export const injectOnPageLoad = () => {
  var script = document.createElement("script");
  script.src = chrome.runtime.getURL("injectionScript.js");
  console.log(script.src);

  (document.head || document.documentElement).appendChild(script);
};
