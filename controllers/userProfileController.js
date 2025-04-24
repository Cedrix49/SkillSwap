import userModel from '../models/userModel.js';
import cloudinary from '../config/cloudinary.js';


// Upload avatar
export const updateAvatar = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.json({
        success: false,
        message: "No image file provided"
      });
    }

    // Upload to Cloudinary using Promise
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'avatar',
          resource_type: 'image',
          transformation: [
            { width: 300, height: 300, crop: 'thumb', gravity: 'face' }
          ],
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      stream.end(req.file.buffer);
    });

    // Update user avatar
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { avatarUrl: result.secure_url },
      { new: true }
    );

    res.json({
      success: true,
      message: "Avatar updated successfully",
      avatarUrl: updatedUser.avatarUrl,
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//Get user profile
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id

        const user = await userModel.findById(userId);

        if(!user) {
            return res.json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            userProfile: {
                name: user.name,
                bio: user.bio,
                avatarUrl: user.avatarUrl,
                skillsToTeach: user.skillsToTeach,
                skillsToLearn: user.skillsToLearn
            },
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    };
}

//Update user profile
export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { bio, avatarUrl, skillsToTeach, skillsToLearn} = req.body;

        const updatedUser = await userModel.findByIdAndUpdate(userId, {
            bio,
            avatarUrl,
            skillsToTeach,
            skillsToLearn,
        }, {new: true});   

        if (!updatedUser) {
            return res.json({
                success: false,
                message: 'User not found'
            })
        }

        res.json({
            success: true,
            message: 'User profile updated successfully',
            userProfile: {
                bio: updatedUser.bio,
                avatarUrl: updatedUser.avatarUrl,
                skillsToTeach: updatedUser.skillsToTeach,
                skillsToLearn: updatedUser.skillsToLearn,
            },
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        });
    };
}