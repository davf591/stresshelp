const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');

async function up() {
  const client = await MongoClient.connect("mongodb+srv://Floats1:Likeabutterfly2@ryhma3.r9edbjd.mongodb.net/Group3-milestone1", { useNewUrlParser: true });
  const db = client.db('Group3-milestone1');

  const admin = await db.collection('admin').findOne({ email: 'admin@example.com' });

  if (!admin) {
    const passwordHash = await bcrypt.hash('admin123', 10); // hash the password using bcrypt
    await db.collection('admin').insertOne({ email: 'admin@example.com', password: passwordHash });
  } else {
    const passwordHash = await bcrypt.hash('newpassword', 10); // hash the new password
    await db.collection('admin').updateOne({ _id: admin._id }, { $set: { password: passwordHash } });
  }

  await client.close();
}

async function down() {
  const client = await MongoClient.connect("mongodb+srv://Floats1:Likeabutterfly2@ryhma3.r9edbjd.mongodb.net/Group3-milestone1", { useNewUrlParser: true });
  const db = client.db('Group3-milestone1');

  await db.collection('admin').deleteOne({ email: 'admin@example.com' });

  await client.close();
}

module.exports = { up, down };

/*const mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://localhost:27017/myDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the admin schema
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Define the admin model
const Admin = mongoose.model('Admin', adminSchema);

// Check if the admin account already exists
Admin.findOne({ username: 'admin' }, (err, admin) => {
  if (err) {
    console.log('Error:', err);
    mongoose.disconnect();
    return;
  }

  // If the admin account exists, update the password
  if (admin) {
    admin.password = 'newpassword';
    admin.save((err) => {
      if (err) {
        console.log('Error:', err);
      } else {
        console.log('Admin account updated successfully');
      }
      mongoose.disconnect();
    });
  }
  // If the admin account does not exist, create a new one
  else {
    const newAdmin = new Admin({
      username: 'admin',
      password: 'newpassword',
    });
    newAdmin.save((err) => {
      if (err) {
        console.log('Error:', err);
      } else {
        console.log('Admin account created successfully');
      }
      mongoose.disconnect();
    });
  }
});*/