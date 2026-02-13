const testimonial = {
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    { name: "name", type: "string" },
    { name: "business", type: "object", fields: [{ name: "fr", type: "string" }, { name: "ar", type: "string" }] },
    { name: "quote", type: "object", fields: [{ name: "fr", type: "text" }, { name: "ar", type: "text" }] },
  ],
};

export default testimonial;
