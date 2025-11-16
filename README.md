# UBank - React Native iOS Banking App

A modern, feature-rich banking application built with React Native and Expo, optimized for iOS devices (iPhone and iPad).

## Features

### 🏦 Core Banking Features
- **Multi-Account Management**: Personal, Business, and Savings accounts
- **Real-time Transaction History**: Detailed transaction records with receipts
- **Money Transfers**: Send money between accounts and to recipients
- **Card Management**: Physical and virtual card management
- **Budget Tracking**: Category-based budget monitoring with progress indicators

### 🤖 AI-Powered Features
- **Financial Insights**: AI-powered analysis of spending patterns using Google Gemini
- **Budget Tips**: Personalized recommendations for saving money
- **Smart Categorization**: Automatic transaction categorization
- **Natural Language Queries**: Ask questions about your finances in plain English

### 📱 Mobile-First Design
- **iOS Optimized**: Native iOS design patterns and interactions
- **iPad Support**: Responsive design that works beautifully on both iPhone and iPad
- **Smooth Animations**: Fluid transitions and micro-interactions
- **Dark/Light Mode**: Adaptive UI that respects system preferences

### 🔒 Security & Privacy
- **Secure Data Handling**: All financial data is handled securely
- **Biometric Authentication**: Touch ID / Face ID support (coming soon)
- **Encrypted Storage**: Local data encryption for sensitive information

## Technology Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **React Navigation**: Navigation library for React Native
- **React Native Paper**: Material Design components
- **React Native Chart Kit**: Beautiful charts and graphs
- **Google Gemini AI**: Advanced AI for financial insights
- **Expo Print**: PDF generation for receipts
- **AsyncStorage**: Local data persistence

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for development)

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ubank-app.git
   cd ubank-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on iOS Simulator**
   ```bash
   npm run ios
   # or
   yarn ios
   ```

### Configuration

1. **AI Service Setup**
   - The app uses Google Gemini AI for financial insights
   - API key is included for demo purposes
   - For production, replace with your own API key in `src/services/AIService.js`

2. **Transaction Data**
   - Sample transaction data is included in `src/data/transactions.json`
   - The app generates realistic transaction history from this data
   - You can modify this file to customize the transaction types and merchants

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AccountCard.js
│   ├── TransactionItem.js
│   └── QuickActions.js
├── screens/            # Main app screens
│   ├── HomeScreen.js
│   ├── TransferScreen.js
│   ├── CardsScreen.js
│   ├── BudgetScreen.js
│   ├── InsightsScreen.js
│   └── TransactionDetailScreen.js
├── services/           # Business logic and API calls
│   ├── TransactionService.js
│   └── AIService.js
├── navigation/         # Navigation configuration
│   └── AppNavigator.js
├── styles/            # Theme and styling
│   └── theme.js
└── data/              # Static data and mock data
    ├── transactions.json
    └── mockData.js
```

## Key Features Explained

### AI Financial Insights
The app integrates with Google Gemini AI to provide:
- Spending analysis and trends
- Personalized budget recommendations
- Natural language query processing
- Smart financial advice

### Transaction Management
- Automatic transaction generation from merchant data
- Detailed receipt information with itemized purchases
- PDF export functionality for receipts
- Advanced search and filtering capabilities

### Budget Tracking
- Visual progress indicators for budget categories
- AI-powered tips for staying within budget
- Monthly spending analysis
- Category-based expense tracking

### Responsive Design
- Optimized for both iPhone and iPad
- Adaptive layouts that work across different screen sizes
- Native iOS design patterns and interactions
- Smooth animations and transitions

## Development

### Adding New Features
1. Create new components in `src/components/`
2. Add new screens in `src/screens/`
3. Update navigation in `src/navigation/AppNavigator.js`
4. Add any new services in `src/services/`

### Customizing Styles
- Modify `src/styles/theme.js` to change colors, typography, and spacing
- All components use the centralized theme for consistency

### Adding Transaction Types
- Update `src/data/transactions.json` with new merchants and items
- Modify `TransactionService.js` to handle new transaction categories

## Building for Production

### iOS App Store
```bash
expo build:ios
```

### Android Play Store
```bash
expo build:android
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspired by modern banking apps like Revolut and Wise
- Transaction data based on real European merchant categories
- AI integration powered by Google Gemini
- Icons provided by Material Design Icons

## Support

For support, email support@ubank-app.com or create an issue in this repository.

---

**Note**: This is a demo application for educational purposes. Do not use with real financial data or in production environments without proper security audits and compliance measures.
