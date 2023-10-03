const { Router } = require("express");
const route = Router();
const db = require("../../db");

route.get("/check/code", async (req, res) => {
  res.render("dataforms/check_code", {
    page: "check_code",
    title: "Create a new product",
  });
});
route.post("/check/code", async (req, res) => {
  const code = req.body.prod_code;

  await db
    .getData(
      "SELECT EXISTS(SELECT * FROM codes WHERE barcode = '" + code + "' ) as s"
    )
    .then((result) => {
      if (result[0].s === 1) {
        res.redirect("/check/code");
        console.log("CODE ALREADY USED");
      } else {
        db.insertData("INSERT INTO codes(barcode) VALUES (?)", [code])
          .then((result) => {
            if (result.result) {
              console.log(`Code ${code} was created`);
              res.status(200).redirect("/create/product");
            } else {
              console.log(`Code ${code} was not created`);
              res.status(500).redirect("/check/code");
            }
          })
          .catch((error) => {
            console.log("Create code: ", error);
            res.status(500).send("Server error");
            res.redirect("/check/code");
          });
      }
    })
    .catch((error) => {
      console.log("error: ", error);
      res.status(500).send("Server error");
    });
});

module.exports = route;