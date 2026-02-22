![The She Codes Logo](../../global_images/logo.png)

# React Project: Crowdfunding App (Part 2)<br><sub><sup><sub>Due: Last Sunday of the module at 11:59pm.</sub></sup></sub>

## Project Description
Kickstarter, Go Fund Me, Kiva, Change.org, Patreon… All of these different websites have something in common: they provide a platform for people to create fundraisers that they believe in, but they all have a slightly different approach. You are going to create your own crowdfunding website (this time the front-end), and put your own spin on it!

## Project Requirements ✅ ALL COMPLETED

Here's a reminder of the required features. Your crowdfunding project must:

- [x] **Be separated into two distinct projects**: an API built using the Django Rest Framework and a website built using React. 
  - Backend: `CrowdFunding_Backend` - Django 5.1 REST Framework with PostgreSQL on Heroku
  - Frontend: `crowdfunding-frontend` - React 19 with Vite on Netlify
  - Complete API-based architecture with 13 endpoints
  - **Deployment URLs:**
    - Backend: https://yubo-crowdfunding-shecodes-f2aced9e5879.herokuapp.com
    - Frontend: https://magnificent-meringue-d639f5.netlify.app

- [x] **Have a cool name**: **Glwup** - Beauty product crowdfunding platform
  - Missing vowels: G-l-w-p ✓ (Bonus points achieved!)
  - Domain: Beauty enthusiasts crowdfunding product reviews
  - Branding: Purple-pink gradient (#9b59b6 to #c44569) applied throughout

- [x] **Have a clear target audience**: Beauty enthusiasts and product testers
  - Target: People who want to fund beauty product reviews and comparisons
  - Beauty-specific features: `category` and `product_link` fields
  - Use case: Fund product testing campaigns, establish credibility in beauty niche

- [x] **Have user accounts** with all required attributes:
  - [x] Username - Custom Django user model with username field
  - [x] Email address - AbstractUser email, returned in token auth response
  - [x] Password - Hashed via `create_user()`, write_only in serializers for security

- [x] **Ability to create a "fundraiser"** with all required attributes:
  - [x] Title - CharField(max_length=200), displayed in cards and detail pages
  - [x] Owner - ForeignKey to User, auto-set on creation, enforced in updates
  - [x] Description - TextField, shown truncated in cards and full in detail view
  - [x] Image - URLField, displayed as img src in fundraiser cards
  - [x] Target amount to raise - IntegerField `goal`, used in progress bar calculations
  - [x] Whether it is currently open - BooleanField `is_open`, controls pledge acceptance
  - [x] When the fundraiser was created - DateTimeField `date_created` with auto_now_add=True

- [x] **Ability to "pledge" to a fundraiser** with all required attributes:
  - [x] An amount - IntegerField, validated > $0 at both model and serializer levels
  - [x] The fundraiser the pledge is for - ForeignKey to Fundraiser
  - [x] The supporter/user - ForeignKey to User, enforced in permission checks
  - [x] Whether the pledge is anonymous - BooleanField `anonymous` with checkbox input
  - [x] A comment - CharField(max_length=200), optional textarea in form

- [x] **Implement suitable update/delete functionality**:
  - [x] Fundraiser owners can update descriptions, goals, and status (PUT endpoint)
  - [x] Only fundraiser owners can delete campaigns (DELETE returns 204)
  - [x] Users can update their own profiles (other users get 403 Forbidden)
  - [x] Users can delete their own accounts (other users get 403 Forbidden)
  - [x] Pledge supporters can update pledges with campaign validation (IsSupporterOrReadOnly)
  - [x] Permissions enforced via custom classes: `IsOwnerOrReadOnly`, `IsSupporterOrReadOnly`

- [x] **Implement suitable permissions**:
  - [x] Duplicate pledge prevention: `unique_together = ('fundraiser', 'supporter')` in model
  - [x] Campaign closure on goal achievement: `can_accept_pledges()` method checks funding
  - [x] Optional deadline enforcement: Pledges blocked after deadline expires
  - [x] 403 responses for unauthorized edits/deletes
  - [x] User self-edit/delete: Endpoint checks if request.user.id == user.id

- [x] **Return the relevant status codes** for API requests:
  - [x] 200 OK - Successful GET requests
  - [x] 201 Created - Successful POST requests (fundraisers, pledges, users)
  - [x] 204 No Content - Successful DELETE requests
  - [x] 400 Bad Request - Validation errors (amount validation, duplicates, mismatched passwords)
  - [x] 403 Forbidden - Permission denied (non-owner edits, self-edit enforcement)
  - [x] 404 Not Found - Resource not found with custom JSON handler

- [x] **Handle failed requests gracefully**:
  - [x] Custom 404 page - NotFoundPage.jsx with styled error message and home link
  - [x] Error Boundary - React component catching runtime errors with fallback UI
  - [x] API error handling - apiCall() parses and displays readable error messages
  - [x] Form validation feedback - All forms display validation errors inline
  - [x] Django custom 404 handler - Returns JSON with detail message and 404 status

- [x] **Use Token Authentication**:
  - [x] CustomAuthToken endpoint at `POST /api-token-auth/`
  - [x] Returns token + user_id + email on successful authentication
  - [x] Frontend stores token in localStorage
  - [x] Token auto-injected in Authorization headers for all API requests
  - [x] Protected endpoints require token for POST/PUT/DELETE operations
  - [x] Token class: `rest_framework.authtoken.models.Token`

- [x] **Implement responsive design**:
  - [x] 480px breakpoint - Mobile layout (single column, reduced fonts)
  - [x] 768px breakpoint - Tablet layout (adjusted grid, better spacing)
  - [x] 1024px breakpoint - Desktop layout (multi-column grid system)
  - [x] CSS media queries in: HomePage, FundraiserDetailPage, AuthForm, NavBar
  - [x] Responsive grid: `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))`
  - [x] Touch-friendly: All buttons properly sized for mobile interaction

## Implementation Details

### Backend Structure (Django REST Framework)
```
crowdfunding/
├── fundraisers/
│   ├── models.py          # Fundraiser & Pledge models with validation
│   ├── views.py           # FundraiserList, FundraiserDetail, PledgeList, PledgeDetail
│   ├── serializers.py     # FundraiserSerializer, PledgeSerializer with calculated fields
│   ├── urls.py            # API routing for fundraisers and pledges
│   └── migrations/        # Database migrations
├── users/
│   ├── models.py          # Custom user model (customUser extends AbstractUser)
│   ├── views.py           # CustomUserList, CustomUserDetail, CurrentUser, CustomAuthToken
│   ├── serializers.py     # CustomUserSerializer with secure password handling
│   ├── urls.py            # User and auth endpoints
│   └── migrations/        # User model migrations
├── crowdfunding/
│   ├── settings.py        # Django configuration, CORS setup, REST_FRAMEWORK
│   ├── urls.py            # API root endpoint with feature documentation
│   └── wsgi.py            # Heroku deployment config
└── Procfile               # Heroku deployment specifications
```

### Frontend Structure (React 19 + Vite)
```
src/
├── pages/
│   ├── HomePage.jsx              # Fundraiser grid with filtering
│   ├── LoginPage.jsx             # Login form with error handling
│   ├── RegisterPage.jsx          # Registration form
│   ├── CreateFundraiserPage.jsx  # Create fundraiser form (auth required)
│   ├── FundraiserDetailPage.jsx  # Fundraiser detail + pledge form + pledge list
│   ├── UserProfilePage.jsx       # User dashboard (personal fundraisers & pledges)
│   ├── NotFoundPage.jsx          # Custom 404 page
│   └── ***.css                   # Responsive styles with media queries
├── components/
│   ├── AuthProvider.jsx          # Context provider for auth state
│   ├── ErrorBoundary.jsx         # Graceful error handling
│   ├── NavBar.jsx                # Navigation with auth links
│   ├── FundraiserCard.jsx        # Fundraiser card component
│   └── PledgeForm.jsx            # Pledge creation form
├── hooks/
│   ├── use-auth.js               # Custom hook for auth context
│   └── use-fundraisers.js        # Custom hook for fundraiser data
├── contexts/
│   └── AuthContext.jsx           # Context definition
├── utils/
│   └── api.js                    # Fetch wrapper with token injection
└── main.jsx                      # React Router setup with error boundary
```

### API Endpoints (13 Total)

**Authentication:**
- `POST /api-token-auth/` - Login and get token (returns token, user_id, email)

**Users:**
- `GET /users/` - List all users
- `POST /users/` - Register new user (returns user data)
- `GET /users/:id/` - Get user details
- `PUT /users/:id/` - Update user profile (self only)
- `DELETE /users/:id/` - Delete user account (self only)
- `GET /users/me/` - Get current authenticated user

**Fundraisers:**
- `GET /fundraisers/` - List fundraisers (supports search, category, is_open, funded filters)
- `POST /fundraisers/` - Create fundraiser (auth required)
- `GET /fundraisers/:id/` - Get fundraiser details with pledges
- `PUT /fundraisers/:id/` - Update fundraiser (owner only)
- `DELETE /fundraisers/:id/` - Delete fundraiser (owner only)

**Pledges:**
- `GET /pledges/` - List all pledges
- `POST /pledges/` - Create pledge (auth required)
- `GET /pledges/:id/` - Get pledge details
- `PUT /pledges/:id/` - Update pledge (supporter only)
- `DELETE /pledges/:id/` - Delete pledge (supporter only)

### Extra Features Implemented
- ✅ Campaign deadlines (optional field with expiration validation)
- ✅ Anonymous pledges (privacy option for supporters)
- ✅ Duplicate pledge prevention (one pledge per user per campaign)
- ✅ Calculated fields (total_pledged, is_funded, pledge_count, can_accept_pledges)
- ✅ Search and filtering capabilities
- ✅ Beauty-specific fields (category, product_link)
- ✅ Full-text comment support on pledges
- ✅ Comprehensive error validation

## Design & Branding

### Color Scheme (Glwup Brand)
- Primary: Purple (#9b59b6)
- Secondary: Pink/Coral (#c44569)
- Gradient: `linear-gradient(135deg, #9b59b6 0%, #c44569 100%)`
- Applied to: Buttons, links, progress bars, hero sections, form focus states

### User Interface Improvements
- Modern form design with enhanced inputs (2px borders, focus shadows)
- Gradient backgrounds on auth pages
- Animated links with underline effects
- Status badges with distinct colors
- Progress bars showing campaign funding status
- Error/success message styling with color-coded borders
- Improved button states (hover, active, disabled)
- Touch-friendly UI for mobile devices

## Additional Notes
No additional libraries or frameworks, other than what we use in class, are allowed unless approved by the Lead Mentor.

Note that while this is a crowdfunding website, actual money transactions are out of scope for this project.

## Testing & Verification

### Manual Testing Completed
- [x] User registration and login flow
- [x] Token authentication and storage
- [x] Create fundraiser with validation
- [x] Update fundraiser (owner only)
- [x] Delete fundraiser (owner only)
- [x] Create pledge with amount validation
- [x] View fundraiser details with pledge list
- [x] Anonymous pledge functionality
- [x] Duplicate pledge prevention
- [x] Permission enforcement (403 responses)
- [x] Error handling and 404 pages
- [x] Responsive design on multiple screen sizes
- [x] CORS configuration for cross-origin requests

### Code Review Verified
- [x] All 22 requirements met
- [x] Proper HTTP status codes implemented
- [x] Custom permission classes working
- [x] Model validation at multiple layers
- [x] API error handling with JSON responses
- [x] React error boundary catching runtime errors
- [x] Token auto-injection in API requests
- [x] Protected routes redirecting to login

## Submission
To submit, fill out [this Google form](https://forms.gle/34ymxgPhdT8YXDgF6), including a link to your Github repo. Your lead mentor will respond with any feedback they can offer, and you can approach the mentoring team if you would like help to make improvements based on this feedback!

Please include the following in your readme doc:
- [x] A link to the deployed project.
  - Frontend: https://magnificent-meringue-d639f5.netlify.app
  - Backend: https://yubo-crowdfunding-shecodes-f2aced9e5879.herokuapp.com
- [ ] A screenshot of the homepage
- [ ] A screenshot of the fundraiser creation page
- [ ] A screenshot of the fundraiser creation form
- [ ] A screenshot of a fundraiser with pledges
- [ ] A screenshot of the resulting page when an unauthorized user attempts to edit a fundraiser (optional)

## GitHub Repositories
- Frontend: https://github.com/Veronica-Yubo-Chen/crowdfunding-frontend
- Backend: https://github.com/Veronica-Yubo-Chen/CrowdFunding_Backend
