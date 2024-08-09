const UserModel = require("../models/User")

const dbGetUserByUsername = async ( email ) => {

    return await UserModel.findOne({ username: email });
}


module.exports = {
    dbGetUserByUsername
};