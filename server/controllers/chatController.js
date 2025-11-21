// import Chat from "../models/chatModel.js"
// //api controller for creating a new chat
// export const createChat=async(req,res)=>{
//     try{
//         const userId=req.user._id
//         const chatData={
//             userId,
//             messages:[],
//             name:"New Chat",
//             userName:req.user.name
//         }
//         await Chat.create(chatData)
//         res.json({sucess:true,message:"Chat Created"});

//     }
//     catch(error){
//         res.json({sucess:false,message:error.message});

//     }

// }

// //api controller for getting all chats
// export const getChats=async(req,res)=>{

//     try{
//             const userId=req.user._id
//             const chats=await Chat.find({userId}).sort({updatedAt:-1})
            
//             res.json({sucess:true,chats});
//         }catch(error){
//             res.json({sucess:false,message:error.message});
//         }

// }

// //Api controller for deleting A CHAT
// export const deleteChat=async(req,res)=>{
//      try{
//         const userId=req.user._id
//         const chatData=req.body;
//         await Chat.deleteOne({_id:chatId,userId})

//         res.json({success:true,message:"Chats deleted"})


//     }
//     catch(error){
//         res.json({sucess:false,message:error.message});

//     }

// }
    

      import Chat from "../models/Chat.js";

// Create a new chat
export const createChat = async (req, res) => {
    try {
        const userId = req.user._id;

        const chatData = {
            userId,
            messages: [],
            name: "New Chat",
            userName: req.user.name
        };

        await Chat.create(chatData);

        res.json({
            success: true,
            message: "Chat Created"
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};


// Get all chats for the logged-in user
export const getChats = async (req, res) => {
    try {
        const userId = req.user._id;

        const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });

        res.json({
            success: true,
            chats
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};


// Delete a chat
export const deleteChat = async (req, res) => {
    try {
        const userId = req.user._id;
        const { chatId } = req.body;

        if (!chatId) {
            return res.json({
                success: false,
                message: "chatId is required"
            });
        }

        const deleted = await Chat.deleteOne({
            _id: chatId,
            userId
        });

        if (deleted.deletedCount === 0) {
            return res.json({
                success: false,
                message: "Chat not found or unauthorized"
            });
        }

        res.json({
            success: true,
            message: "Chat deleted successfully"
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};
