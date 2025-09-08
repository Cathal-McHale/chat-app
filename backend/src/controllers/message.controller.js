import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async(req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne:loggedInUserId}}).select("-password")

        res.status(200).json(filteredUsers)

    } catch (error) {
        console.log("Error in getUsersForSidebar", error.message)
        res.status(500),json({error: "Internal server error"})
    }
}

export const getMessages = async(req, res) =>{
    try {
        const {id:userToChatId} = req.params
        const senderId = req.user._id;

        //find all messages from sender and reciever in one chat
        const messages = await Message.find({
            $or:[
                {senderId:senderId, recieverId:userToChatId},

            ]
        })

        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessages controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }

}