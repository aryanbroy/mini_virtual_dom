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

export function diffAlgo(oldNode, newNode, element) {
  let type = [];
  let removedTypes = [];
  if (oldNode.type !== newNode.type) {
    // replace the whole node
    type.push("REPLACE");
    console.log("Replacing this shit!!");
    return (node) => {
      const $newNode = render(newNode);
      node.replaceWith($newNode);
      return $newNode, type;
    };
  }

  Object.keys(oldNode.props).forEach((key) => {
    if (oldNode.props[key] !== newNode.props[key]) {
      if (key.startsWith("on")) {
        removedTypes.push(`REMOVE EVENT LISTENER ${key}`);
        const event = key.slice(2).toLowerCase();
        const callback = newNode.props[key];
        element.removeEventListener(event, callback);
      } else if (typeof key == "string") {
        removedTypes.push(`REMOVE ATTRIBUTE ${key}`);
        element.removeAttribute(key);
        console.log("We removin the attribute");
      }
    }
  });

  Object.keys(newNode.props).forEach((key) => {
    if (newNode.props[key] !== oldNode.props[key]) {
      if (key.startsWith("on")) {
        type.push(`UPDATE EVENT LISTENER ${key}`);
        const event = key.slice(2).toLowerCase();
        const callback = newNode.props[key];
        console.log(callback);
        element.addEventListener(event, callback);
      } else if (typeof key == "string") {
        type.push(`UPDATE ATTRIBUTE ${key}`);
        element.setAttribute(key, newNode.props[key]);
        console.log("We just updatin the attribute");
      }
    }
  });

  console.log(removedTypes);
  return type;
}