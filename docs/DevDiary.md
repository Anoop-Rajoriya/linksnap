# LinkSnap Development Diary

## Initial Setup

### Dir Structure:

```
linksnap/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── urlController.js
│   │   ├── analyticsController.js
│   │   └── adminController.js
│   ├── services/
│   │   ├── authService.js
│   │   ├── urlService.js
│   │   └── analyticsService.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Url.js
│   │   └── Analytics.js
│   ├── routes/
│   │   ├── web/
│   │   │   ├── auth.js
│   │   │   ├── dashboard.js
│   │   │   └── home.js
│   │   └── api/
│   │       ├── auth.js
│   │       ├── urls.js
│   │       └── analytics.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   └── errorHandler.js
│   ├── utils/
│   │   ├── shortCodeGenerator.js
│   │   ├── validators.js
│   │   └── helpers.js
│   └── config/
│       ├── database.js
│       └── environment.js
├── views/
│   ├── layouts/
│   ├── pages/
│   ├── partials/
│   └── errors/
├── public/
│   ├── css/
│   ├── js/
│   └── images/
├── tests/
├── docs/
└── package.json
```

### Installing Dependencies

```json
{
  "bcryptjs": "^3.0.2",
  "dotenv": "^17.2.1",
  "ejs": "^3.1.10",
  "express": "^5.1.0",
  "express-flash": "^0.0.2",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.17.1",
  "morgan": "^1.10.1"
}
```

### Database Models

#### Users Collection

```js
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed, required),
  username: String (unique),
  createdAt: Date,
  isActive: Boolean,
  role: String (default: 'user')
}
```

#### Urls Collection

```js
{
  _id: ObjectId,
  originalUrl: String (required),
  shortCode: String (unique, required, index),
  customCode: Boolean (default: false),
  title: String,
  description: String,
  userId: ObjectId (ref: 'User'),
  clickCount: Number (default: 0),
  isActive: Boolean (default: true),
  expiresAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

#### Analytics Collection

```js
{
  _id: ObjectId,
  urlId: ObjectId (ref: 'URL'),
  clickedAt: Date,
  ipAddress: String,
  userAgent: String,
  referrer: String,
  country: String,
  city: String,
  browser: String,
  os: String,
  device: String
}
```
