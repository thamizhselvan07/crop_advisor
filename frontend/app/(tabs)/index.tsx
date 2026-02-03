import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, DollarSign, FileText, CloudRain, TrendingUp, TriangleAlert as AlertTriangle, Mic, Bell, MapPin } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState('हिंदी');

  const quickActions = [
    {
      id: 1,
      title: 'Scan Crop',
      subtitle: 'फसल स्कैन करें',
      icon: Camera,
      color: '#22C55E',
      screen: '/scanner',
    },
    {
      id: 2,
      title: 'Market Prices',
      subtitle: 'बाजार की कीमतें',
      icon: DollarSign,
      color: '#3B82F6',
      screen: '/market',
    },
    {
      id: 3,
      title: 'Gov Schemes',
      subtitle: 'सरकारी योजनाएं',
      icon: FileText,
      color: '#F59E0B',
      screen: '/schemes',
    },
    {
      id: 4,
      title: 'Voice Assistant',
      subtitle: 'आवाज सहायक',
      icon: Mic,
      color: '#8B5CF6',
      screen: '/voice',
    },
  ];

  const weatherData = {
    temperature: '28°C',
    condition: 'Partly Cloudy',
    humidity: '65%',
    rainfall: '2mm',
    location: 'Pune, Maharashtra',
  };

  const marketTrends = [
    { crop: 'Wheat', price: '₹2,100', change: '+5%', trend: 'up' },
    { crop: 'Rice', price: '₹1,850', change: '-2%', trend: 'down' },
    { crop: 'Cotton', price: '₹5,200', change: '+8%', trend: 'up' },
  ];

  const alerts = [
    {
      id: 1,
      type: 'weather',
      message: 'Heavy rainfall expected in next 3 days',
      urgency: 'high',
    },
    {
      id: 2,
      type: 'market',
      message: 'Wheat prices increased by 5% this week',
      urgency: 'medium',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Welcome Farmer!</Text>
              <Text style={styles.subtitle}>CropCadet - Your Smart Farming Assistant</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Bell size={24} color="#374151" />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Weather Card */}
        <View style={styles.weatherCard}>
          <View style={styles.weatherHeader}>
            <CloudRain size={32} color="#3B82F6" />
            <View style={styles.weatherInfo}>
              <Text style={styles.temperature}>{weatherData.temperature}</Text>
              <Text style={styles.weatherCondition}>{weatherData.condition}</Text>
            </View>
          </View>
          <View style={styles.weatherDetails}>
            <View style={styles.weatherStat}>
              <Text style={styles.weatherLabel}>Humidity</Text>
              <Text style={styles.weatherValue}>{weatherData.humidity}</Text>
            </View>
            <View style={styles.weatherStat}>
              <Text style={styles.weatherLabel}>Rainfall</Text>
              <Text style={styles.weatherValue}>{weatherData.rainfall}</Text>
            </View>
          </View>
          <View style={styles.locationRow}>
            <MapPin size={16} color="#6B7280" />
            <Text style={styles.location}>{weatherData.location}</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={[styles.quickActionCard, { borderLeftColor: action.color }]}
                activeOpacity={0.7}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color + '20' }]}>
                  <action.icon size={32} color={action.color} />
                </View>
                <View style={styles.actionContent}>
                  <Text style={styles.actionTitle}>{action.title}</Text>
                  <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Market Trends */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Market Trends</Text>
          <View style={styles.trendsContainer}>
            {marketTrends.map((trend, index) => (
              <View key={index} style={styles.trendCard}>
                <View style={styles.trendInfo}>
                  <Text style={styles.cropName}>{trend.crop}</Text>
                  <Text style={styles.cropPrice}>{trend.price}</Text>
                </View>
                <View style={[
                  styles.changeIndicator,
                  { backgroundColor: trend.trend === 'up' ? '#DCFCE7' : '#FEE2E2' }
                ]}>
                  <TrendingUp
                    size={16}
                    color={trend.trend === 'up' ? '#22C55E' : '#EF4444'}
                    style={trend.trend === 'down' && { transform: [{ rotate: '180deg' }] }}
                  />
                  <Text style={[
                    styles.changeText,
                    { color: trend.trend === 'up' ? '#22C55E' : '#EF4444' }
                  ]}>
                    {trend.change}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Alerts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Important Alerts</Text>
          {alerts.map((alert) => (
            <View key={alert.id} style={[
              styles.alertCard,
              { borderLeftColor: alert.urgency === 'high' ? '#EF4444' : '#F59E0B' }
            ]}>
              <AlertTriangle
                size={24}
                color={alert.urgency === 'high' ? '#EF4444' : '#F59E0B'}
              />
              <Text style={styles.alertText}>{alert.message}</Text>
            </View>
          ))}
        </View>

        {/* Featured Image */}
        <View style={styles.featuredSection}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg' }}
            style={styles.featuredImage}
            resizeMode="cover"
          />
          <View style={styles.featuredOverlay}>
            <Text style={styles.featuredTitle}>Smart Farming Tips</Text>
            <Text style={styles.featuredSubtitle}>Learn modern farming techniques</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  weatherCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  weatherHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  weatherInfo: {
    marginLeft: 16,
  },
  temperature: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  weatherCondition: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  weatherStat: {
    alignItems: 'center',
  },
  weatherLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 4,
  },
  weatherValue: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  location: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  quickActionsGrid: {
    gap: 12,
  },
  quickActionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  trendsContainer: {
    gap: 12,
  },
  trendCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  trendInfo: {
    flex: 1,
  },
  cropName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  cropPrice: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#22C55E',
  },
  changeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  changeText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 4,
  },
  alertCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  alertText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    marginLeft: 12,
    flex: 1,
  },
  featuredSection: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    height: 200,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
  },
  featuredTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featuredSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#E5E7EB',
  },
});