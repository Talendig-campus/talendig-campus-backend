const {connect} = require('mongoose');

const connectDB = (url) => connect(url).then(console.log('connection stablished correctly!'));

module.exports = connectDB;
