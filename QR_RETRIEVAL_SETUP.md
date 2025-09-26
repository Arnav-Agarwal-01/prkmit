# QR Code Retrieval System - Setup Instructions

This guide will help you set up and test the QR code retrieval system that allows users to get their QR codes using their roll number and parent's phone digits.

## 🚀 Quick Start

### 1. Start the Backend Server

```bash
cd /Users/arnavagarwal/Developer/NavrasPassbackendPR
npm start
# or
node server.js
```

The backend will start on `http://localhost:3000`

### 2. Start the Frontend (Website)

```bash
cd /Users/arnavagarwal/Desktop/prkmitwebsite
npm run dev
```

The frontend will start on `http://localhost:3001` (or the next available port)

### 3. Access the QR Retrieval Feature

**Option 1: Direct URL**
- Go to: `http://localhost:3001/retrieve-qr`

**Option 2: From Homepage**
- Go to: `http://localhost:3001`
- Click the "📱 Retrieve Your QR Code 📱" button

**Option 3: From Navigation**
- Click "Retrieve QR" in the top navigation

## 🧪 Testing the Feature

### Test Data Requirements
You'll need users in your database with:
- `hallticketno` (10 characters)
- `parentphone` (full phone number)
- `transactionid` (indicates pass purchased)
- `qrcode` (base64 encoded QR code)

### Test Scenarios

**Scenario 1: Successful QR Retrieval**
- Enter valid hall ticket number
- Enter last 4 digits of parent's phone
- Should display the QR code with download option

**Scenario 2: User Not Found**
- Enter invalid hall ticket number
- Should show "User Not Found" error

**Scenario 3: Wrong Phone Digits**
- Enter valid hall ticket but wrong phone digits
- Should show "Invalid Credentials" error

**Scenario 4: No Pass Purchased**
- Enter valid credentials for user without transactionid
- Should show "No Pass Found" message

## 📱 API Endpoint Details

### Endpoint
`POST /api/auth/getqr`

### Request Body
```json
{
  "hallticketno": "1234567890",
  "parentphone": "1234"
}
```

### Success Response
```json
{
  "msg": "QR Code Retrieved Successfully",
  "user": {
    "firstname": "John",
    "hallticketno": "1234567890",
    "qrcode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
  }
}
```

## 🔧 Configuration

### Backend Configuration
- **Port**: 3000 (configured in server.js)
- **CORS**: Already configured to allow localhost:3001
- **Database**: Uses existing MongoDB connection
- **Validation**: Same validation as existing login system

### Frontend Configuration
- **API Endpoint**: Set in `.env.local` as `NEXT_PUBLIC_API_ENDPOINT=http://localhost:3000`
- **Styling**: Uses existing website theme and components
- **Navigation**: Added to main navigation and homepage

## 🔒 Security Features

- ✅ Input validation (10-char hall ticket, 4-digit phone)
- ✅ Rate limiting (inherited from existing login rate limiter)
- ✅ CORS protection
- ✅ Helmet security headers
- ✅ Same authentication logic as existing system

## 🎨 UI Features

- ✅ Consistent styling with existing website
- ✅ Responsive design
- ✅ Loading states and error handling
- ✅ Toast notifications
- ✅ QR code download functionality
- ✅ Helpful instructions and error messages

## 🚨 Troubleshooting

### Backend Issues
**Error: "EADDRINUSE: address already in use"**
- Another process is using port 3000
- Change port in server.js or kill the process

**Error: "Database connection failed"**
- Check your MongoDB connection string in .env
- Ensure database is running

### Frontend Issues
**Error: "Network error"**
- Backend server is not running
- Check API endpoint URL in .env.local
- Check CORS configuration

**Error: "TypeError: Cannot read property"**
- Missing environment variables
- Check .env.local file exists and has correct values

### Common Issues
**QR Code not displaying**
- Check if user has purchased a pass (has transactionid)
- Verify QR code data is valid base64

**Form validation errors**
- Hall ticket must be exactly 10 characters
- Phone digits must be exactly 4 digits

## 📝 File Structure

### Backend Files Modified/Added
```
NavrasPassbackendPR/
├── controllers/authcontroller.js (✏️ modified - added getQRCode method)
├── routes/auth.js (✏️ modified - added /getqr route)
├── QR_RETRIEVAL_API.md (✨ new - API documentation)
└── server.js (unchanged - CORS already configured)
```

### Frontend Files Modified/Added
```
prkmitwebsite/
├── src/app/retrieve-qr/page.js (✨ new - QR retrieval page)
├── src/app/layout.js (✏️ modified - added navigation item)
├── src/app/page.js (✏️ modified - added homepage button)
└── .env.local (✏️ modified - updated API endpoint)
```

## 🎯 Next Steps

1. **Test with Real Data**: Use actual user data from your database
2. **Production Deployment**: Update API endpoints for production URLs
3. **Add Analytics**: Track QR retrieval usage if needed
4. **Error Monitoring**: Add logging for failed retrieval attempts

## 💡 Additional Features (Future)

- Email QR code to users
- SMS notification when QR is retrieved
- Admin dashboard to see retrieval statistics
- Bulk QR generation for events

---

**Support**: If you encounter any issues, check the browser console and backend logs for detailed error messages.