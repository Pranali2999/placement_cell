const Student = require('../models/studentSchema');
const Company = require('../models/companySchema');

// render company page
module.exports.companyPage = async function (req, res) {
  try {
    const students = await Student.find({});
    return res.render('company', { students });
  } catch (error) {
    console.log(`Error in rendering page: ${error}`);
    return res.redirect('back');
  }
};

// allocate interview
module.exports.allocateInterview = async function (req, res) {
  try {
    const students = await Student.find({});
    const uniqueBatches = [...new Set(students.map(student => student.batch))];
    
    return res.render('add_interview', { students, array: uniqueBatches });
  } catch (error) {
    console.log(`Error in allocating interview: ${error}`);
    return res.redirect('back');
  }
};

// schedule interview
module.exports.scheduleInterview = async function (req, res) {
  const { id, company, date } = req.body;
  try {
    const existingCompany = await Company.findOne({ name: company });
    const interviewObj = {
      student: id,
      date,
      result: 'Pending',
    };

    if (!existingCompany) {
      const newCompany = await Company.create({
        name: company,
        students: [interviewObj],
      });
    } else {
      const studentExists = existingCompany.students.some(student => student.student.equals(id));
      if (studentExists) {
        req.flash('error', 'Interview with this student already scheduled');
        // console.log('Interview with this student already scheduled');
        return res.redirect('back');
      }

      existingCompany.students.push(interviewObj);
      await existingCompany.save();
    }

    const student = await Student.findById(id);

    if (student) {
      const interview = {
        company,
        date,
        result: 'Pending',
      };
      student.interviews.push(interview);
      await student.save();
    }
    req.flash('success', 'Interview Scheduled Successfully'); 
    console.log('Interview Scheduled Successfully');
    return res.redirect('/company/home');
  } catch (error) {
    console.log(`Error in scheduling Interview: ${error}`);
    return res.redirect('back');
  }
};

// update status of interview
// module.exports.updateStatus = async function (req, res) {
//   const { id } = req.params;
//   const { companyName, companyResult } = req.body;
//   try {
//     const student = await Student.findById(id);
    
//     if (student && student.interviews.length > 0) {
//       for (let company of student.interviews) {
//         if (company.company === companyName) {
//           company.result = companyResult;
//           await student.save();
//           break;
//         }
//       }
//     }

//     const company = await Company.findOne({ name: companyName });

//     if (company) {
//       for (let std of company.students) {
//         if (std.student.toString() === id) {
//           std.result = companyResult;
//           await company.save();
//         }
//       }
//     }

//     console.log('Interview Status Changed Successfully');
//     return res.redirect('back');
//   } catch (error) {
//     console.log(`Error in updating status: ${error}`);
//     res.redirect('back');
//   }
// };


module.exports.updateStatus = async function (req, res) {
  const { id } = req.params;
  const { companyName, companyResult } = req.body;
  try {
    const student = await Student.findById(id);

    if (student && student.interviews.length > 0) {
      for (let company of student.interviews) {
        if (company.company === companyName) {
          company.result = companyResult;
          await student.save();
          break;
        }
      }
    }

    const company = await Company.findOne({ name: companyName });

    if (company) {
      for (let std of company.students) {
        if (std.student.toString() === id) {
          std.result = companyResult;
          await company.save();
        }
      }
    }
    if (req.xhr) {
      return res.status(200).json({
        success: true,
        student_id: id,
        message: 'Interview status updated'
      });
    } else {
      console.log('Interview Status Changed Successfully');
      return res.redirect('back');
    }
  } catch (error) {
    console.log(`Error in updating status: ${error}`);
    res.redirect('back');
  }
};
