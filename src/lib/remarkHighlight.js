// lib/remarkHighlight.js
import { visit } from "unist-util-visit";

export function remarkHighlight() {
  return (tree) => {
    visit(tree, "text", (node, index, parent) => {
      const regex = /(.*?)==(.+?)==(.*)/;

      if (regex.test(node.value)) {
        const match = node.value.match(regex);
        if (!match) return;

        const [_, before, highlighted, after] = match;

        const newNodes = [];

        if (before) newNodes.push({ type: "text", value: before });

        newNodes.push({
          type: "element",
          tagName: "mark",
          properties: { className: ["bg-yellow-200", "px-1", "rounded"] },
          children: [{ type: "text", value: highlighted }],
        });

        if (after) newNodes.push({ type: "text", value: after });

        parent.children.splice(index, 1, ...newNodes);
      }
    });
  };
}
