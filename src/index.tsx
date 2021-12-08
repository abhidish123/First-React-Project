import { render } from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");
render(<App />, rootElement);

// const root = document.getElementById('root');
// const child = document.createElement('div')
// child.innerText = 'Hello React!';
// child.classList.add('App');
// root?.appendChild(child)
