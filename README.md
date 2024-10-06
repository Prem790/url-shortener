# ClipLink 🔗

<div align="center">

![ClipLink Logo](https://raw.githubusercontent.com/yourusername/cliplink/main/public/logo.png)

[![GitHub stars](https://img.shields.io/github/stars/yourusername/cliplink)](https://github.com/yourusername/cliplink/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/cliplink)](https://github.com/yourusername/cliplink/network)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/cliplink)](https://github.com/yourusername/cliplink/issues)
[![GitHub license](https://img.shields.io/github/license/yourusername/cliplink)](https://github.com/yourusername/cliplink/blob/main/LICENSE)

### 🌐 [Live Demo](https://url-shortener-frontend-tvo9.onrender.com) | 📚 [Documentation](docs/README.md) | 🐛 [Report Bug](https://github.com/yourusername/cliplink/issues) | ✨ [Request Feature](https://github.com/yourusername/cliplink/issues)

ClipLink is your all-in-one solution for URL management and YouTube content download, featuring a powerful dashboard for seamless control over your links.

</div>

## 📋 Table of Contents
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## 🎯 About The Project

ClipLink is a comprehensive web application that combines two powerful features: URL shortening (MiniURL) and YouTube video downloading. With a focus on user experience and functionality, ClipLink provides a robust dashboard that gives users complete control over their shortened URLs and downloaded content.

### 🏗️ Built With

- **Frontend**:
  - [React.js](https://reactjs.org/) - A JavaScript library for building user interfaces
  - [Material-UI](https://material-ui.com/) - React UI framework
  - [Axios](https://axios-http.com/) - HTTP client for API requests
  
- **Backend**:
  - [Node.js](https://nodejs.org/) - JavaScript runtime
  - [Express.js](https://expressjs.com/) - Web application framework
  - [MongoDB](https://www.mongodb.com/) - NoSQL database
  
- **Authentication**:
  - [Firebase](https://firebase.google.com/) - Authentication and user management

## ✨ Features

### 1. 🔗 MiniURL - Advanced URL Shortener
- **Smart Shortening Algorithm**: Creates concise, memorable URLs
- **Custom URL Support**: Create personalized short links
- **Advanced Analytics**:
  - Click tracking with geographic data
  - Time-based analytics
  - Referrer tracking
- **Bulk URL Shortening**: Process multiple URLs simultaneously
- **API Access**: Integrate URL shortening into your applications

### 2. 📺 YouTube Downloader
- **Multiple Format Support**: Download videos in various qualities
  - 1080p, 720p, 480p, 360p
  - MP4, WebM formats
- **Audio Extraction**: Download audio-only in MP3 format
- **Playlist Support**: Download entire YouTube playlists
- **Thumbnail Download**: Save video thumbnails

### 3. 📊 Powerful Dashboard
- **Comprehensive URL Management**:
  - View all shortened URLs
  - Search and filter functionality
  - Bulk actions (delete, disable, etc.)
- **Detailed Analytics**:
  - Interactive graphs and charts
  - Export data in CSV/Excel format
- **Quick Actions**:
  - One-click copy to clipboard
  - QR code generation
  - Social media sharing integration
- **History and Favorites**:
  - Track recently shortened URLs
  - Bookmark favorite links

### 4. 🔐 User Authentication
- Secure signup and login
- Social media authentication options
- Password reset functionality
- Two-factor authentication support

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn
- MongoDB
- Firebase account

### Installation

1. **Clone the repository**
```bash
https://github.com/Prem790/url-shortener.git
cd frontend
cd backend
```

2. **Set up environment variables**
```bash
cp .env.example .env
```
Edit `.env` with your configuration:
```
MONGODB_URI=your_mongodb_uri
FIREBASE_API_KEY=your_firebase_api_key
JWT_SECRET=your_jwt_secret
```

3. **Install dependencies**
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
```

4. **Set up Firebase**
- Create a new Firebase project
- Enable Authentication
- Add your Firebase configuration to `client/src/config/firebase.js`

5. **Run the application**
```bash
# Run backend (from root directory)
npm run server

# Run frontend (from client directory)
npm start
```

## 📝 Usage

### URL Shortening
1. Log in to your account
2. Navigate to the URL shortener section
3. Paste your long URL
4. Click "Shorten URL"
5. Copy and share your shortened link

### YouTube Download
1. Copy a YouTube video URL
2. Paste into the YouTube downloader section
3. Select desired format and quality
4. Click "Download"

## 📚 API Documentation

### Base URL
```
https://api.cliplink.com/v1
```

### Endpoints

#### Shorten URL
```http
POST /url/shorten
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `url` | `string` | **Required**. URL to shorten |

#### Get URL Analytics
```http
GET /url/:id/analytics
```

For complete API documentation, visit our [API Docs](docs/API.md).

## 🛣️ Roadmap

- [x] Basic URL shortening
- [x] YouTube download functionality
- [x] User authentication
- [ ] Chrome extension
- [ ] Mobile app
- [ ] API rate limiting
- [ ] Premium features

See the [open issues](https://github.com/yourusername/cliplink/issues) for a full list of proposed features and known issues.

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

Prem Jadwani -  jadwaniprem12@gmail.com

Project Link: [https://github.com/yourusername/cliplink](https://github.com/yourusername/cliplink)

## 🙏 Acknowledgements
- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Firebase](https://firebase.google.com/)
- [Font Awesome](https://fontawesome.com)
- [MongoDB](https://www.mongodb.com/)

---

<div align="center">

### Show some ❤️ by starring this repository!

</div>
