const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = 3000;

// MongoDB configuration
const mongoURI = "mongodb://localhost:27017"; // Replace with your MongoDB URI if hosted elsewhere
const dbName = "gigmarket";

let db;
MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log("Connected to MongoDB");
    db = client.db(dbName);
  })
  .catch(error => console.error("Error connecting to MongoDB:", error));

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this directory exist
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); // Serve uploaded files statically

// Create a Gig
app.post('/create-gig', upload.single('image'), async (req, res) => {
  const { title, description, price, category, cryptoType, time } = req.body;
  const imageFile = req.file;

  if (!title || !price || !category || !cryptoType) {
    return res.status(400).json({ status: 'error', message: 'All fields are required' });
  }

  const gig = {
    id: uuidv4(),
    title,
    description,
    price: parseFloat(price), // Ensure price is stored as a number
    category,
    cryptoType,
    time,
    imagePath: imageFile?.path || '',
    createdAt: new Date(),
    applications: [], // Store applications here
    applicationStartTime: null, // Store the start time for applications
    applicationEndTime: null,  // Store the end time after 2 hours
  };

  try {
    const result = await db.collection('gigs').insertOne(gig);
    res.status(201).json({ status: 'success', message: 'Gig created successfully', gig });
  } catch (error) {
    console.error('Error creating gig:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// Apply for a Gig
app.post('/apply-for-gig/:id', async (req, res) => {
  const { id } = req.params;
  const { freelancerName, bidTime } = req.body; // bidTime in hours

  if (!freelancerName || !bidTime) {
    return res.status(400).json({ status: 'error', message: 'Freelancer name and bid time are required' });
  }
  try {
    const gig = await db.collection('gigs').findOne({ _id: new ObjectId(id) });

    if (!gig) {
      return res.status(404).json({ status: 'error', message: 'Gig not found' });
    }

    // Check if the application timer has expired
    if (gig.applicationEndTime && new Date() > gig.applicationEndTime) {
      return res.status(400).json({ status: 'error', message: 'The application period has expired' });
    }

    // If it's the first application, start the timer (2 hours)
    if (!gig.applicationStartTime) {
      gig.applicationStartTime = new Date();
      gig.applicationEndTime = new Date(gig.applicationStartTime.getTime() + 2 * 60 * 60 * 1000); // 2 hours from start time
    }

    // Store the freelancer's application
    const application = {
      freelancerName,
      bidTime: parseFloat(bidTime), // time in hours
      appliedAt: new Date(),
    };

    gig.applications.push(application);

    // Save updated gig
    await db.collection('gigs').updateOne({ _id: new ObjectId(id) }, { $set: gig });

    res.status(200).json({ status: 'success', message: 'Application submitted successfully', gig });
  } catch (error) {
    console.error('Error applying for gig:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// Get all gigs for the actual freelancers
app.get('/gigs', async (req, res) => {
  try {
    const gigs = await db.collection('gigs').find().sort({ createdAt: -1 }).toArray();
    res.status(200).json({ status: 'success', gigs });
  } catch (error) {
    console.error('Error fetching gigs:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// Get a single gig by ID detailed view
app.get('/gigs/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const gig = await db.collection('gigs').findOne({ _id: new ObjectId(id) });

    if (!gig) {
      return res.status(404).json({ status: 'error', message: 'Gig not found' });
    }

    res.status(200).json({ status: 'success', gig });
  } catch (error) {
    console.error('Error fetching gig:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// Delete a gig after completion of a gig 
app.delete('/gigs/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.collection('gigs').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ status: 'error', message: 'Gig not found' });
    }

    res.status(200).json({ status: 'success', message: 'Gig deleted successfully' });
  } catch (error) {
    console.error('Error deleting gig:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Export for potential testing
module.exports = app;
