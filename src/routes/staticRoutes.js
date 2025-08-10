const router = require("express").Router();

router.get("/", (req, res)=>{
    res.status(200).render("pages/home")
})

module.exports = router;
