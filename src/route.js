const express = require("express")
const v1Routes = require("./v1/routes")
const router = express.Router();

router.get('/', (req, res) => {
    res.json({'hello' : "server started"});
})
router.use('/api/v1', v1Routes);

module.exports = router;
