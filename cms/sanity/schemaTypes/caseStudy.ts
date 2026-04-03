const caseStudy = {
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    { name: "slug", type: "slug", options: { source: "title.fr" } },
    { name: "title", type: "object", fields: [{ name: "fr", type: "string" }, { name: "ar", type: "string" }] },
    { name: "clientType", type: "object", fields: [{ name: "fr", type: "string" }, { name: "ar", type: "string" }] },
    { name: "city", type: "string" },
    { name: "problem", type: "object", fields: [{ name: "fr", type: "text" }, { name: "ar", type: "text" }] },
    { name: "solution", type: "object", fields: [{ name: "fr", type: "text" }, { name: "ar", type: "text" }] },
    { name: "tech", type: "array", of: [{ type: "string" }] },
    {
      name: "results",
      type: "object",
      fields: [
        { name: "fr", type: "array", of: [{ type: "string" }] },
        { name: "ar", type: "array", of: [{ type: "string" }] },
      ],
    },
    { name: "gallery", type: "array", of: [{ type: "image" }] },
  ],
};

export default caseStudy;
