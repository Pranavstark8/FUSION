const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// 1. Connect to your local MongoDB
mongoose.connect('mongodb://localhost:27017/FusionDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch((err) => console.error('❌ MongoDB Connection Error:', err));

// 2. Define your User schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false
  },
  email: {
    type: String,
    required: [true, "Please provide an Email"],
    unique: [true, "Email exists!!"]
  },
  phone: {
    type: Number,
    required: true,
    unique: false
  },
  password: {
    type: String,
    required: [true, "Please provide a password!!"],
    unique: false
  },
  isOnline: {
    type: String,
    default: '0'
  },
  image: {
    type: String,
    required: true
  }
}, { timestamps: true });

const User = mongoose.model('details', UserSchema);

// 3. Seed the users
const seedUsers = async () => {
  try {
    await User.deleteMany({}); // Optional: clear old data

    const hashedPassword = await bcrypt.hash('testpass123', 10);

    const users = [
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        phone: 9876543210,
        password: hashedPassword,
        isOnline: '0',
        image: 'https://i.pravatar.cc/150?img=1'
      },
      {
        name: 'Bob Smith',
        email: 'bob@example.com',
        phone: 9123456780,
        password: hashedPassword,
        isOnline: '0',
        image: 'https://i.pravatar.cc/150?img=2'
      }
    ];

    await User.insertMany(users);
    console.log('✅ Users seeded successfully!');
  } catch (err) {
    console.error('❌ Seeding error:', err);
  } finally {
    mongoose.disconnect();
  }
};

seedUsers();
