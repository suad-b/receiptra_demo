import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, typography, spacing, borderRadius } from '../styles/theme';

const HomeScreen = ({ navigation }) => {
  const [accounts] = useState([
    {
      id: '1',
      type: 'Personal Account',
      name: 'Alex Johnson',
      balance: 12560.40,
      currency: '€',
      cardNumber: '•••• 3568',
      expiryDate: '12/24',
    },
    {
      id: '2',
      type: 'Business Account',
      name: 'Design Studio',
      balance: 8270.15,
      currency: '€',
      cardNumber: '•••• 7812',
      expiryDate: '10/25',
    },
  ]);

  const [transactions] = useState([
    {
      id: '1',
      merchant: 'Amazon',
      category: 'Online Shopping',
      amount: '-€45.99',
      date: '2024-06-08',
      icon: 'shopping-cart',
      color: '#007bff',
    },
    {
      id: '2',
      merchant: 'Starbucks',
      category: 'Food & Dining',
      amount: '-€4.50',
      date: '2024-06-07',
      icon: 'local-cafe',
      color: '#28a745',
    },
  ]);

  const handleActionPress = (action) => {
    switch (action) {
      case 'transfer':
        Alert.alert('Transfer', 'Transfer feature coming soon!');
        break;
      case 'cards':
        Alert.alert('Cards', 'Cards feature coming soon!');
        break;
      default:
        Alert.alert('Coming Soon', 'This feature will be available soon!');
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>$</Text>
            </View>
            <Text style={styles.appName}>UBank</Text>
          </View>
          <View style={styles.notificationContainer}>
            <Icon name="notifications" size={24} color={colors.textSecondary} />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>2</Text>
            </View>
          </View>
        </View>

        {/* Accounts Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Accounts</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {accounts.map((account) => (
              <View key={account.id} style={styles.accountCard}>
                <Text style={styles.accountType}>{account.type}</Text>
                <Text style={styles.accountName}>{account.name}</Text>
                <Text style={styles.accountBalance}>
                  {account.currency}{account.balance.toFixed(2)}
                </Text>
                <View style={styles.accountDetails}>
                  <Text style={styles.cardNumber}>{account.cardNumber}</Text>
                  <Text style={styles.expiryDate}>{account.expiryDate}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.actionItem} 
              onPress={() => handleActionPress('transfer')}
            >
              <View style={styles.actionCircle}>
                <Icon name="swap-horiz" size={24} color={colors.primary} />
              </View>
              <Text style={styles.actionText}>Transfer</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionItem} 
              onPress={() => handleActionPress('cards')}
            >
              <View style={styles.actionCircle}>
                <Icon name="credit-card" size={24} color={colors.primary} />
              </View>
              <Text style={styles.actionText}>Cards</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionItem} 
              onPress={() => handleActionPress('invest')}
            >
              <View style={styles.actionCircle}>
                <Icon name="trending-up" size={24} color={colors.primary} />
              </View>
              <Text style={styles.actionText}>Invest</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionItem} 
              onPress={() => handleActionPress('exchange')}
            >
              <View style={styles.actionCircle}>
                <Icon name="language" size={24} color={colors.primary} />
              </View>
              <Text style={styles.actionText}>Exchange</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.transactionsContainer}>
            {transactions.map((transaction) => (
              <TouchableOpacity key={transaction.id} style={styles.transactionItem}>
                <View style={[styles.transactionIcon, { backgroundColor: transaction.color }]}>
                  <Icon name={transaction.icon} size={20} color="#ffffff" />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionMerchant}>{transaction.merchant}</Text>
                  <Text style={styles.transactionInfo}>
                    {transaction.category} • {transaction.date}
                  </Text>
                </View>
                <Text style={styles.transactionAmount}>{transaction.amount}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Financial Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Financial Summary</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statTitle}>Monthly Spending</Text>
              <Text style={styles.statValue}>€1,200.50</Text>
              <Text style={styles.statTrend}>↓ 12% vs last month</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statTitle}>Investments</Text>
              <Text style={styles.statValue}>€8,562.45</Text>
              <Text style={styles.statTrend}>↑ 6.2% this month</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoCircle: {
    width: 35,
    height: 35,
    backgroundColor: colors.primary,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  logoText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  appName: {
    ...typography.h3,
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: colors.error,
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.surface,
  },
  notificationBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h4,
  },
  viewAllText: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: '600',
  },
  accountCard: {
    width: 280,
    height: 180,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginRight: spacing.md,
    justifyContent: 'space-between',
  },
  accountType: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  accountName: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
    marginTop: spacing.xs,
  },
  accountBalance: {
    fontSize: 28,
    color: '#ffffff',
    fontWeight: 'bold',
    marginTop: spacing.md,
  },
  accountDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardNumber: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  expiryDate: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f8f8f8',
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
  },
  actionItem: {
    alignItems: 'center',
    flex: 1,
  },
  actionCircle: {
    width: 50,
    height: 50,
    backgroundColor: '#eef5fc',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  actionText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  transactionsContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.sm,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionMerchant: {
    ...typography.body,
    fontWeight: 'bold',
    color: colors.text,
  },
  transactionInfo: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: 2,
  },
  transactionAmount: {
    ...typography.body,
    fontWeight: 'bold',
    color: colors.error,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  statTitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  statValue: {
    ...typography.h3,
    marginBottom: spacing.xs,
  },
  statTrend: {
    ...typography.caption,
    color: colors.success,
    fontWeight: '500',
  },
});

export default HomeScreen;
