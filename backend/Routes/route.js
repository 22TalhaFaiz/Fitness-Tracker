const p = require("../Controller/Crud");
const exp = require("express")
const router = exp.Router();

router.post("/l",p.login)

module.exports = router


