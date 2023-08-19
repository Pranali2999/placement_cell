const fetch = require('node-fetch');

module.exports.jobPage = async function (req, res) {
    try {
        const response = await fetch('https://remotive.com/api/remote-jobs');
        const jobsData = await response.json();
        return res.render('job', {
            title: 'Placement Cell',
            body: jobsData.jobs,
        });
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return res.render('job', { body: [] });
    }
};
