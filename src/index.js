import React from "react"; /* не забывать после npx react-app писать npm i внутри проекта */
import ReactDOM from "react-dom/client";
import App from "./components/app/App";

import "./style/style.scss";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);
