# Pass Management System

A secure Node.js backend application for managing event passes with QR code generation and verification capabilities.

## Features

- User authentication with JWT
- QR code generation for passes
- Pass verification system
- Rate limiting for security
- Encrypted data handling
- Entry approval system
- Batch-wise pass distribution
- Pass count limitations

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
bash
git clone <repository-url>
cd <project-directory>


2. Install dependencies:
bash
npm install


3. Create a `.env` file in the root directory with the following variables:
env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ENCRYPTION_KEY=your_32_character_encryption_key


## Project Structure

```
├── config/
│   └── db.js
├── controllers/
│   ├── authcontroller.js
│   ├── checkcontroller.js
│   ├── entrycontroller.js
│   ├── passverificationcontroller.js
│   └── transactioncontroller.js
├── middleware/
│   └── auth.js
├── models/
│   └── user.js
├── routes/
│   ├── auth.js
│   ├── passapproval.js
│   ├── passverify.js
│   └── transaction.js
├── server.js
└── utils.js
```


## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/check` - Check pass eligibility

### Transactions
- `POST /api/transaction/submit` - Submit transaction and generate QR code
- `GET /api/transaction/getQR` - Retrieve user's QR code

### Pass Management
- `POST /api/passes/approve` - Approve entry
- `GET /api/passes/verify` - Verify pass

## Security Features

1. Rate Limiting
   - 500 requests per 15 minutes window for login attempts

2. Data Protection
   - JWT authentication
   - Encrypted QR codes
   - HTTP-only cookies
   - CORS protection
   - Helmet security headers

## Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Server port (default: 5001) |
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | Secret key for JWT |
| ENCRYPTION_KEY | Key for QR code encryption |

## Usage

1. Start the server:
```
npm start
```

2. The server will run at `http://localhost:5001`

## API Security

- All sensitive routes are protected with JWT authentication
- QR codes are encrypted using AES-256-CBC encryption
- Rate limiting is implemented to prevent brute force attacks
- CORS is configured for specific origins only

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.


