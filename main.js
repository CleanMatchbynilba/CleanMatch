import { TEXTS } from "./i18n.js";

window.setLang = (lang) => {
  localStorage.setItem("lang", lang);
  render();
};

function render() {
  const lang = localStorage.getItem("lang") || "en";
  document.getElementById("title").innerText = TEXTS[lang].title;
  document.getElementById("subtitle").innerText = TEXTS[lang].subtitle;
}

render();
