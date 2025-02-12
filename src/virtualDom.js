export function VirtualNode(type, props, ...children) {
  return {
    type,
    props: props || {},
    // children: children.flat || [],
    children: children || [],
  };
}

export function render(virtualNode, rootElem) {
  const element = document.createElement(virtualNode.type);

  let { props, children } = virtualNode;

  Object.entries(props).forEach(([key, val]) => {
    if (key.startsWith("on") && typeof val == "function") {
      element.addEventListener(key.slice(2).toLowerCase(), val);
    } else if (typeof key == "string") {
      element.setAttribute(key, val);
    }
  });

  children.forEach((child) => {
    if (typeof child == "string" || typeof child == "number") {
      const textNode = document.createTextNode(child);
      element.appendChild(textNode);
    } else {
      render(child, element);
    }
  });

  rootElem.appendChild(element);

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

  // props change

  Object.keys(oldNode.props).forEach((key) => {
    if (oldNode.props[key] !== newNode.props[key]) {
      if (key.startsWith("on")) {
        removedTypes.push(`REMOVE EVENT LISTENER ${key}`);
        const event = key.slice(2).toLowerCase();
        const callback = oldNode.props[key];
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

  // children change

  let oldChildren = oldNode.children || [];
  let newChildren = newNode.children || [];

  if (oldChildren.length > newChildren.length) {
    type.push("REMOVING CHILD NODE");
    for (let i = newChildren.length; i < oldChildren.length; i++) {
      element.removeChild(element.childNodes[newChildren.length]);
    }
  }

  newNode.children.forEach((child) => {
    if (typeof child == "string" || typeof child == "number") {
      type.push("CHANGING CHILD STRING");
      element.innerText = child;
    } else {
      type.push("CHANGING CHILD NODE");
      element.appendChild(render(child, element));
    }
  });

  // console.log(removedTypes);
  return type;
}
