// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const qr = require('qrcode');
const User = require('./models/user.model');
const cors = require('cors'); // Import cors module

// Create Express application
const app = express();
app.use(cors());

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/qr-scanner', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Define routes
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.get('/qr-code', async (req, res) => {
    try {
        const qrCode = await qr.toDataURL('https://ammar.geekscrew.xyz');
        res.send(qrCode);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.get('/user/:regNo', async (req, res) => {
    try {
      const regNo = req.params.regNo;
      const doctor = await User.findOne({ regNo });
      if (!doctor) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(doctor);
    } catch (error) {
      console.error('Error fetching doctor:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });



// Create mock data
const mockDoctors = [
  {
    regNo: 'AMC-R15878',
    name: 'John Doe',
    degree: 'MD',
    specField: 'Cardiology',
    university: 'University of Medicine',
    graduationYear: 2010,
    qualification: 'Fellowship in Cardiology',
    academicRank: 'Associate Professor'
  },
  {
    regNo: 'AMC-R24579',
    name: 'Jane Smith',
    degree: 'MD',
    specField: 'Pediatrics',
    university: 'University of Medicine',
    graduationYear: 2008,
    qualification: 'Pediatric Residency',
    academicRank: 'Assistant Professor'
  },
  {
    regNo: 'AMC-R36682',
    name: 'David Johnson',
    degree: 'DO',
    specField: 'Orthopedics',
    university: 'University of Medicine',
    graduationYear: 2012,
    qualification: 'Orthopedic Surgery Residency',
    academicRank: 'Consultant'
  },
  // Add more mock data as needed
];

// Function to insert mock data
async function insertMockData() {
  try {
    // Insert mock data into the database
    await User.insertMany(mockDoctors);
    console.log('Mock data inserted successfully');
  } catch (error) {
    console.error('Error inserting mock data:', error);
  }
}

// Call the function to insert mock data
// insertMockData();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
