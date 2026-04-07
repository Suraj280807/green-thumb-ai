# 🌿 Virtual Gardener AI

An intelligent web application that helps users take better care of their plants using **real-time weather data**, **rule-based logic**, and **AI-powered plant analysis**.

---

## 🚀 Overview

Virtual Gardener AI acts like a **smart gardening assistant**. It analyzes environmental conditions and plant health to provide actionable insights such as:

* When to water plants 💧
* Which plants are suitable for the current season 🌱
* Whether a plant needs trimming, sunlight, or care ✂️☀️
* Health analysis using plant images 📸

---

## ✨ Features

### 🌍 Location Detection

* Auto-detects user location using browser geolocation
* Fallback to manual city input
* Converts city to coordinates via geocoding API

---

### 🌦 Weather-Based Insights

* Fetches real-time:

  * Temperature
  * Humidity
  * Rain probability
* Provides intelligent watering suggestions

---

### 🧠 Smart Gardening Engine

Uses rule-based logic (not generic AI) for accuracy:

* Avoid watering if rain is expected 🌧️
* Suggest watering based on temperature & humidity
* Plant-specific care tips

---

### 🌱 Plant Recommendation

* Suggests plants based on season and environment
* Displays care instructions and watering needs

---

### 📸 AI Plant Health Detection

* Upload plant images
* Detect:

  * Health status
  * Issues (overwatering, disease, etc.)
  * Suggested actions

---

### 🎨 Modern UI/UX

* Clean, Apple-inspired design
* Nature-based color palette 🌿
* Responsive and mobile-friendly
* Smooth animations and card layout

---

## 🏗️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios / Fetch

### Backend

* Node.js + Express *(or Next.js API routes)*

### APIs

* Weather API (OpenWeatherMap / WeatherAPI)
* Geocoding API

### AI Integration

* Structured prompt-based image analysis
* Optional TensorFlow / external ML APIs

---

## 📂 Project Structure

```
virtual-gardener-ai/
│
├── client/                # React frontend
│   ├── components/
│   ├── pages/
│   └── hooks/
│
├── server/                # Backend (Node / API routes)
│   ├── routes/
│   ├── controllers/
│   └── utils/
│
├── public/
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/virtual-gardener-ai.git
cd virtual-gardener-ai
```

### 2. Install dependencies

```bash
npm install
cd client && npm install
```

### 3. Setup environment variables

Create a `.env` file in the server folder:

```
WEATHER_API_KEY=your_api_key
GEOCODING_API_KEY=your_api_key
AI_API_KEY=your_api_key
```

---

### 4. Run the app

```bash
# Run backend
npm run server

# Run frontend
cd client
npm start
```

---

## 🔗 API Endpoints

### `/api/weather`

Fetch weather data based on coordinates

### `/api/geocode`

Convert city name → latitude & longitude

### `/api/gardener-advice`

Returns smart plant care suggestions based on:

* Temperature
* Humidity
* Rain
* Plant type

---

## 🧠 Example Logic

```js
if (rain > 60) return "Do not water 🌧️";
if (temp > 32 && humidity < 40) return "Water in evening 💧";
if (humidity < 35) return "Increase watering";
```

---

## 📸 AI Response Format

```json
{
  "health": "Unhealthy",
  "issue": "Overwatering",
  "action": "Reduce watering and improve drainage"
}
```

---

## 🌱 Future Enhancements

* 🌿 Plant growth tracking (Plant Diary)
* 🔔 Smart reminders (watering alerts)
* 📊 Analytics dashboard
* 🤖 Advanced ML model for plant disease detection
* 🌍 Multi-location support

---

## 🤝 Contribution

Contributions are welcome!
Feel free to fork the repo and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 💡 Inspiration

Built to combine **technology + nature** and make plant care smarter, easier, and more accessible for everyone.

---

## 👨‍💻 Author

Suraj Patil
B.Tech Student | UI/UX Enthusiast | React Developer

---
