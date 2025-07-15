# TrainWithTail

TrainWithTail is a full-stack web application for pet training management, built with Express.js, MongoDB, and EJS. It features modularized routes, controllers, and models for maintainability, and includes robust form validation, authentication, and security best practices.

## Features
- User authentication (signup, login, session management)
- Role-based access control (admin, trainer, pet parent)
- Contact form with client-side and server-side validation
- Product catalog and cart functionality
- Behavioral analysis and progress tracking
- Flash messages for user feedback
- Custom error pages (404, 500)
- Secure session cookies and environment variable validation
- Modular code structure (routes, controllers, models)
- Ready for deployment (Dockerfile/Procfile support)

## Project Structure
```
TrainWithTail/
  app.js
  models/
  controllers/
  routes/
  views/
  public/
  README.md
  package.json
  .env (not committed)
```

## Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB instance (local or cloud)

### Setup
1. Clone the repository:
   ```
   git clone https://github.com/adityajanjanam/TrainWithTail.git
   cd TrainWithTail
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the project root:
   ```
   SESSION_SECRET=your_secret_key_here
   MONGO_URI=your_mongodb_connection_string_here
   ```
4. Start the application:
   ```
   npm start
   ```
5. Open your browser and go to [http://localhost:5000](http://localhost:5000)

## Recent Enhancements
- Modularized codebase (routes, controllers, models)
- Added express-validator for robust form validation
- Improved session security and environment variable checks
- Custom error handling and user-friendly error pages
- Flash messages for user feedback

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)

## Contact

**Aditya Janjanam**  
[LinkedIn](https://www.linkedin.com/in/adityajanjanam/)  
[Portfolio](https://adityajanjanam.com)

Feel free to reach out for collaboration, questions, or feedback!
