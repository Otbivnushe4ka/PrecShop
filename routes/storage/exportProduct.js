const { Router } = require("express");
const route = Router();

route.get("/export/product", (req, res) => {
  res.render("storage/product_export", {
    page: "product_export",
    title: "Export a  product",
  });
});

module.exports = route;
