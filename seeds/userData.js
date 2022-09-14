const { User } = require("../models");
const userData = [{
    username: "auto_user",
    password: "123456"

}];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
