import userModel from '../models/userModel.js';

//Get user data
export const getUserData = async (req, res) => {

    //Try to get user data
    try {
        //Get user id from request body
        const userId = req.user.id;

        //Get user data from database
        const user = await userModel.findById(userId).
        select('-password -__v -resetOtp -verifyOtp');

        //Check if user exists
        if(!user) {
            return res.json({
                success: false,
                message: 'User not found',
            })
        }

        //If user exists, return user data
        res.json({
            success: true,
            user: {
                name: user.name,
                avatarUrl: user.avatarUrl,
                isAccountVerified: user.isAccountVerified,
            }
        });

    } catch (error) {
        return res.json({
            success: false,
            message: error.message,
        })
    }
}

export const getSkillMatcher = async (req, res) => {
    try {
        const currentUser = await userModel.findById(req.user.id);

        if(!currentUser) {
            return res.json({
                success: false,
                message: 'User not found',
            })
        };

        const skillsToLearn = currentUser.skillsToLearn;

        const matchedUsers = await userModel.find({
            _id: { $ne: currentUser._id},
            skillsToTeach: { $in: skillsToLearn }
        }).select("name skillsToLearn skillsToTeach bio avatarUrl")

        return res.json({
            success: true,
            matchedUsers,
        });

    } catch (error) {
        res.json ({
            success: false,
            message: error.message
        });
    }
}

export const getPublicProfile = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await userModel.findById(id)
        .select('name avatarUrl bio skillsToTeach skillsToLearn')

        if(!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        return res.json({
            success: true,
            user,
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}