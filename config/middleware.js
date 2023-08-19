module.exports.setFlash=async function(req,res,next){
    req.session.user = { 'id': 123 }; 
    req.session.pageviews = 1;
    res.locals.flash={
        'success':req.flash('success'),
        'error':req.flash('error')
    }
    next();
}



  