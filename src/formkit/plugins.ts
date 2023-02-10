export const helpStyle = (inputNode: any) => {
  // @ts-ignore
  inputNode.on("created", ({ payload: node }) => {
    if (typeof node.props.definition.schema === "function") {
      const definition = { ...node.props.definition };
      const schema = definition.schema;
      definition.schema = function (extensions = {}) {
        const ext = {
          ...extensions,
          ...{
            help: { $el: "em", attrs: { class: "text-sm" } },
          },
        };
        return schema(ext);
      };
      node.props.definition = definition;
    }
    return;
  });
};

export const messageStyle = (inputNode: any) => {
  // @ts-ignore
  inputNode.on("created", ({ payload: node }) => {
    if (typeof node.props.definition.schema === "function") {
      const definition = { ...node.props.definition };
      const schema = definition.schema;
      definition.schema = function (extensions = {}) {
        const ext = {
          ...extensions,
          ...{
            message: { $el: "p", attrs: { class: "mt-1 text-red-800" } },
            messages: { $el: null },
          },
        };
        return schema(ext);
      };
      node.props.definition = definition;
    }
    return;
  });
};

export const removeBoxInnerWrapper = (inputNode: any) => {
  // @ts-ignore
  inputNode.on("created", ({ payload: node }) => {
    if (
      node.props.family === "box" &&
      typeof node.props.definition.schema === "function"
    ) {
      const definition = { ...node.props.definition };
      const schema = definition.schema;
      definition.schema = function (extensions = {}) {
        const ext = {
          ...extensions,
          ...{
            inner: { $el: null },
          },
        };
        return schema(ext);
      };
      node.props.definition = definition;
    }
    return;
  });
};
