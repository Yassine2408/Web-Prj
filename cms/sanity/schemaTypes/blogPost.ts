const blogPost = {
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    { name: "slug", type: "slug", options: { source: "title.fr" } },
    { name: "title", type: "object", fields: [{ name: "fr", type: "string" }, { name: "ar", type: "string" }] },
    { name: "excerpt", type: "object", fields: [{ name: "fr", type: "text" }, { name: "ar", type: "text" }] },
    { name: "content", type: "object", fields: [{ name: "fr", type: "text" }, { name: "ar", type: "text" }] },
    { name: "category", type: "object", fields: [{ name: "fr", type: "string" }, { name: "ar", type: "string" }] },
    { name: "publishedAt", type: "datetime" },
  ],
};

export default blogPost;
