import Message from "../models/message.model";
import { Request, Response } from "express";
import Conversation from "../models/conversation.model";

export default class MessageController{

    static async sendMessage(req: Request , res: Response){
        try{
            
            const {id: receiverID } = req.params;
            const { message } = req.body;

            //@ts-ignore
            const sernderId = req.user._id;

            let conversation = await Conversation.findOne({
                participants: {
                    $all : [sernderId, receiverID]
                }
            })

            if(!conversation){
                conversation = new Conversation({
                    participants: [sernderId, receiverID]
                });
            }

            const newMessage = new Message({
                senderId: sernderId,
                reciverId: receiverID,
                message: message
            });

            
            if(newMessage){
                conversation.messages.push(newMessage._id);
            }

            //SOCKET FUNCTIONALITY WILL BE ADDED HERE   

            // await newMessage.save();
            // await conversation.save(); this is run one after the other

            await Promise.all([newMessage.save(), conversation.save()]); // this will run parallely and save time

            res.status(201).json({
                newMessage
            })

        }
        catch(error){

            console.log(" Error in the send MEssage controller" , error);

            res.status(500).json({
                message:"internal server error"
            })
        }
    }

    static async getMessages(req: Request , res: Response){
        try{

            const { id: userToChatId } = req.params;
            //@ts-ignore
            const senderId = req.user._id;

            const conversation = await Conversation.findOne({
                participants: {
                    $all: [senderId, userToChatId]
                }
            }).populate("messages"); //Not referencing but the messages itself

            if(!conversation){
                return res.status(404).json([])
            }

            res.status(200).json({
                conversation
            })

        }catch(error){
            console.log("Error in the getMessages controller" , error);
            res.status(500).json({
                message:"internal server error"
            })
        }
    }
}