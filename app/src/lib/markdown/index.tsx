import { micromark } from "micromark";
import parse, { Element, domToReact } from "html-react-parser";

function isEmpty(value: any) {
    if (value == null) return true; // Handles undefined and null

    if (Array.isArray(value) || typeof value === 'string') {
        return value.length === 0;
    }

    if (value instanceof Map || value instanceof Set) {
        return value.size === 0;
    }

    if (Object.prototype.toString.call(value) === '[object Object]') {
        return Object.keys(value).length === 0;
    }

    return true;
}

const options = {
  replace: (domNode: any) => {
    if (domNode instanceof Element && domNode.name === "li") {
      const children = domNode.children.map((child: any) => {
        if (child instanceof Element && child.name === "p") {
          return child.children;
        }
        return child;
      });
      return <li>{domToReact(children.flat(), options)}</li>;
    }
  },
};

export const parseMarkdown = (markdownString: string = "") => {
  if (isEmpty(markdownString)) return "";
  return parse(micromark(markdownString), options);
};
