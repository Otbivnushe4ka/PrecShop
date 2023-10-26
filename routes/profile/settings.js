const { Router } = require("express");
const route = Router();
const db = require("../../db");
const { checkAuthentication } = require("../../modules/checklogin");

route.get("/settings/", checkAuthentication, async (req, res) => {
  const userid = req.session.user.id;
  const user = await db.getData(`SELECT * FROM users WHERE id = ${userid}`);

  res.render("profile/settings", {
    session: req.session.user,
    page: "settings",
    title: "Settings",
    user: user[0],
  });
});

route.post("/settings/", checkAuthentication, async (req, res) => {
  const userid = req.session.user.id;
  const name = req.body.name;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  // console.log(name, lastname, email, password, userid);
  // await db.insertData(
  //   `UPDATE users
  // 	SET
  // 	name = ${name},
  // 	lastname = ${lastname},
  // 	email = ${email},
  // 	password = ${password}
  // 	WHERE id = ${userid}
  // 	`
  // );
  await db.insertData(
    "UPDATE users SET name = '" +
      name +
      "', lastname = '" +
      lastname +
      "', email = '" +
      email +
      "', password = '" +
      password +
      "'  where id = '" +
      userid +
      "'"
  );
  res.redirect("/profile/");
});

module.exports = route;
