const Student = require('../models/studentSchema');

// render home page
module.exports.homePage = async function (req, res) {
  try {
    const students = await Student.find({});
    return res.render('home', { students });
  } catch (error) {
    console.log(`Error rendering home page: ${error}`);
    return res.redirect('back');
  }
};
