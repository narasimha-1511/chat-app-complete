import Message from "../models/message.model";
import { Request, Response } from "express";
import Conversation from "../models/conversation.model";
import { getReceiverSocketId, io } from "../socket/socket";

export default class MessageController {
  static async sendMessage(req: Request, res: Response) {
    try {
      const { id: receiverID } = req.params;
      const { message } = req.body;

      //@ts-ignore
      const sernderId = req.user._id;

      let conversation = await Conversation.findOne({
        participants: {
          $all: [sernderId, receiverID],
        },
      });

      if (!conversation) {
        conversation = new Conversation({
          participants: [sernderId, receiverID],
        });
      }

      const newMessage = new Message({
        senderId: sernderId,
        reciverId: receiverID,
        message: message,
      });

      if (newMessage) {
        conversation.messages.push(newMessage._id);
      }

      // await newMessage.save();
      // await conversation.save(); this is run one after the other

      await Promise.all([newMessage.save(), conversation.save()]); // this will run parallely and save time

      //SOCKET FUNCTIONALITY WILL BE ADDED HERE
      const reciverSocketId = getReceiverSocketId(receiverID);

      if (reciverSocketId) {
        //io.to(reciverSocketId).emit("newMessage", newMessage); used to send events to a specific client
        io.to(reciverSocketId).emit("newMessage", newMessage);
      }

      res.status(201).json({
        message: newMessage,
      });
    } catch (error) {
      console.log(" Error in the send MEssage controller", error);

      res.status(500).json({
        message: "internal server error",
      });
    }
  }

  static async getMessages(req: Request, res: Response) {
    try {
      const { id: userToChatId } = req.params;
      //@ts-ignore
      const senderId = req.user._id;

      const conversation = await Conversation.findOne({
        participants: {
          $all: [senderId, userToChatId],
        },
      }).populate("messages"); //Not referencing but the messages itself

      if (!conversation) {
        return res.status(404).json([]);
      }

      const messagges = conversation.messages;

      res.status(200).json(messagges);
    } catch (error) {
      console.log("Error in the getMessages controller", error);
      res.status(500).json({
        message: "internal server error",
      });
    }
  }
}