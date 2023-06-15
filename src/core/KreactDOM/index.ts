interface getElementWithStyleFunction {
  (element: HTMLElement, props: any, oldProps?: any): HTMLElement;
}

const getElementWithStyle: getElementWithStyleFunction = (element, props, oldProps) => {
  Object.keys(props).forEach(prop => {
    if (prop === 'ref' || prop === 'key' || prop === 'children') return;
    if (prop === 'className') {
      element.setAttribute('class', props[prop]);
      return;
    }
    if (prop === 'style' && typeof props[prop] === 'object') {
      const style = props[prop];
      Object.keys(style).forEach(styleName => {
        element.style[styleName] = style[styleName];
      });
      return;
    }
    if (prop.startsWith('on')) {
      const eventName = prop.substring(2).toLowerCase();
      if (oldProps) element.removeEventListener(eventName, oldProps[prop]);
      element.addEventListener(eventName, props[prop]);
      return;
    }

    const newAttribute = document.createAttribute(prop);
    newAttribute.value = props[prop];
    element.setAttributeNode(newAttribute);
  });

  return element;
};

interface createVirtualDOMFunction {
  (element: Kreact.KreactElement): HTMLElement | Text | DocumentFragment;
}

export const createVirtualDOM: createVirtualDOMFunction = element => {
  const { type, props } = element;

  if (type === 'TEXT_ELEMENT') return document.createTextNode(props.nodeValue);
  if (type === 'FRAGMENT') {
    const fragment = document.createDocumentFragment();
    props.children.forEach(child => fragment.appendChild(createVirtualDOM(child)));

    return fragment;
  }

  const newElement = getElementWithStyle(document.createElement(type), props);

  props.children.forEach(child => {
    if (!child.type) return;
    newElement.appendChild(createVirtualDOM(child));
  });

  return newElement;
};

type CommitMapKey = 'appendChild' | 'removeChild' | 'replaceChild' | 'insertBefore';
type CommitMapValue = {
  root: HTMLElement;
  child?: HTMLElement | Text | DocumentFragment;
  newChild?: HTMLElement | Text | DocumentFragment;
  oldChild?: HTMLElement | Text | DocumentFragment;
};

interface updateVirtualDOMFunction<T = HTMLElement> {
  (
    root: T,
    oldNode: Kreact.KreactElement,
    newNode: Kreact.KreactElement,
    commitMap: Map<CommitMapKey, CommitMapValue>,
    index?: number,
  ): T | Map<string, any>;
}

export const updateVirtualDOM: updateVirtualDOMFunction = (
  root,
  oldNode,
  newNode,
  commitMap,
  index = 0,
) => {
  if (!oldNode) return commitMap.set('appendChild', { root, child: createVirtualDOM(newNode) });
  if (!newNode)
    return commitMap.set('removeChild', { root, child: root.childNodes[index] as HTMLElement });
  if (oldNode.type !== newNode.type)
    return commitMap.set('replaceChild', {
      root,
      newChild: createVirtualDOM(newNode),
      oldChild: root.childNodes[index] as HTMLElement,
    });

  if (
    oldNode.type === 'TEXT_ELEMENT' &&
    newNode.type === 'TEXT_ELEMENT' &&
    oldNode.props.nodeValue !== newNode.props.nodeValue
  ) {
    const newElement = createVirtualDOM(newNode);
    return commitMap.set('replaceChild', {
      root,
      newChild: newElement,
      oldChild: root.childNodes[index] as HTMLElement,
    });
  }

  const oldProps = oldNode.props;
  const newProps = newNode.props;
  if (oldNode.type !== 'TEXT_ELEMENT' && oldNode.type !== 'FRAGMENT') {
    getElementWithStyle(root.childNodes[index] as HTMLElement, newProps, oldProps);
  }

  const max = Math.max(oldProps.children.length, newProps.children.length);

  for (let i = 0; i < max; i++) {
    updateVirtualDOM(
      oldNode.type === 'FRAGMENT' ? root : (root.childNodes[index] as HTMLElement),
      oldProps.children[i],
      newProps.children[i],
      commitMap,
      i,
    );
  }

  return root;
};

interface updateRealDOMFunction {
  (commitMap: Map<string, any>): void;
}

export const updateRealDOM: updateRealDOMFunction = commitMap => {
  commitMap.forEach((value, key) => {
    switch (key) {
      case 'appendChild':
        value.root.appendChild(value.child);
        break;
      case 'removeChild':
        value.root.removeChild(value.child);
        break;
      case 'replaceChild':
        value.root.replaceChild(value.newChild, value.oldChild);
        break;
    }
  });
};
