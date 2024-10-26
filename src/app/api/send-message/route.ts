import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { Message } from "@/models/User";

export async function POST(request:Request){
    await dbConnect()
    const {username,content}=await request.json()
    try {
        const user=await UserModel.findOne({username})
        if(!user){
            return Response.json({
                success:false,
                message:"User not found"
            },{status:403})
        }
        if(!user.isAcceptingMessage){
            return Response.json({
                success:false,
                message:"Currently user is not accepting messages"
            },{status:403})
        }
        const newMessage={content,createdAt:new Date()}
        user.messages.push(newMessage as Message)
        await user.save()
        return Response.json({
            success:true,
            message:"message sent successfully"
        },{status:201})
    } catch (error) {
        console.log("Error in adding messages")
        return Response.json({
            success:false,
            message:"Error in adding messages"
        },{status:500})
    }
}