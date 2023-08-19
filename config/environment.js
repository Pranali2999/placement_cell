const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: logDirectory
});

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'mp_development',
    morgan:{
      mode: 'dev',
      options: {stream: accessLogStream}
    }
  }

const production = {
    name: 'production',
    asset_path: process.env.CODIAL_ASSET_PATH,
    session_cookie_key: process.env.CODIAL_SESSION_COOKIE_KEY,
    db: process.env.CODIAL_DB,
    morgan:{
      mode: 'combined',
      options: {stream: accessLogStream}
    }
}

module.exports = eval(process.env.CODIAL_ENVIRONMENT) === undefined ? development : eval(process.env.CODIAL_ENVIRONMENT);
