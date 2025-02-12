import { diffAlgo, render } from "./virtualDom.js";

let btn = document.getElementById("btn");
let rootElem = document.getElementById("app");

const childVNode = {
  type: "p",
  props: {
    class: "niga",
  },
  children: ["Old child node"],
};

const vNode = {
  type: "button",
  props: {
    id: "heading",
    onclick: () => console.log("hello there"),
  },
  children: ["Old Node", childVNode],
};

const elem = render(vNode, rootElem);
console.log("rendered dom");

const newChildNode = {
  type: "h1",
  props: {
    class: "heading",
  },
  children: ["New Child node"],
};

const newNode = {
  type: "button",
  props: {
    class: "niga",
    onclick: () => console.log("niga here"),
  },
  children: ["New node", newChildNode],
};

const patch = diffAlgo(vNode, newNode, elem);

console.log(patch);

if (typeof patch == "function") {
  const type = patch(elem);
  console.log("Updated dom with type ", type);
}

if (typeof patch == "string") {
  console.log("Updated dom with string type ", patch);
}
