const mongoose = require('mongoose');

// MongoDB bağlantısı
const connectDB = async () => {
  try {
    const dbURI = process.env.MONGO_URI; // .env dosyasındaki MONGO_URI'yi kullanıyoruz
    await mongoose.connect(dbURI); // Eski seçenekleri kaldırdık
    console.log('MongoDB bağlantısı başarılı');
  } catch (err) {
    console.error('MongoDB bağlantı hatası:', err);
    process.exit(1); // Bağlantı hatası durumunda uygulamayı sonlandır
  }
};

module.exports = connectDB;
