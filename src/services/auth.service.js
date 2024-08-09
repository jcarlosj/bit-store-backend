const UserModel = require("../models/User")

const dbGetUserByUsername = async ( email ) => {

    return await UserModel.findOne({ username: email });
}

const registerUser = async ( newUser ) => {

    return await UserModel.create( newUser );
}


module.exports = {
    dbGetUserByUsername,
    registerUser
};