const Company = require('../models/companySchema');
const Student = require('../models/studentSchema');

// render create student page
module.exports.createStudentPage = async function (req, res) {
  return res.render('add_student');
};
// create student
module.exports.createStudent = async function (req, res) {
  const { name, email, batch, college, placement, contactNumber, dsa, webd, react } = req.body;
  try {
    const students = await Student.findOne({ email });

    if (students) {
      console.log('Email already exists');
      req.flash('error', 'Email already exists');
      return res.redirect('back');
    }

    const newStudent = await Student.create({
      name,
      email,
      college,
      batch,
      placement,
      contactNumber,
      dsa,
      webd,
      react,
    });
    req.flash('success', 'Student added'); 
    return res.redirect('/');
  } catch (error) {
    console.log(`Error in creating student: ${error}`);
    return res.redirect('back');
  }
};

//delete student
module.exports.deleteStudent = async function (req, res) {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    if (student.interviews.length > 0) {
      for (let item of student.interviews) {
        const company = await Company.findOne({ name: item.company });
        if (company) {
          for (let i = 0; i < company.students.length; i++) {
            if (company.students[i].student.toString() === id) {
              company.students.splice(i, 1);
              await company.save();
              break;
            }
          }
        }
      }
    }

    await Student.findByIdAndDelete(id);

    if (req.xhr) {
      return res.status(200).json({
        success: true,
        student_id: id,
        message: 'Student deleted'
      });
    } else {
      res.redirect('back');
    }
  } catch (error) {
    console.error('Error in deleting student:', error);
    if (req.xhr) {
      return res.status(500).json({
        success: false,
        message: 'Error deleting student'
      });
    } else {
      return res.redirect('back');
    }
  }
};

//update status
module.exports.updateStudentPlacement = async function (req, res) {
  const studentId = req.params.id;
  const { companyResult } = req.body;

  try {
    // Find the student by ID
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    // Update the placement status
    student.placement = companyResult;

    // Save the updated student
    await student.save();

    if (req.xhr) {
      return res.status(200).json({
        success: true,
        student_id: studentId,
        message: 'Placement status updated',
      });
    } else {
      res.redirect('back');
    }
  } catch (error) {
    console.error('Error updating placement status:', error);
    if (req.xhr) {
      return res.status(500).json({
        success: false,
        message: 'Error updating placement status',
      });
    } else {
      return res.redirect('back');
    }
  }
};


