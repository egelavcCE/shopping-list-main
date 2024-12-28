const SharedCart = require('../models/sharedCartModel');
const { v4: uuidv4 } = require('uuid');

// Sepeti paylaş
const shareCart = async (req, res) => {
  try {
    const { userId, items } = req.body;
    
    // Benzersiz bir paylaşım ID'si oluştur
    const shareId = uuidv4();
    
    // 24 saat sonra silinecek şekilde ayarla
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);
    
    // Yeni paylaşılan sepet oluştur
    const sharedCart = new SharedCart({
      userId,
      items,
      shareId,
      expiresAt
    });
    
    await sharedCart.save();
    
    res.status(201).json({
      success: true,
      shareId
    });
  } catch (error) {
    console.error('Sepet paylaşım hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Sepet paylaşılırken bir hata oluştu'
    });
  }
};

// Paylaşılan sepeti getir
const getSharedCart = async (req, res) => {
  try {
    const { shareId } = req.params;
    
    const sharedCart = await SharedCart.findOne({
      shareId,
      expiresAt: { $gt: new Date() }
    });
    
    if (!sharedCart) {
      return res.status(404).json({
        success: false,
        message: 'Paylaşılan sepet bulunamadı veya süresi dolmuş'
      });
    }
    
    res.status(200).json({
      success: true,
      cart: sharedCart
    });
  } catch (error) {
    console.error('Paylaşılan sepet getirme hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Paylaşılan sepet getirilirken bir hata oluştu'
    });
  }
};

module.exports = {
  shareCart,
  getSharedCart
};
