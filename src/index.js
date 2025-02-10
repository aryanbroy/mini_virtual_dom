import { diffAlgo, render } from "./virtualDom.js";

let btn = document.getElementById("btn");

const vNode = {
  type: "button",
  props: {
    id: "heading",
    onclick: () => console.log("hello there"),
  },
  children: "Print something",
};

const elem = render(vNode);
// console.log(elem);
console.log("rendered dom");

const newNode = {
  type: "h1",
  props: {
    id: "heading",
  },
  children: "New node change",
};

const patch = diffAlgo(vNode, newNode);

const type = patch(elem);
console.log("Updated dom with type ", type);
