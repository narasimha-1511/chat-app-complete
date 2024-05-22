import mongoose, { mongo } from "mongoose";

const messageModelSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId ,
        ref : "User",
        required: true
    }, 
    reciverId:{
        type :mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    message:{
        type: String,
        required: true
    }
    //timestamps needed to be added
    // here we will have updatedAt and createdAt
},{timestamps : true})

const Message = mongoose.model("Message",messageModelSchema);

export default Message;