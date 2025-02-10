export function VirtualNode(type, props, children) {
  return {
    type,
    props: props || {},
    // children: children.flat || [],
    children: children,
  };
}

export function render(virtualNode) {
  const element = document.createElement(virtualNode.type);

  let { props, children } = virtualNode;

  // console.log(virtualNode);

  Object.entries(props).forEach(([key, val]) => {
    if (key.startsWith("on") && typeof val == "function") {
      element.addEventListener(key.slice(2).toLowerCase(), val);
    } else {
      element.setAttribute(key, val);
    }
  });

  // children.forEach((child) => {
  //   if (typeof child == "string" || typeof child == "number") {
  //     const textNode = document.createTextNode(child);
  //     element.appendChild(textNode);
  //   } else {
  //     render(child);
  //   }
  // });

  // we assume that there is a single child
  const textNode = document.createTextNode(children);
  element.appendChild(textNode);

  const app = document.getElementById("app");
  app.appendChild(element);

  return element;
}

export function diffAlgo(oldNode, newNode) {
  let type;
  if (oldNode.type !== newNode.type) {
    // replace the whole node
    type = "REPLACE";
    return (node) => {
      // console.log("Old node: ", node);
      const $newNode = render(newNode);
      // console.log("New node ", $newNode);
      node.replaceWith($newNode);
      return $newNode, type;
    };
  }
}