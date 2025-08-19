# LinkSnap – URL Shortening Service

A clean and scalable Node.js service for shortening, redirecting, and managing URLs. Supports web (EJS) and API interfaces with authentication, analytics, and admin controls.

---

## 1: Features

### URL Shortening & Redirection

- **Public Shortening:** Anyone can create a short URL (expires in 2 days).
- **User Shortening:** Authenticated users can add extra metadata: `title`, `isActive` flag, and custom `expiresAt`.
- **Redirection:** Visiting a short URL instantly redirects to the original long URL.

### Analytics System

- **Public Access:** Limited analytics (e.g., total clicks) visible to everyone.
- **User Access:** Authenticated users can view detailed analytics **only for their own URLs**.
- **Admin Access:** Admins have full analytics visibility across the system.

### Authentication & Authorization

- Users can **register** and **login**.
- JWT tokens are used for secure session management.
- Role‑based access:

  - **User:** Manage own URLs & account.
  - **Admin:** Manage all users and URLs.

### URLs & Account Management

- Users can **Create, Edit, Delete, Toggle active/inactive** for their URLs.
- Users can view and edit account details, reset password.

### Admin Controls

- Admin can **manage all URLs** in the system.
- Admin can **manage users** (suspend/activate accounts).
- Admin has access to **system-wide analytics**.

---

## 2: Endpoints (Web Routes)

- `GET /` → Home (public), User Dashboard (auth), Admin Dashboard (admin).
- `GET /analytics` → Public (limited), User (own URLs), Admin (all URLs).
- `GET /analytics/:shortCode` → Specific URL analytics.
- `GET /register` → Register page (public).
- `GET /login` → Login page (public).
- `GET /account` → Account management (authenticated).

---

## 3: API Endpoints (v1)

### Auth

- `POST /api/v1/auth/register` → Register a new user.
- `POST /api/v1/auth/login` → Login, returns JWT.

### URL Management

- `POST /api/v1/urls` → Create short URL (public: 2‑day expiry, users: custom expiry/title).
- `GET /api/v1/urls/:code` → Expand URL (meta only, not redirect).
- `PATCH /api/v1/urls/:code` → Update (auth only).
- `DELETE /api/v1/urls/:code` → Delete (auth only).
- `PATCH /api/v1/urls/:code/toggle` → Toggle `isActive` (auth only).

### Redirection

- `GET /:code` → Redirect handler.

### Analytics

- `GET /api/v1/urls/:code/analytics` → Analytics for URL (role‑based access).
- `GET /api/v1/analytics` → System analytics (admin only).

### Account

- `GET /api/v1/users/me` → Get account details.
- `PATCH /api/v1/users/me` → Update profile.
- `POST /api/v1/users/reset-password` → Reset password.

### Admin

- `GET /api/v1/admin/users` → List all users.
- `PATCH /api/v1/admin/users/:id` → Update user (role, status).
- `DELETE /api/v1/admin/users/:id` → Delete user.

---

## 4: Directory Structure (Improved)

```
.
├─ src/
│  ├─ app.js
│  ├─ server.js
│  ├─ config/
│  │  └─ db.js
│  ├─ controllers/
│  │  ├─ urlController.js       # handles both web + api
│  │  ├─ userController.js      # includes auth logic
│  │  └─ adminController.js
│  ├─ services/
│  │  ├─ url.service.js
│  │  ├─ user.service.js
│  │  └─ admin.service.js
│  ├─ models/
│  │  ├─ Url.js
│  │  ├─ User.js
│  │  └─ Analytics.js (optional, for detailed tracking)
│  ├─ middlewares/
│  │  ├─ asyncHandler.js
│  │  ├─ errorHandler.js
│  │  ├─ auth.js (JWT verification + role check)
│  │  └─ validateUrlOrCode.js
│  ├─ routes.urls.js     # all URL routes (web + api)
│  ├─ routes.users.js    # user routes (web + api)
│  ├─ routes.admin.js    # admin routes (web + api)
│  └─ utils/
│     ├─ id.js
│     └─ response.js
├─ views/
│  ├─ layout.ejs
│  ├─ home.ejs
│  ├─ dashboard.ejs
│  ├─ analytics.ejs
│  ├─ login.ejs
│  └─ register.ejs
├─ public/
│  ├─ css/
│  └─ js/
├─ .env
├─ package.json
└─ README.md
```

---

## 5: Security Notes

- JWT + Role-based authorization.
- Password hashing with bcrypt.
- Rate limiting for URL creation.
- URL validation + safety checks.
- Helmet middleware for secure headers.

---

## 6: Roles Summary

- **Public:** Can shorten (2‑day expiry), view limited analytics.
- **User:** Full URL CRUD + metadata, account management, own analytics.
- **Admin:** Full system control: users, all URLs, system analytics.

---

## 7: Future Extensions

- QR code generation.
- Custom domains.
- Teams/organizations.
- Webhooks for analytics events.
- API key system for programmatic access.
