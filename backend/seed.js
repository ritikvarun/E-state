const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
const User = require('./models/User');
const Property = require('./models/Property');
const Inquiry = require('./models/Inquiry');
const { initialProperties, initialUsers, initialInquiries } = require('./seedData');

const seedDB = async () => {
  await connectDB();
  try {
    await User.deleteMany();
    await Property.deleteMany();
    await Inquiry.deleteMany();

    await User.insertMany(initialUsers);
    await Property.insertMany(initialProperties);
    await Inquiry.insertMany(initialInquiries);

    console.log('EstatePro Database Seeded Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding Error:', error.message);
    process.exit(1);
  }
};

seedDB();
