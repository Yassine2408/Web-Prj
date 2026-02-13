const service = {
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    { name: "order", type: "number", title: "Order" },
    { name: "title", type: "object", fields: [{ name: "fr", type: "string" }, { name: "ar", type: "string" }] },
    { name: "summary", type: "object", fields: [{ name: "fr", type: "text" }, { name: "ar", type: "text" }] },
    {
      name: "deliverables",
      type: "object",
      fields: [
        { name: "fr", type: "array", of: [{ type: "string" }] },
        { name: "ar", type: "array", of: [{ type: "string" }] },
      ],
    },
    { name: "timeline", type: "object", fields: [{ name: "fr", type: "string" }, { name: "ar", type: "string" }] },
    { name: "idealFor", type: "object", fields: [{ name: "fr", type: "text" }, { name: "ar", type: "text" }] },
  ],
};

export default service;
