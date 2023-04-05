import React from "react"; /* не забывать после npx react-app писать npm i внутри проекта */
import ReactDOM from "react-dom/client";
import App from "./components/app/App";
import MarvelService from "./components/services/MarvelServices";
import "./style/style.scss";

const marvelService = new MarvelService();

marvelService.getCharacter(1011052).then((res) => console.log(res));
/* marvelService
  .getAllCharacters()
  .then((res) => res.data.results.forEach((item) => console.log(item.name))); */

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
