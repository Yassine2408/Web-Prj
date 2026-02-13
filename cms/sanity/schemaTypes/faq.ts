const faq = {
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    { name: "question", type: "object", fields: [{ name: "fr", type: "string" }, { name: "ar", type: "string" }] },
    { name: "answer", type: "object", fields: [{ name: "fr", type: "text" }, { name: "ar", type: "text" }] },
  ],
};

export default faq;
