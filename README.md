# Peck-In

Simplifying club check-ins at Hunter College.

## 🛠️ Prerequisites

Before setting up this project, ensure you have the following installed on your system:

### Required Software

- **Node.js** (v22 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)

### Mobile Development Setup

- **Expo CLI**: Install globally with `npm install -g @expo/cli`
- **Expo Go app** on your mobile device:
  - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Peck-In
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Configuration

Create a `.env` file in the project root with your Firebase configuration:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key_here
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
EXPO_PUBLIC_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. Start Development Server

```bash
npx expo start --tunnel
```

This will start the Expo development server and show a QR code that you can scan with the Expo Go app on your mobile device.

## 🔧 Development Workflow

### Project Structure

```
Peck-In/
├── app/                    # Expo Router pages (file-based routing)
│   ├── index.tsx          # Home screen
│   ├── login.tsx          # Authentication screen
│   ├── _layout.tsx        # Root layout with providers
│   └── ...
├── components/            # Reusable UI components
├── hooks/                 # Custom React hooks
│   └── useAuth.ts         # Authentication hook
├── utils/                 # Utility functions
│   ├── firebase.ts        # Firebase configuration
│   ├── firebaseAuth.ts    # Authentication utilities
│   └── firestore.ts       # Database utilities
├── assets/               # Images, fonts, icons
├── .env                  # Environment variables (create this)
├── app.json             # Expo configuration
├── package.json         # Dependencies and scripts
└── tamagui.config.ts    # UI library configuration
```

### Key Technologies Used

- **Expo**: React Native development platform
- **Expo Router**: File-based routing system
- **TypeScript**: Type-safe JavaScript
- **Tamagui**: Modern UI library with excellent performance
- **Firebase Auth**: User authentication
- **Firestore**: Real-time NoSQL database
- **ESLint + Prettier**: Code formatting and linting

### Development Tips

1. **Hot Reloading**: The development server supports hot reloading. Save any file to see changes instantly.

2. **Debugging**:
   - Use Expo DevTools in your browser
   - Install React DevTools for component inspection
   - Use console.log() or debugger statements

3. **Testing on Device**:
   - Install Expo Go app on your phone
   - Scan the QR code from the development server
   - Shake your device to open the developer menu

4. **Code Quality**:
   - Run `npm run lint` before committing
   - Use `npm run format` to auto-fix formatting issues
   - Follow TypeScript best practices

### Adding New Features

1. **New Screens**: Add `.tsx` files in the `app/` directory (Expo Router will automatically create routes)
2. **Components**: Create reusable components in `components/` directory and Tamagui UI components.
3. **Utilities**: Add helper functions in `utils/` directory
4. **Database Operations**: Use the utilities in `utils/firestore.ts` for Firestore operations

### Getting Help

- [Expo Documentation](https://docs.expo.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tamagui Documentation](https://tamagui.dev/)
- [React Native Documentation](https://reactnative.dev/)
