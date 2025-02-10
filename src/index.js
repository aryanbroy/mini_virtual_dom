import { render } from "./virtualDom.js";

let btn = document.getElementById("btn");

const vNode = {
  type: "button",
  props: {
    id: "heading",
    onclick: () => console.log("hello there"),
  },
  children: "Print something",
};

render(vNode);
console.log("rendered dom");
