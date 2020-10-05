var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
    console.log('i ma from use...');
    res.json({
        msg:'hehehe'
    })
})

module.exports = router;