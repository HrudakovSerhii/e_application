import React from "react";
import ReactDOM from "react-dom";

require("./styles/index.scss");

import { App } from "./view/App";

ReactDOM.render(<App />, document.getElementById("root"));

if (module.hot) {
   module.hot.accept();
}
