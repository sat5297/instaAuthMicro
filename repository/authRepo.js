if(process.env.NODE_ENV !== 'production'){
    const dotenv = require('dotenv').config({path : `${__dirname}/../.env`});
}

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { MongoClient, ServerApiVersion } = require('mongodb');
const URI = process.env.DB_URL;

const client = new MongoClient(URI);

const registerUser = async (body) => {
    console.log(body);
    await client.connect();
    const authCollection = client.db("instaAuthDB").collection("authentication");
    const hashedPassword = await bcrypt.hash(body.password, 10);
    try{
        const findUser = await authCollection.countDocuments({ mailID: body.mailID });
        if(findUser == 0){
            const res = await authCollection.insertOne({mailID: body.mailID, FullName : body.FullName, userName : body.userName, passwd : hashedPassword});
            client.close();
            return "User Inserted Successfully";
        }else{
            return "User Already Exists. Aborting Registration.";
        }
    }
    catch(error){
        return "Error in promise";
    }
};

const loginUser = async (body) => {
    let searchOptions = {};
    if(body.userName != null && body.userName !== ""){
        searchOptions.userName = body.userName;
    }
    console.log(body, searchOptions);
    await client.connect();
    const authCollection = client.db("instaAuthDB").collection("authentication");
    try{
        const user = await authCollection.find(searchOptions).toArray();
        console.log(user);
        if(user.length >= 1 && await bcrypt.compare(body.password, user[0].passwd)){
            console.log("Success");
            return ("User Logged in Successfully");
        }
        else{
            console.log("Failure");
            return ("Failure");
        }
    }catch(error){
        console.log(error);
        return "Error in promise";
    }
};

const changePassword = async (body) => {
    let searchOptions = {};
    if(body.userName != null && body.userName !== ""){
        searchOptions.userName = body.userName;
    }
    console.log(body,searchOptions);
    const authCollection = client.db("instaAuthDB").collection("authentication");
    try{
        const user = await authCollection.find(searchOptions).toArray();
        console.log(user);
        if(user.length == 1 && await bcrypt.compare(body.currpass, user[0].passwd)){
            const newHashedPassword = await bcrypt.hash(body.confirmpass, 10);
            try{
                const updatedPassword = await authCollection.findOneAndUpdate(searchOptions, {$set: { passwd : newHashedPassword}});
                console.log(updatedPassword);
                return updatedPassword;
            }
            catch(error){
                return "Unable to Update Password";
            }
        }
        else{
            return "Password incorrect";
        }
    }
    catch(error){
        console.log(error);
        return "User not Found";
    }
};

const deleteUser = async (body) => {
    console.log(body);
    let searchOptions = {};
    if(body.userName != null && body.userName !== ""){
        searchOptions.userName = body.userName;
    }
    console.log(body, searchOptions);
    await client.connect();
    const authCollection = client.db("instaAuthDB").collection("authentication");
    try{
        const user = await authCollection.deleteOne(searchOptions);
        console.log(user);
        return user;
    }catch(error){
        console.log(error);
        return "Error in promise";
    }
};

module.exports = {
    loginUser,
    registerUser,
    changePassword,
    deleteUser
};