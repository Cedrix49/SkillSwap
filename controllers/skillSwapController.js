import skillSwapRequestModel from "../models/swapRequestModel.js";
import userModel from "../models/userModel.js"

//Send skill swap request
export const sendSkillSwapRequest = async (req, res) => {
    try {
        const fromUser = req.user.id;
        const { toUser, skillOffered, skillRequested, message, scheduledDate } = req.body;

        if (fromUser === toUser) {
            return res.json({
                success: false,
                message: "You cant send a request to yourself."
            });
        }

        const fromUserDoc = await userModel.findById(fromUser);  
        if(!fromUserDoc?.isAccountVerified) {
            return res.json({
                success: false,
                message: "You must verify your account before sending requests."
            })
        }

        const targetUser = await userModel.findById(toUser);
        if(!targetUser) {
            return res.json({
                success: false,
                message: "The user you are trying to send skill swap request does not exist."
            });
        }

        if(!targetUser.isAccountVerified) {
            return res.json({
                        success: false,
            message: "Cannot send request to an unverified user"
            });
        }

        const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000); 

        const newRequest = await skillSwapRequestModel.create({
            fromUser,
            toUser,
            skillOffered,
            skillRequested,
            message,
            scheduledDate,
            expiresAt: expiry,
        });

        res.json({
            success: true,
            message: 'Skill swap request sent.',
            request: newRequest,
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
}

//Accept and reject request
export const respondToSkillSwapRequest= async (req, res) => {
    try {
        const userId = req.user.id;
        const requestId = req.params.id;
        const { status } = req.body
        const request = await skillSwapRequestModel.findById(requestId);

        if (!request || request.toUser.toString() !== userId) {
            return res.json({
                success: false,
                message: "Unauthorized or request not found."
            });
        }

        request.status = status;
        await request.save();

        res.json({
            success: true,
            message: `Request ${status}.` 
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}