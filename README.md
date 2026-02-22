# Glwup - Beauty Product Crowdfunding Platform

A beautiful, modern crowdfunding platform built with React + Vite (frontend) and Django REST Framework (backend). Glwup enables beauty enthusiasts to crowdfund product reviews and comparisons.

## 🎨 Project Overview

**Glwup** is a complete crowdfunding solution where:
- Users can create fundraisers to review beauty products
- Community members pledge support with optional anonymity
- Campaigns close automatically when funding goals are reached
- Beautiful, responsive UI with purple-pink branding

## 🚀 Live Deployment

| Component | URL | Platform |
|-----------|-----|----------|
| **Frontend** | https://magnificent-meringue-d639f5.netlify.app | Netlify |
| **Backend API** | https://yubo-crowdfunding-shecodes-f2aced9e5879.herokuapp.com | Heroku |

Both services have auto-deploy enabled on git push for continuous deployment.

## 📱 Screenshots

> **Note:** Screenshot image files will be added to the `/screenshots` folder once Netlify deployment credit is available. The following sections document the 3 screenshots that have been captured.

### 1. Homepage - Fundraiser Grid
**Description:** The Glwup homepage showcasing the main landing page with hero section and fundraiser cards grid.

**Features visible:**
- Purple-pink gradient hero section with "Glwup" branding
- Fundraiser cards displayed in responsive grid
- Progress bars showing funding status for each campaign
- Campaign status badges (Open/Closed)
- Navigation bar with Login/Register links

**Screenshot location:** `./screenshots/1-homepage.png` *(to be added)*

---

### 2. Create Campaign - Form
**Description:** The campaign creation form that authenticated users access to launch a new fundraiser.

**Features visible:**
- Form title: "🌟 Launch Your Beauty Campaign"
- Input fields for:
  - Campaign Title
  - Campaign Details (description)
  - Funding Goal ($)
  - Campaign Image URL
  - Open campaign checkbox
- Purple-pink gradient submit button
- Error message handling

**Screenshot location:** `./screenshots/2-create-campaign-form.png` *(to be added)*

---

### 3. Campaign Details - With Pledges
**Description:** The campaign detail page showing a created fundraiser with pledges and pledge form.

**Features visible:**
- Campaign title and full description
- Campaign image/banner
- Purple-pink progress bar showing funding status
- Total pledged vs. goal amount
- Pledge list showing supporter contributions
- Pledge amounts, comments, and pledge dates
- "Submit Pledge" button and form
- Campaign status and owner information

**Screenshot location:** `./screenshots/3-campaign-detail.png` *(to be added)*

---

### Additional Screenshots (Coming Soon)

Once Netlify deployment credit is restored, the following screenshots will be added:

- **Login Form** - Authentication page with styled inputs and Glwup branding
- **Unauthorized Edit Attempt** (optional) - Permission error displayed to non-owners

---

## 📸 How to Add Screenshots

When screenshots are available, follow these steps:

1. Create a `/screenshots` folder in the repository root
2. Add screenshot image files with descriptive names:
   - `1-homepage.png`
   - `2-create-campaign-form.png`
   - `3-campaign-detail.png`
3. Update the image paths in this README
4. Commit and push to GitHub

```bash
git add screenshots/
git commit -m "Add project screenshots"
git push origin main
```

## ✨ Features

### Core Features (All 22 She Codes Plus Requirements)
- ✅ Separated frontend (React) and backend (Django REST Framework)
- ✅ User authentication with token-based system
- ✅ Create, read, update, delete fundraisers (CRUD)
- ✅ Create, read, update, delete pledges (CRUD)
- ✅ Permission-based access control
- ✅ Responsive mobile-first design
- ✅ Custom 404 page and error handling
- ✅ Proper HTTP status codes (200, 201, 204, 400, 403, 404)

### Extra Features
- 🎨 **Glwup Branding** - Purple-pink gradient color scheme throughout
- 📊 **Campaign Status Indicators** - Visual progress bars and funding status
- 👤 **Anonymous Pledges** - Supporters can choose to remain anonymous
- 🔒 **Duplicate Pledge Prevention** - One pledge per user per campaign
- ⏰ **Deadline Support** - Campaigns can have optional funding deadlines
- 🏷️ **Category Filtering** - Filter campaigns by beauty category
- 🔍 **Search Functionality** - Search fundraisers by title or description
- 📈 **Calculated Fields** - Server-side calculations for funding metrics

## 🏗️ Project Structure

### Frontend (React + Vite)
```
src/
├── pages/              # Page components
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── CreateFundraiserPage.jsx
│   ├── FundraiserDetailPage.jsx
│   ├── UserProfilePage.jsx
│   └── NotFoundPage.jsx
├── components/         # Reusable components
│   ├── NavBar.jsx
│   ├── FundraiserCard.jsx
│   ├── PledgeForm.jsx
│   ├── AuthProvider.jsx
│   └── ErrorBoundary.jsx
├── hooks/              # Custom React hooks
│   ├── use-auth.js
│   └── use-fundraisers.js
├── contexts/           # React Context
│   └── AuthContext.jsx
├── utils/              # Utility functions
│   └── api.js          # API call wrapper with token injection
└── index.css           # Global styles
```

### Backend (Django REST Framework)
```
crowdfunding/
├── fundraisers/        # Fundraiser & Pledge models
│   ├── models.py
│   ├── views.py        # API views
│   ├── serializers.py  # Data serialization
│   └── urls.py         # URL routing
├── users/              # User management
│   ├── models.py       # Custom user model
│   ├── views.py        # Auth & user endpoints
│   ├── serializers.py  # User serialization
│   └── urls.py         # User routes
└── crowdfunding/       # Project config
    ├── settings.py     # Django settings
    ├── urls.py         # API root & routing
    └── wsgi.py         # Heroku deployment
```

## 🔌 API Endpoints (13 Total)

### Authentication
```
POST /api-token-auth/              # Login (returns token + user info)
```

### Users
```
GET    /users/                     # List all users
POST   /users/                     # Register new user
GET    /users/:id/                 # Get user details
PUT    /users/:id/                 # Update user (self only)
DELETE /users/:id/                 # Delete user (self only)
GET    /users/me/                  # Get current user
```

### Fundraisers
```
GET    /fundraisers/               # List fundraisers (search, filter)
POST   /fundraisers/               # Create fundraiser (auth required)
GET    /fundraisers/:id/           # Get fundraiser details
PUT    /fundraisers/:id/           # Update fundraiser (owner only)
DELETE /fundraisers/:id/           # Delete fundraiser (owner only)
```

### Pledges
```
GET    /pledges/                   # List pledges
POST   /pledges/                   # Create pledge (auth required)
GET    /pledges/:id/               # Get pledge details
PUT    /pledges/:id/               # Update pledge (supporter only)
DELETE /pledges/:id/               # Delete pledge (supporter only)
```

## 🎨 Design

### Color Scheme
- **Primary Purple**: #9b59b6
- **Secondary Pink**: #c44569
- **Gradient**: linear-gradient(135deg, #9b59b6 0%, #c44569 100%)

Applied to:
- Hero sections
- Buttons and interactive elements
- Links and hover states
- Progress bar fills
- Form focus states

### Responsive Breakpoints
- **Mobile** (320-480px) - Single column, simplified navigation
- **Tablet** (768px) - Two column layout
- **Desktop** (1024px+) - Full multi-column grid

## 🔐 Security Features

- ✅ Token-based authentication
- ✅ Password hashing via Django's `create_user()`
- ✅ Permission classes (IsOwnerOrReadOnly, IsSupporterOrReadOnly)
- ✅ CORS configuration for Netlify frontend
- ✅ Write-only password serialization
- ✅ User self-edit enforcement (403 for unauthorized access)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+) for frontend
- Python 3.10+ for backend
- npm or yarn for package management

### Frontend Setup
```bash
cd crowdfunding-frontend/CrowdFunding_Frontend
npm install
npm run dev        # Start development server
npm run build      # Production build
```

### Backend Setup
```bash
cd CrowdFunding_Backend/crowdfunding
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r ../requirements.txt
python manage.py migrate
python manage.py runserver
```

## 📋 Requirements Checklist

All 22 She Codes Plus requirements completed:

- [x] Separate frontend (React) and backend (Django REST Framework)
- [x] Cool project name (Glwup - missing vowels)
- [x] Clear target audience (beauty enthusiasts)
- [x] User accounts (username, email, password)
- [x] Fundraiser creation with all attributes
- [x] Pledge system with all attributes
- [x] Update/delete functionality
- [x] Suitable permissions
- [x] Proper HTTP status codes
- [x] Graceful error handling
- [x] Token authentication
- [x] Responsive design

## 🔗 GitHub Repositories

- **Frontend**: https://github.com/Veronica-Yubo-Chen/crowdfunding-frontend
- **Backend**: https://github.com/Veronica-Yubo-Chen/CrowdFunding_Backend

## 📚 Technologies Used

### Frontend
- React 19
- Vite (build tool)
- React Router DOM (navigation)
- Context API (state management)
- CSS3 (styling with media queries)

### Backend
- Django 5.1
- Django REST Framework
- Token Authentication
- PostgreSQL (production)
- SQLite (development)

### Deployment
- Netlify (frontend)
- Heroku (backend)

## 👥 Author

Created by: Veronica Yubo Chen
Program: She Codes Plus
