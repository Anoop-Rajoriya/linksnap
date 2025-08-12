# LinkSnap - URL Shortening Service Project

Welcome to your backend mentorship project! I'm assigning you **LinkSnap**, a comprehensive URL shortening service that will help you master Node.js, Express, EJS templating, and MongoDB with Mongoose.

## 🎯 Project Overview
Build a full-featured URL shortening service similar to bit.ly or tinyurl.com, where users can shorten long URLs, track analytics, and manage their links.

## 📋 Core Features to Implement

### Phase 1: Basic Functionality
1. **URL Shortening**
   - Accept long URLs and generate short codes
   - Validate URL format
   - Store mappings in MongoDB
   - Redirect short URLs to original URLs

2. **Basic Analytics**
   - Track click count for each shortened URL
   - Record timestamp of each click
   - Display basic stats on dashboard

### Phase 2: User Management
3. **User Authentication**
   - User registration and login
   - Session management
   - Password hashing
   - Logout functionality

4. **User Dashboard**
   - View all user's shortened URLs
   - Edit/delete own URLs
   - Personal analytics overview

### Phase 3: Advanced Features
5. **Custom Short Codes**
   - Allow users to specify custom short codes
   - Validate uniqueness
   - Handle conflicts gracefully

6. **Enhanced Analytics**
   - Track referrer information
   - Record user agent/browser data
   - Geographic location (IP-based)
   - Time-based analytics (daily/weekly/monthly views)

7. **Link Management**
   - Set expiration dates for URLs
   - Enable/disable links
   - Bulk operations
   - Search and filter functionality

## 🛠 Technical Requirements

### Database Schema Design
Plan your MongoDB collections for:
- Users
- URLs/Links
- Analytics/Clicks
- Sessions (if not using express-session store)

### Required Endpoints

#### Public Routes
- `GET /` - Homepage with URL shortening form
- `GET /:shortCode` - Redirect to original URL
- `GET /stats/:shortCode` - Public stats page (optional)

#### Authentication Routes
- `GET /auth/register` - Registration page
- `POST /auth/register` - Handle registration
- `GET /auth/login` - Login page
- `POST /auth/login` - Handle login
- `POST /auth/logout` - Handle logout

#### Protected Routes (Require Authentication)
- `GET /dashboard` - User dashboard
- `POST /api/shorten` - Create shortened URL
- `GET /api/urls` - Get user's URLs
- `PUT /api/urls/:id` - Update URL
- `DELETE /api/urls/:id` - Delete URL
- `GET /api/analytics/:id` - Get detailed analytics

#### Admin Routes (Bonus)
- `GET /admin` - Admin dashboard
- `GET /admin/users` - Manage users
- `GET /admin/urls` - Manage all URLs

## 🎨 Frontend Pages (EJS Templates)
- Homepage/Landing page
- User registration page
- User login page  
- User dashboard
- Analytics/stats page
- Error pages (404, 500)

## 🔧 Technical Specifications

### Middleware Requirements
- Body parsing
- Session management
- Authentication middleware
- Error handling
- Request logging
- Rate limiting (bonus)

### Validation & Security
- Input sanitization
- URL validation
- SQL injection prevention (NoSQL injection)
- XSS protection
- CSRF protection
- Password strength requirements

### Performance Considerations
- Database indexing strategy
- Caching frequently accessed URLs
- Pagination for large datasets
- Efficient query design

## 📊 Success Metrics
By project completion, you should be able to:
- Handle 1000+ URLs efficiently
- Implement proper error handling
- Create responsive, user-friendly interfaces
- Demonstrate understanding of RESTful APIs
- Show proficiency in database design
- Implement security best practices

## 🚀 Getting Started Steps
1. Set up your project structure
2. Initialize npm and install dependencies
3. Set up MongoDB connection
4. Create your basic Express server
5. Design your database schemas
6. Start with the homepage and basic URL shortening

## 📝 Deliverables
- Fully functional web application
- Clean, organized code structure
- Documentation (README.md)
- Database schema documentation
- API documentation
- Deployment instructions

---

This project will take you through real-world backend development challenges. Start with Phase 1 and gradually build up the features. Remember, I'm here to guide you when you get stuck - just ask specific questions about the concepts or approaches you're unsure about!

Which phase would you like to start with, and do you have any questions about the project scope or requirements?