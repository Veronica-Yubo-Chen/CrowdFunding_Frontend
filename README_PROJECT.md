# FundRaizr - Crowdfunding Platform Frontend

A modern, responsive crowdfunding platform built with React and Vite. FundRaizr allows users to create fundraisers, make pledges, and support amazing projects.

## Features

### Core Functionality
- ✅ **User Authentication**: Register, login, and logout with token-based authentication
- ✅ **Fundraiser Management**: Create, view, update, and delete fundraisers
- ✅ **Pledge System**: Support fundraisers with pledges (anonymous or public)
- ✅ **User Profiles**: View personal fundraisers and pledges
- ✅ **Responsive Design**: Mobile-first design that works on all devices
- ✅ **Error Handling**: Custom 404 page and error boundaries
- ✅ **Protected Routes**: Authentication-based access control

### User Features
- User accounts with username, email, and password
- Create fundraisers with title, description, goal, and image
- View fundraiser progress with visual progress bars
- Make pledges with optional comments and anonymous option
- Track all personal fundraisers and pledges in profile
- Update fundraiser details (owners only)
- Delete fundraisers (owners only)

## Tech Stack

- **React 19** - UI framework
- **React Router DOM** - Client-side routing
- **Vite** - Build tool and dev server
- **CSS3** - Styling with responsive design
- **Context API** - State management for authentication

## Project Structure

```
crowdfunding-frontend/
├── public/              # Static assets
├── src/
│   ├── api/            # API service functions
│   ├── assets/         # Images and media
│   ├── components/     # Reusable components
│   │   ├── ErrorBoundary.jsx
│   │   ├── FundraiserCard.jsx
│   │   ├── NavBar.jsx
│   │   └── PledgeForm.jsx
│   ├── contexts/       # React Context providers
│   │   └── AuthContext.jsx
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── CreateFundraiserPage.jsx
│   │   ├── FundraiserDetailPage.jsx
│   │   ├── UserProfilePage.jsx
│   │   └── NotFoundPage.jsx
│   ├── utils/          # Utility functions
│   │   └── api.js
│   ├── index.css       # Global styles
│   └── main.jsx        # App entry point
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API server (Django REST Framework)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd crowdfunding-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure API endpoint:
   
   Open `src/utils/api.js` and update the `API_URL` constant:
   ```javascript
   // TODO: Update this URL once backend is deployed to Heroku
   const API_URL = 'https://your-backend-url.herokuapp.com';
   ```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## API Integration

### Required Backend Endpoints

The frontend expects the following API endpoints:

**Authentication:**
- `POST /api-token-auth/` - Login and get token
- `POST /users/` - Register new user

**Fundraisers:**
- `GET /fundraisers/` - List all fundraisers
- `GET /fundraisers/:id/` - Get fundraiser details
- `POST /fundraisers/` - Create fundraiser (auth required)
- `PUT /fundraisers/:id/` - Update fundraiser (owner only)
- `DELETE /fundraisers/:id/` - Delete fundraiser (owner only)

**Pledges:**
- `GET /pledges/` - List pledges
- `POST /pledges/` - Create pledge (auth required)

**User Profile:**
- `GET /fundraisers/?owner=me` - Get user's fundraisers
- `GET /pledges/?supporter=me` - Get user's pledges

### API Configuration

All API calls use token authentication. The auth token is stored in localStorage and automatically included in request headers.

To update the API URL after backend deployment:
1. Open `src/utils/api.js`
2. Replace the `API_URL` constant with your Heroku backend URL
3. Remove the TODO comment

## Features Implementation

### Authentication
- Token-based authentication using JWT/Token
- Persistent login state using localStorage
- Protected routes for authenticated users
- Automatic token inclusion in API requests

### Fundraiser Management
- Create fundraisers with validation
- Upload images via URL
- Open/close fundraisers to pledges
- Real-time progress tracking
- Owner-only edit and delete permissions

### Pledge System
- Amount validation
- Optional comments
- Anonymous pledge option
- Pledge history tracking

### Responsive Design
- Mobile-first approach
- Breakpoints: 480px, 768px, 1024px
- Touch-friendly UI elements
- Optimized navigation for mobile

## Project Requirements Checklist

- ✅ Separated frontend (React) and backend (Django)
- ✅ Project name: FundRaizr (missing vowel ✓)
- ✅ Clear target audience: Anyone wanting to crowdfund projects
- ✅ User accounts (username, email, password)
- ✅ Create fundraisers with all required attributes
- ✅ Pledge functionality with all required attributes
- ✅ Update/delete functionality with proper permissions
- ✅ Suitable permissions (owner checks)
- ✅ Token authentication
- ✅ Custom 404 page
- ✅ Error boundaries for graceful error handling
- ✅ Responsive design

## Future Enhancements

- [ ] Image upload to cloud storage
- [ ] Payment integration (Stripe/PayPal)
- [ ] Social sharing features
- [ ] Search and filter fundraisers
- [ ] Categories and tags
- [ ] Email notifications
- [ ] Real-time updates with WebSockets
- [ ] User avatars
- [ ] Fundraiser comments
- [ ] Admin dashboard

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is created as part of a coding bootcamp project.

## Acknowledgments

- She Codes Plus
- React documentation
- Vite documentation
- React Router documentation
