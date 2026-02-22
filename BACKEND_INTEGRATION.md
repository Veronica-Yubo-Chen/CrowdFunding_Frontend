# Backend Integration Guide

## Quick Setup

Once your Django backend is deployed to Heroku, follow these steps:

### 1. Update API URL

Open `src/utils/api.js` and replace line 2:

```javascript
// FROM:
const API_URL = 'http://localhost:8000/api';

// TO:
const API_URL = 'https://your-app-name.herokuapp.com';
```

### 2. Required Backend API Endpoints

Your Django backend must expose these endpoints:

#### Authentication
```
POST /api-token-auth/
  Body: { "username": "...", "password": "..." }
  Response: { "token": "...", "user": { "id": 1, "username": "...", "email": "..." } }

POST /users/
  Body: { "username": "...", "email": "...", "password": "..." }
  Response: { "id": 1, "username": "...", "email": "..." }
```

#### Fundraisers
```
GET /fundraisers/
  Response: [{ "id": 1, "title": "...", "description": "...", "goal": 1000, 
               "image": "...", "is_open": true, "date_created": "...",
               "owner": 1, "owner_username": "...", "pledges": [...] }]

GET /fundraisers/:id/
  Response: { "id": 1, ... (same as above) }

POST /fundraisers/
  Headers: { "Authorization": "Token ..." }
  Body: { "title": "...", "description": "...", "goal": 1000, 
          "image": "...", "is_open": true }
  Response: { "id": 1, ... }

PUT /fundraisers/:id/
  Headers: { "Authorization": "Token ..." }
  Body: { "title": "...", "description": "...", "goal": 1000, "is_open": true }
  Response: { "id": 1, ... }

DELETE /fundraisers/:id/
  Headers: { "Authorization": "Token ..." }
  Response: 204 No Content
```

#### Pledges
```
GET /pledges/
  Response: [{ "id": 1, "amount": 100, "comment": "...", "anonymous": false,
               "supporter": 1, "supporter_username": "...", 
               "fundraiser": 1, "fundraiser_title": "...",
               "date_created": "..." }]

POST /pledges/
  Headers: { "Authorization": "Token ..." }
  Body: { "amount": 100, "comment": "...", "anonymous": false, "fundraiser": 1 }
  Response: { "id": 1, ... }

GET /pledges/?supporter=me
  Headers: { "Authorization": "Token ..." }
  Response: [{ ... user's pledges ... }]

GET /fundraisers/?owner=me
  Headers: { "Authorization": "Token ..." }
  Response: [{ ... user's fundraisers ... }]
```

### 3. CORS Configuration

Your Django backend must allow requests from your frontend domain.

In Django `settings.py`:

```python
INSTALLED_APPS = [
    ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    ...
]

# For development:
CORS_ALLOW_ALL_ORIGINS = True

# For production:
CORS_ALLOWED_ORIGINS = [
    "https://your-frontend-domain.com",
]
```

### 4. Token Authentication

Ensure Django REST Framework is configured for token auth:

```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
}
```

### 5. Test the Connection

After updating the API URL:

1. Start your frontend: `npm run dev`
2. Try to register a new user
3. Try to login
4. Try to create a fundraiser
5. Try to make a pledge

### 6. Common Issues

**Issue: CORS errors**
- Solution: Check CORS configuration in Django
- Make sure `django-cors-headers` is installed

**Issue: 401 Unauthorized**
- Solution: Check token is being sent in headers
- Verify token authentication is enabled in Django

**Issue: 404 Not Found**
- Solution: Verify API URL is correct
- Check Django URL patterns match expected endpoints

**Issue: Network Error**
- Solution: Verify Heroku app is running
- Check Heroku logs: `heroku logs --tail`

### 7. Environment Variables (Optional)

For better configuration management, you can use environment variables:

Create `.env` file:
```
VITE_API_URL=https://your-app-name.herokuapp.com
```

Update `src/utils/api.js`:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
```

Add `.env` to `.gitignore`:
```
.env
```

### 8. Deployment

Build for production:
```bash
npm run build
```

Deploy `dist` folder to:
- Netlify
- Vercel
- GitHub Pages
- Heroku (with static server)

---

## Testing Checklist

- [ ] User registration works
- [ ] User login works
- [ ] Token is stored in localStorage
- [ ] Protected routes redirect to login
- [ ] Can create fundraiser
- [ ] Can view fundraiser details
- [ ] Can edit own fundraiser
- [ ] Cannot edit others' fundraisers
- [ ] Can delete own fundraiser
- [ ] Can make pledge
- [ ] Anonymous pledges work
- [ ] User profile shows data
- [ ] Logout clears token
- [ ] 404 page works
- [ ] Responsive on mobile

---

**Ready to connect! Just update the API_URL and you're good to go! 🚀**
