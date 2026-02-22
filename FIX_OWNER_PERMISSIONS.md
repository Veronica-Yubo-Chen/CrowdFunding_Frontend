# Quick Fix Guide - Owner Permissions

## Problem
Owner permission checks are disabled because we simplified the auth to only store tokens, but we need user data (specifically user ID) to check ownership.

## Solution

You have two options:

---

## Option 1: Backend Returns User Data (Recommended)

### Backend Changes (Django)

Update your token authentication view to return user data:

```python
# In your views.py or serializers.py
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': {
                'id': user.pk,
                'username': user.username,
                'email': user.email
            }
        })
```

Update your URL pattern:
```python
from .views import CustomAuthToken

urlpatterns = [
    path('api-token-auth/', CustomAuthToken.as_view()),
]
```

### Frontend Changes

1. **Update `AuthProvider.jsx`**:
```javascript
export const AuthProvider = (props) => {
  const [auth, setAuth] = useState({
    token: window.localStorage.getItem("token"),
    user: JSON.parse(window.localStorage.getItem("user") || "null")
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};
```

2. **Update `LoginPage.jsx`** (line ~37):
```javascript
window.localStorage.setItem('token', data.token);
window.localStorage.setItem('user', JSON.stringify(data.user));
setAuth({
    token: data.token,
    user: data.user
});
```

3. **Update `RegisterPage.jsx`** (line ~57):
```javascript
window.localStorage.setItem('token', loginData.token);
window.localStorage.setItem('user', JSON.stringify(loginData.user));
setAuth({
    token: loginData.token,
    user: loginData.user
});
```

4. **Update `NavBar.jsx`** handleLogout:
```javascript
const handleLogout = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    setAuth({ token: null, user: null });
};
```

5. **Update `FundraiserDetailPage.jsx`** (line 85):
```javascript
const isOwner = auth.token && auth.user?.id === fundraiser.owner;
```

6. **Update `UserProfilePage.jsx`** (lines 47-49):
```javascript
<div className="user-info">
    <p><strong>Username:</strong> {auth.user?.username}</p>
    <p><strong>Email:</strong> {auth.user?.email}</p>
</div>
```

---

## Option 2: Fetch User Data After Login (Alternative)

If you can't modify the backend, you can fetch user data separately:

### Add API call to get current user

1. **Update `api.js`**:
```javascript
export const getCurrentUser = async () => {
    return await apiCall('/users/me/');
};
```

2. **Update `LoginPage.jsx`**:
```javascript
const data = await apiCall('/api-token-auth/', {
    method: 'POST',
    body: JSON.stringify(formData)
});

window.localStorage.setItem('token', data.token);

// Fetch user data
const userData = await apiCall('/users/me/');
window.localStorage.setItem('user', JSON.stringify(userData));

setAuth({
    token: data.token,
    user: userData
});
```

This requires your backend to have a `/users/me/` endpoint that returns the current user's data.

---

## Testing After Fix

Once you apply Option 1 or 2:

1. **Clear localStorage**:
   - Open browser DevTools → Application → Local Storage
   - Delete all items

2. **Test registration**:
   - Register a new user
   - Check that localStorage has both `token` and `user`

3. **Test login**:
   - Login with the user
   - Check localStorage again

4. **Test ownership**:
   - Create a fundraiser
   - You should see Edit and Delete buttons
   - Logout and login as different user
   - View the fundraiser - buttons should NOT appear

5. **Test profile**:
   - Go to My Profile
   - Should show username and email

---

## Recommendation

**Use Option 1** - it's cleaner, more efficient (one API call instead of two), and follows best practices for authentication endpoints.

After implementing this fix, your project will have **full ownership permissions** working! 🎉
