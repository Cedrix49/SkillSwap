import express from 'express';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

// Test Cloudinary configuration
router.get('/test-cloudinary', (req, res) => {
  try {
    res.json({
      success: true,
      cloudName: cloudinary.config().cloud_name,
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'Cloudinary test failed',
      error: error.message,
    });
  }
});

export default router;
