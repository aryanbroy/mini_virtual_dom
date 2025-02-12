import { diffAlgo, render } from "./virtualDom.js";

let btn = document.getElementById("btn");

const childVNode = {
  type: "p",
  props: {
    class: "niga",
  },
  children: ["Hello there"],
};

const vNode = {
  type: "button",
  props: {
    id: "heading",
    onclick: () => console.log("hello there"),
  },
  children: ["Print something", childVNode],
};

const elem = render(vNode);
console.log("rendered dom");

const newNode = {
  type: "button",
  props: {
    class: "niga",
    onclick: () => console.log("niga here"),
  },
  children: "Change children",
};

// const patch = diffAlgo(vNode, newNode, elem);

// console.log(patch);

// if (typeof patch == "function") {
//   const type = patch(elem);
//   console.log("Updated dom with type ", type);
// }

// if (typeof patch == "string") {
//   console.log("Updated dom with string type ", patch);
// }
