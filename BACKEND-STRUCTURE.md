# Backend Structure for Azure Haven Hotel

This document outlines the proposed backend architecture to extend the static website into a full-stack application with dynamic functionalities like user authentication, booking management, and email notifications.

## Technology Stack

- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: Nodemailer
- **File Upload**: Multer (for image uploads if needed)
- **Validation**: Joi or express-validator
- **Security**: Helmet, CORS, bcrypt for password hashing

## Project Structure

```
backend/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookingController.js
│   │   ├── contactController.js
│   │   └── roomController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Booking.js
│   │   ├── Contact.js
│   │   └── Room.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── bookings.js
│   │   ├── contacts.js
│   │   └── rooms.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── upload.js
│   ├── config/
│   │   ├── database.js
│   │   └── email.js
│   ├── utils/
│   │   ├── jwt.js
│   │   └── validation.js
│   └── app.js
├── tests/
├── .env
├── package.json
└── server.js
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Bookings
- `GET /api/bookings` - Get all bookings (admin)
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:id` - Get booking by ID
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking

### Contacts
- `GET /api/contacts` - Get all contact messages (admin)
- `POST /api/contacts` - Send contact message
- `DELETE /api/contacts/:id` - Delete contact message

### Rooms
- `GET /api/rooms` - Get all rooms
- `POST /api/rooms` - Create new room (admin)
- `GET /api/rooms/:id` - Get room by ID
- `PUT /api/rooms/:id` - Update room (admin)
- `DELETE /api/rooms/:id` - Delete room (admin)

## Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: 'user', 'admin'),
  createdAt: Date
}
```

### Booking Model
```javascript
{
  user: ObjectId (ref: 'User'),
  room: ObjectId (ref: 'Room'),
  checkIn: Date,
  checkOut: Date,
  guests: Number,
  totalPrice: Number,
  status: String (enum: 'pending', 'confirmed', 'cancelled'),
  createdAt: Date
}
```

### Contact Model
```javascript
{
  name: String,
  email: String,
  message: String,
  createdAt: Date
}
```

### Room Model
```javascript
{
  name: String,
  description: String,
  price: Number,
  images: [String],
  amenities: [String],
  capacity: Number,
  available: Boolean,
  createdAt: Date
}
```

## Implementation Steps

1. **Setup Project**
   - Initialize Node.js project
   - Install dependencies
   - Setup environment variables

2. **Database Connection**
   - Connect to MongoDB
   - Create Mongoose models

3. **Authentication System**
   - Implement JWT authentication
   - Create login/register endpoints
   - Add middleware for protected routes

4. **Booking System**
   - Create booking CRUD operations
   - Implement availability checking
   - Add email notifications for bookings

5. **Contact System**
   - Create contact message handling
   - Implement email sending for inquiries

6. **Room Management**
   - Create room CRUD operations
   - Implement image upload functionality

7. **Frontend Integration**
   - Update JavaScript to make API calls
   - Replace form submissions with AJAX requests
   - Add loading states and error handling

8. **Deployment**
   - Deploy backend to Heroku, DigitalOcean, or AWS
   - Setup production database
   - Configure environment variables

## Security Considerations

- Input validation and sanitization
- Rate limiting for API endpoints
- CORS configuration
- Secure password hashing
- JWT token expiration
- HTTPS enforcement

## Additional Features

- **Admin Dashboard**: Interface for managing bookings, rooms, and users
- **Payment Integration**: Stripe or PayPal for booking payments
- **Real-time Notifications**: Socket.io for booking confirmations
- **Review System**: Allow guests to leave reviews
- **Calendar Integration**: Sync with external calendars

## Testing

- Unit tests for controllers and models
- Integration tests for API endpoints
- End-to-end tests with tools like Cypress

This backend structure provides a solid foundation for expanding the hotel website into a fully functional booking platform.