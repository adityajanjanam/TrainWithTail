// Import required modules
require('dotenv').config(); // Ensure you have dotenv configured if using .env files

// Environment variable validation
if (!process.env.MONGO_URI) {
    console.error('FATAL ERROR: MONGO_URI is not defined in environment variables.');
    process.exit(1);
}
if (!process.env.SESSION_SECRET) {
    console.error('FATAL ERROR: SESSION_SECRET is not defined in environment variables.');
    process.exit(1);
}
const express = require('express'); // Importing Express framework
const mongoose = require('mongoose'); // Importing Mongoose for MongoDB interaction
const bodyParser = require('body-parser'); // Importing body-parser for parsing incoming request bodies
const session = require('express-session'); // Importing express-session for session management
const path = require('path'); // Importing path for handling file paths
const helmet = require('helmet'); // Importing Helmet for security middleware
const { body, validationResult } = require('express-validator');

// Initialize Express application
const app = express();

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from 'public' directory under the '/public' route
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files from 'images' directory under the '/images' route
app.use('/images', express.static(path.join(__dirname, 'images')));

// Serve static files from 'public/styles' directory under the '/styles' route
app.use('/styles', express.static(path.join(__dirname, 'public/styles')));

// Serve static files from 'public/js' directory under the '/js' route
app.use('/js', express.static(path.join(__dirname, 'public/js')));

const multer  = require('multer'); // Import Multer for handling file uploads

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/uploads/') // Specify the directory for storing uploaded files
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname) // Use the original file name for storing the uploaded file
  }
});
const upload = multer({ storage: storage });

const uri = process.env.MONGO_URI;

async function connectDB() {
    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 30000, // Increase timeout for server selection
        });
        console.log('Connected to MongoDB with Mongoose successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB with Mongoose:', error);
    }
}

connectDB();


// Event listener for MongoDB connection error
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

const ContactForm = require('./models/ContactForm');
const User = require('./models/User');
const Product = require('./models/Product');
const Behavior = require('./models/Behavior');
const Progress = require('./models/Progress');
const contactRoutes = require('./routes/contact');
app.use('/', contactRoutes);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'lax' : false
    }
}));
app.use(helmet());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});


app.post('/submitBehavior', async (req, res) => {
    try {
        // Extract form data from request body
        const { behaviorName, behaviorImg, behaviorDesc, behaviorObj, behaviorTech, progress, comments } = req.body;

        // Retrieve pet parent username from the request body
        const behaviorUser = req.body.behaviorUser;
        const behaviorPet = req.body.behaviorPet;

        // Check if a behavior with the same name already exists in the database
        let existingBehavior = await Behavior.findOne({ behaviorName, behaviorUser });

        // If the behavior exists, update its progress and comments
        if (existingBehavior) {
            existingBehavior.progress = progress;
            existingBehavior.comments = comments;
            await existingBehavior.save();
        } else {
            // If the behavior does not exist, create a new behavior record
            const newBehavior = new Behavior({
                behaviorName,
                behaviorImg,
                behaviorDesc,
                behaviorObj,
                behaviorTech,
                progress,
                comments,
                behaviorUser, // Update to use behaviorUser
                behaviorPet
            });

            // Save the new behavior to the database
            await newBehavior.save();
        }

        const behaviors = await Behavior.find({ behaviorUser: behaviorUser });
        const selectedUserPet = behaviorUser + "_" + behaviorPet;

        // Fetch behaviors from the database
        const users = await User.find(); // Assuming you want to fetch all users
        const currentUser = req.session.username;
        const petUser = behaviorUser;

        // Render the behavioralAnalysisTrainer view with the fetched behaviors and selectedUserPet
        res.render('behavioralAnalysisTrainer', { users, currentUser, selectedUserPet, behaviors, petUser });
    } catch (error) {
        // Handle error
        console.error(error);
        res.status(500).send('Error saving behavior');
    }
});

app.post('/submitDay', upload.single('video'), async (req, res) => {
    try {
        // Extract form data from request body
        const { progressDay, comments } = req.body;

        // Retrieve pet parent username from the request body
        const progressUser = req.body.progressUser;
        const progressPet = req.body.progressPet;

        const progressVideo = req.file.path; // Path to the uploaded video file

        // Check if a behavior with the same name already exists in the database
        let existingProgress = await Progress.findOne({ progressDay, progressUser });

        // If the behavior exists, update its progress and comments
        if (existingProgress) {
            existingProgress.comments = comments;
            existingProgress.progressVideo = progressVideo; // Update video file path
            await existingProgress.save();
        } else {
            // If the behavior does not exist, create a new behavior record
            const newProgress = new Progress({
                progressDay,
                comments,
                progressUser, // Update to use behaviorUser
                progressPet,
                progressVideo,
            });

            // Save the new behavior to the database
            await newProgress.save();
        }

        const progresses = await Progress.find({ progressUser: progressUser });
        const selectedUserPet = progressUser + "_" + progressPet;

        // Fetch behaviors from the database
        const users = await User.find(); // Assuming you want to fetch all users
        const currentUser = req.session.username;
        const petUser = progressUser;

        // Render the behavioralAnalysisTrainer view with the fetched behaviors and selectedUserPet
        res.render('progressCheckTrainer', { users, currentUser, selectedUserPet, progresses, petUser });
    } catch (error) {
        // Handle error
        console.error(error);
        res.status(500).send('Error saving behavior');
    }
});




// Assuming you're using Express.js for your server

app.post('/getBehaviorStatus', async (req, res) => {
    try {
        // Get the selected user and pet from the request body
        const selectedUserPet = req.body.selectedUserPet;

        // Split the selectedUserPet to get username and petname
        const [username, petname] = selectedUserPet.split('_');

        // Fetch behavior statuses for the selected user and pet from the database
        const behaviorStatuses = await Behavior.find({ behaviorUser: username, behaviorPet: petname });

        // Send the behavior statuses as a response
        res.json(behaviorStatuses);
    } catch (error) {
        console.error('Error fetching behavior statuses:', error);
        res.status(500).send('Error fetching behavior statuses');
    }
});

//Handle page load
app.get('/getBehavior', async (req, res) => {
    try {
        const { behaviorName, behaviorUser, behaviorPet } = req.query;

        // Retrieve behavior from the database
        const behavior = await Behavior.findOne({ behaviorName, behaviorUser, behaviorPet });
        // If the behavior is found, send the progress back to the client
        if (behavior) {
            res.status(200).json({ progress: behavior.progress, user: behavior.behaviorUser, petname: behavior.behaviorPet });
        } else {
            res.status(404).send('Behavior not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving behavior');
    }
});



// Submitted Form Route - GET
app.get('/submittedform', (req, res) => {
    res.render('submittedform');
});

// Root Route - Redirect to Home
app.get('/', (req, res) => {
    res.redirect('/home');
});

// Home Route - GET
app.get('/home', (req, res) => {
    const username = req.session.username;
    res.render('home', { username });
});



// About Us Route - GET
app.get('/aboutus', (req, res) => {
    res.render('aboutus');
});

// Login Route - GET
app.get('/customerlogin', (req, res) => {
    const errorMessage = req.query.errorMessage;
    res.render('customerlogin', { errorMessage });
});


// Trainer Login Route - GET
app.get('/trainerlogin', (req, res) => {
    const errorMessage = req.query.errorMessage;
    res.render('trainerlogin', { errorMessage });
});


// Trainer Signup Route - GET
app.get('/trainersignup', (req, res) => {
    // Your logic for rendering the trainer signup page
    res.render('trainersignup');
});

app.get('/behavioralAnalysisTrainer', async(req, res) => {
    try {
        // Fetch behaviors from the database
        const users = await User.find(); // Assuming you want to fetch all behaviors
        const currentUser = req.session.username; 
        const selectedUserPet = "Select User_Pet";
        const behaviors = await Behavior.find({ behaviorUser: "Select User_Pet" });
        

        // Render the behavioralAnalysisPetParent view with the fetched behaviors
        res.render('behavioralAnalysisTrainer', { users, currentUser, selectedUserPet, behaviors });
    } catch (err) {
        console.error('Error fetching behaviors:', err);
        res.status(500).render('error', { errorMessage: 'Internal Server Error' });
    }
});

app.get('/behavioralAnalysisPetParent', async (req, res) => {
    try {
        // Fetch behaviors from the database
        const currentUser = req.session.username;
        const behaviors = await Behavior.find({ behaviorUser: currentUser });

        // Render the behavioralAnalysisPetParent view with the fetched behaviors
        res.render('behavioralAnalysisPetParent', { behaviors });
    } catch (err) {
        console.error('Error fetching behaviors:', err);
        res.status(500).render('error', { errorMessage: 'Internal Server Error' });
    }
});

app.get('/progressCheckTrainer', async(req, res) => {
    try {
        // Fetch behaviors from the database
        const users = await User.find(); // Assuming you want to fetch all behaviors
        const currentUser = req.session.username; 
        const selectedUserPet = "Select User_Pet";
        const progresses = await Progress.find({ progressUser: "Select User_Pet" });
        

        // Render the behavioralAnalysisPetParent view with the fetched behaviors
        res.render('progressCheckTrainer', { users, currentUser, selectedUserPet, progresses });
    } catch (err) {
        console.error('Error fetching behaviors:', err);
        res.status(500).render('error', { errorMessage: 'Internal Server Error' });
    }
});

app.get('/progressCheckPetParent', async (req, res) => {
    try {
        // Fetch behaviors from the database
        const currentUser = req.session.username;
        const petName = req.session.petName;
        const progresses = await Progress.find({ progressUser: currentUser });

        // Render the behavioralAnalysisPetParent view with the fetched behaviors
        res.render('progressCheckPetParent', { progresses, petName });
    } catch (err) {
        console.error('Error fetching behaviors:', err);
        res.status(500).render('error', { errorMessage: 'Internal Server Error' });
    }
});

// POST endpoint for saving comments
app.post('/saveComment', (req, res) => {
    const { day, comment } = req.body;
    // Here you would save the comment to your database
    console.log(`Comment saved for day ${day}: ${comment}`);
    // Respond with a success message
    res.status(200).send('Comment saved successfully');
});


app.get('/paymentPage', (req, res) => {
    // Retrieve the total from session storage
    const total = req.session.total;

    // Render the paymentPage view with the total as a template variable
    res.render('paymentPage', { total });
});

app.post('/paymentPage', (req, res) => {
    // Validate and process the form data here
    // For example, you can retrieve the form data from req.body
    const formData = req.body;

    // Redirect the user to the payment success page
    res.redirect('/paymentSuccessPage');
});

// Payment Success Route - GET
app.get('/paymentSuccessPage', (req, res) => {
    // Retrieve the payment details and user data from the session
    const paymentDetails = req.session.paymentDetails;
    const user = req.session.user;

    // Render the payment success page, passing the payment details and user data as template variables
    res.render('paymentSuccessPage', { paymentDetails, user });
});

// Userspace Route - GET
app.get('/userspace', (req, res) => {
    const username = req.session.username;
    res.render('userspace', { username });
});

// Signup Route - GET
app.get('/signup', (req, res) => {
    res.render('signup');
});


// customerSignupMethod Route - POST
app.post('/customerSignupMethod', [
    body('username').trim().isLength({ min: 3, max: 30 }).withMessage('Username must be 3-30 characters long').matches(/^[A-Za-z0-9_]+$/).withMessage('Username must contain only letters, numbers, and underscores'),
    body('petName').trim().isLength({ min: 2, max: 30 }).withMessage('Pet name must be 2-30 characters long').matches(/^[A-Za-z ]+$/).withMessage('Pet name must contain only letters and spaces'),
    body('petBreed').trim().isLength({ min: 2, max: 30 }).withMessage('Pet breed must be 2-30 characters long').matches(/^[A-Za-z ]+$/).withMessage('Pet breed must contain only letters and spaces'),
    body('password').isLength({ min: 6, max: 50 }).withMessage('Password must be 6-50 characters long'),
    body('confirmpassword').custom((value, { req }) => value === req.body.password).withMessage('Passwords do not match'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('signup', { errorMessage: errors.array().map(e => e.msg).join('<br>') });
    }
    const { username, petName, petBreed, password } = req.body;
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ name: username });
        if (existingUser) {
            return res.render('signup', { errorMessage: 'Username already exists. Choose a different username.' });
        }
        // If the user doesn't exist, create and save a new user
        const newUser = new User({
            name: username,
            petName: petName,
            petBreed: petBreed,
            password: password,
            role: 'Customer',
        });
        await newUser.save();
        req.session.username = username;
        req.session.role = 'Customer';
        res.redirect('/home');
    } catch (err) {
        console.error('Error during signup:', err);
        res.sendStatus(500);
    }
});

// trainerSignupMethod Route - POST
app.post('/trainerSignupMethod', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ name: username });

        if (existingUser) {
            // If the user already exists, handle accordingly
            return res.render('signup', { errorMessage: 'Username already exists. Choose a different username.' });
        }

        // If the user doesn't exist, create and save a new user
        const newUser = new User({
            name: username,
            password: password,
            role: 'Trainer', // set the role here as a string
        });

        await newUser.save();

        // Store username in the session
        req.session.username = username;
        req.session.role = 'Trainer'; // set the role in the session

        // Redirect to the home page after successful signup
        res.redirect('/home');
    } catch (err) {
        console.error('Error during signup:', err);
        res.sendStatus(500);
    }
});


//Trainer Login Route - POST
app.post('/trainerLoginMethod', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ name: username });

        if (!user) {
            // If the user doesn't exist, display a message
            return res.render('trainerlogin', { errorMessage: 'Invalid username or password.' });
        }

        // Check if the password is correct
        if (user.password !== password) {
            // If the password is incorrect, display an error message
            return res.render('trainerlogin', { errorMessage: 'Invalid username or password.' });
        }

        // Set the username and role in the session
        req.session.username = username;
        req.session.role = 'Trainer'; // assuming you have a role field in your user model

        res.redirect('/home');
    } catch (err) {
        console.error('Error during login:', err);
        res.sendStatus(500);
    }
});

//Customer Login Route - POST
app.post('/customerLoginMethod', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ name: username });

        if (!user) {
            // If the user doesn't exist, display a message
            return res.render('customerlogin', { errorMessage: 'Invalid username or password.' });
        } else if (user.password !== password) {
            // If the password is incorrect, display an error message
            return res.render('customerlogin', { errorMessage: 'Invalid username or password.' });
        }

        // Set the username and role in the session
        req.session.username = username;
        req.session.role = 'Customer'; // assuming you have a role field in your user model

        res.redirect('/home');
    } catch (err) {
        console.error('Error during login:', err);
        res.sendStatus(500);
    }
});



// ContactForm Route - POST
app.post('/ContactForm', [
    body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters long').matches(/^[A-Za-z ]+$/).withMessage('Name must contain only letters and spaces'),
    body('phone').matches(/^\d{3}-\d{3}-\d{4}$/).withMessage('Phone number must be in the format xxx-xxx-xxxx'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('petname').trim().isLength({ min: 2, max: 30 }).withMessage('Pet name must be 2-30 characters long').matches(/^[A-Za-z ]+$/).withMessage('Pet name must contain only letters and spaces'),
    body('address').trim().isLength({ min: 5, max: 100 }).withMessage('Address must be 5-100 characters long'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('ContactForm', { errors: errors.array() });
    }
    const { name, phone, email, petname, address } = req.body;
    console.log('Form data:', req.body);
    try {
        // Save the form data to the database
        const newContactForm = new ContactForm({
            name,
            phone,
            email,
            petname,
            address
        });
        await newContactForm.save();
        // Render the "Thank You" page
        res.redirect('/submittedform');
    } catch (err) {
        console.error('Error saving contact form data:', err);
        res.status(500).render('error', { errorMessage: 'Internal Server Error' });
    }
});





// Logout Route - GET
app.get('/logout-success', (req, res) => {
    // Clear the session
    req.session.destroy((err) => {
        if (err) {
            console.error('Error during logout:', err);
            res.sendStatus(500);
        } else {
            // Redirect to the login page or another page
            res.redirect('/');
        }
    });
});

// Products Route - GET
app.get('/Buy', async (req, res) => {
    try {
        // Fetch products from the database based on categories
        const categories = ['Dog Toys', 'Dog Jackets', 'Tennis Balls', 'Dog Food'];
        
        // Fetch products for each category
        const toys = await Product.find({ category: 'Dog Toys' });
        const jackets = await Product.find({ category: 'Dog Jackets' });
        const tennisBalls = await Product.find({ category: 'Tennis Balls' });
        const dogFoods = await Product.find({ category: 'Dog Food' });

        // Render the 'Buy' view with the fetched products
        res.render('Buy', { toys, jackets, tennisBalls, dogFoods });
    } catch (err) {
        console.error('Error fetching products:', err);
        res.sendStatus(500);
    }
});



// Add to Cart Route - POST
app.post('/addToCart', async (req, res) => {
    const productId = req.body.productId;

    try {
        // Fetch the selected product from the database
        const product = await Product.findById(productId);

        // Add the product to the user's cart
        req.session.cart = req.session.cart || [];
        req.session.cart.push(product);

        // Redirect to the products page after adding to cart
        res.redirect('/Buy');
    } catch (err) {
        console.error('Error adding to cart:', err);
        res.sendStatus(500);
    }
});

// Add this route along with other routes
app.post('/submittrainersignup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Create a new Trainer document
        const newTrainer = new Trainer({
            name,
            email,
            password,
            // Add other fields as needed
        });

        // Save the new trainer to MongoDB
        await newTrainer.save();

        // Redirect or respond as needed
        res.redirect('/trainersignupsuccess'); // Redirect to a success page, for example
    } catch (err) {
        console.error('Error during trainer signup:', err);
        res.status(500).render('error', { errorMessage: 'Internal Server Error' });
    }
});


app.get('/logout-success', (req, res) => res.render('logout-success'));

// Cart Route - GET
app.get('/cart', (req, res) => {
    // Retrieve the cart items from the session
    const cartItems = req.session.cart || [];

    // Render the cart page, passing the cart items to the view
    res.render('cart', { cartItems });
});


// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).render('error', { errorMessage: 'Internal Server Error' });
});

// 404 handler (should be after all other routes)
app.use((req, res, next) => {
    res.status(404).render('error', { errorMessage: '404 - Page Not Found' });
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
