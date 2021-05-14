module.exports = function(req,res,next){
    console.log('athorization loggedInUser >> ',req.loggedInUser)
    if(req.loggedInUser.role ==1){
        return next();
    }
    next({
        msg: 'You dont have access'
    })
}