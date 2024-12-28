const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Kullanıcı kaydı
const registerUser = async (req, res) => {
  const { name, surname, email, password } = req.body;
  try {
    // Şifreyi hash'leme
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Yeni kullanıcı oluşturma
    const newUser = new User({
      name,
      surname,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'Kullanıcı başarıyla kaydedildi' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Kayıt işlemi sırasında bir hata oluştu' });
  }
};

// Kullanıcı girişi
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Kullanıcı bulunamadı' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Şifre yanlış' });
    }

    res.status(200).json({ message: 'Giriş başarılı', userId: user._id, name: user.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Giriş işlemi sırasında bir hata oluştu' });
  }
};

module.exports = { registerUser, loginUser };
