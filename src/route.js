const express = require("express")
const v1Routes = require("./v1/routes")
const router = express.Router();
const {server} = require("./config")

router.get('/', (req, res) => {
    res.message(`'${server.name}' started`);
});

router.use("/images", express.static('images'))

router.use('/api/v1', v1Routes);

module.exports = router;
