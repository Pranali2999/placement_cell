const User = require('../models/userSchema');
const Student = require('../models/studentSchema');
const fs = require('fs').promises; // Using promises version of fs
const fastcsv = require('fast-csv');

// render sign up page
module.exports.signup = async function (req, res) {
	if (req.isAuthenticated()) {
		return res.redirect('back');
	}
	res.render('signup');
};

// render sign in page
module.exports.signin = async function (req, res) {
	if (req.isAuthenticated()) {
		return res.redirect('back');
	}
	res.render('signin');
};


// signout
module.exports.signout = async function (req, res) {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
	});
	req.flash('success', 'You have logged out'); 
	return res.redirect('/users/signin');
};

// create user
module.exports.createUser = async function (req, res) {
	const { name, email, password, confirmPassword } = req.body;
	try {
		if (password !== confirmPassword) {
			console.log(`Passwords dont match`);
			return res.redirect('back');
		}
		const user = await User.findOne({ email });

		if (user) {
			console.log(`Email already exists`);
			return res.redirect('back');
		}

		const newUser = await User.create({
			name,
			email,
			password,
		});

		if (!newUser) {
			console.log(`Error in creating user`);
			return res.redirect('back');
		}

		return res.redirect('/users/signin');
	} catch (error) {
		console.log(`Error in creating user: ${error}`);
		res.redirect('back');
	}
};

// download report
module.exports.downloadCsv = async function (req, res) {
	try {
		const students = await Student.find({});

		let csv = 'S.No, Name, Email, College, Placemnt, Contact Number, Batch, DSA Score, WebDev Score, React Score, Interview, Date, Result\n';

		for (let [index, student] of students.entries()) {
			let data = `${index + 1},${student.name},${student.email},${student.college},${student.placement},${student.contactNumber},${student.batch},${student.dsa},${student.webd},${student.react}`;
			if (student.interviews.length > 0) {
				for (let interview of student.interviews) {
					data += `,${interview.company},${interview.date.toString()},${interview.result}`;
				}
			}
			csv += data + '\n';
		}

		await fs.writeFile('report/data.csv', csv);
		console.log('Report generated successfully');
		return res.download('report/data.csv');
	} catch (error) {
		console.log(`Error in downloading file: ${error}`);
		return res.redirect('back');
	}
};


// create session
module.exports.createSession = async function (req, res) {
	console.log('Session created successfully');
	req.flash('success','Logged in Successfully');
	return res.redirect('/');
};

// //destory session
// module.exports.destroySession = async function(req, res) {
//     req.logout();
// 	req.flash('success', 'You have logged out'); 
//     return res.redirect('/');
// };
module.exports.profilePage = function (req, res) {
	res.render('profile', { user: req.user }); // Pass the user object to the view
};

module.exports.updateProfile = async function (req, res) {
	try {
		const user = await User.findById(req.user.id);

		if (!user) {
			return res.redirect('back');
		}

		user.name = req.body.username; // Update the username
		user.password = req.body.password; // Update the password

		await user.save();

		req.flash('success', 'Profile updated successfully'); // Flash success message
		return res.redirect('/'); // Redirect to home or profile page
	} catch (err) {
		console.log(err);
		req.flash('error', 'Error updating profile'); // Flash error message
		return res.redirect('back');
	}
};
