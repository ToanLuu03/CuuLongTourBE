const Hotel = require('../../models/Hotel/Hotel'); // Đường dẫn đến file model của bạn

// GET /hotels - Lấy danh sách tất cả các khách sạn
const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json({
      success: true,
      data: hotels,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch hotels',
      error: error.message,
    });
  }
};

// POST /hotels - Tạo mới một khách sạn
const createHotel = async (req, res) => {
  try {
    const { name, address, pricePerNight, amenities, description, images, reviews, phoneNumber, facebookLink, instagramLink } = req.body;

    const newHotel = new Hotel({
      name,
      address,
      pricePerNight,
      amenities,
      description,
      images,
      reviews,
      phoneNumber,
      facebookLink,
      instagramLink
    });

    await newHotel.save(); // Lưu khách sạn vào database

    res.status(201).json({
      success: true,
      message: 'Hotel created successfully',
      data: newHotel,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create hotel',
      error: error.message,
    });
  }
};

// GET /hotels/:id - Lấy thông tin chi tiết của một khách sạn theo ID
const getHotelById = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found',
      });
    }

    res.status(200).json({
      success: true,
      data: hotel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch hotel',
      error: error.message,
    });
  }
};

// PUT /hotels/:id - Cập nhật thông tin của một khách sạn theo ID
const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, pricePerNight, amenities, description, images, reviews, phoneNumber, facebookLink, instagramLink } = req.body;

    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      {
        name,
        address,
        pricePerNight,
        amenities,
        description,
        images,
        reviews,
        phoneNumber,
        facebookLink,
        instagramLink
      },
      { new: true }
    );

    if (!updatedHotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Hotel updated successfully',
      data: updatedHotel,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update hotel',
      error: error.message,
    });
  }
};

// DELETE /hotels/:id - Xóa một khách sạn theo ID
const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedHotel = await Hotel.findByIdAndDelete(id);

    if (!deletedHotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Hotel deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete hotel',
      error: error.message,
    });
  }
};
// Controller to get top 5 hotels
const top5Hotels = async (req, res) => {
  try {
    const hotels = await Hotel.find()
      .limit(5); 
    res.status(200).json({ success: true, data: hotels });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
module.exports = {
  getAllHotels,
  createHotel,
  getHotelById,
  updateHotel,
  deleteHotel,
  top5Hotels
};
