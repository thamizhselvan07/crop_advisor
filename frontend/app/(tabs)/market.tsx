import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Mic, TrendingUp, TrendingDown, MapPin, Bell, Filter, Calendar, ChartBar as BarChart3 } from 'lucide-react-native';

export default function MarketScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('Pune');

  const categories = ['All', 'Grains', 'Vegetables', 'Fruits', 'Spices'];
  
  const locations = [
    'Pune', 'Mumbai', 'Nashik', 'Aurangabad', 'Kolhapur'
  ];

  const marketData = [
    {
      id: 1,
      crop: 'Wheat',
      category: 'Grains',
      currentPrice: 2100,
      yesterdayPrice: 2000,
      change: 5,
      unit: 'quintal',
      market: 'Pune APMC',
      quality: 'FAQ',
      trend: 'up',
      forecast: 'increasing',
      volume: '2,450 tonnes',
    },
    {
      id: 2,
      crop: 'Rice (Basmati)',
      category: 'Grains',
      currentPrice: 4200,
      yesterdayPrice: 4300,
      change: -2.3,
      unit: 'quintal',
      market: 'Mumbai APMC',
      quality: 'Grade A',
      trend: 'down',
      forecast: 'stable',
      volume: '1,890 tonnes',
    },
    {
      id: 3,
      crop: 'Tomato',
      category: 'Vegetables',
      currentPrice: 1800,
      yesterdayPrice: 1650,
      change: 9.1,
      unit: 'quintal',
      market: 'Nashik APMC',
      quality: 'Grade I',
      trend: 'up',
      forecast: 'increasing',
      volume: '890 tonnes',
    },
    {
      id: 4,
      crop: 'Onion',
      category: 'Vegetables',
      currentPrice: 1200,
      yesterdayPrice: 1150,
      change: 4.3,
      unit: 'quintal',
      market: 'Pune APMC',
      quality: 'Medium',
      trend: 'up',
      forecast: 'stable',
      volume: '3,240 tonnes',
    },
    {
      id: 5,
      crop: 'Cotton',
      category: 'Cash Crops',
      currentPrice: 5800,
      yesterdayPrice: 5650,
      change: 2.7,
      unit: 'quintal',
      market: 'Aurangabad',
      quality: 'FAQ',
      trend: 'up',
      forecast: 'increasing',
      volume: '1,560 tonnes',
    },
  ];

  const priceAlerts = [
    {
      id: 1,
      crop: 'Wheat',
      targetPrice: 2200,
      currentPrice: 2100,
      status: 'active',
    },
    {
      id: 2,
      crop: 'Tomato',
      targetPrice: 2000,
      currentPrice: 1800,
      status: 'triggered',
    },
  ];

  const filteredData = marketData.filter(item => {
    const matchesSearch = item.crop.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(1)}%`;
  };

  const MarketCard = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.marketCard}>
      <View style={styles.cardHeader}>
        <View style={styles.cropInfo}>
          <Text style={styles.cropName}>{item.crop}</Text>
          <Text style={styles.marketName}>{item.market}</Text>
        </View>
        <View style={styles.priceInfo}>
          <Text style={styles.currentPrice}>{formatPrice(item.currentPrice)}</Text>
          <Text style={styles.unit}>per {item.unit}</Text>
        </View>
      </View>
      
      <View style={styles.cardDetails}>
        <View style={styles.changeContainer}>
          <View style={[
            styles.changeIndicator,
            { backgroundColor: item.trend === 'up' ? '#DCFCE7' : '#FEE2E2' }
          ]}>
            {item.trend === 'up' ? (
              <TrendingUp size={16} color="#22C55E" />
            ) : (
              <TrendingDown size={16} color="#EF4444" />
            )}
            <Text style={[
              styles.changeText,
              { color: item.trend === 'up' ? '#22C55E' : '#EF4444' }
            ]}>
              {formatChange(item.change)}
            </Text>
          </View>
          <Text style={styles.quality}>Quality: {item.quality}</Text>
        </View>
        
        <View style={styles.volumeContainer}>
          <Text style={styles.volume}>Volume: {item.volume}</Text>
          <Text style={styles.forecast}>
            Forecast: {item.forecast}
          </Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.alertButton}>
        <Bell size={16} color="#3B82F6" />
        <Text style={styles.alertButtonText}>Set Price Alert</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Market Prices</Text>
        <Text style={styles.headerSubtitle}>बाजार की कीमतें</Text>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search crops..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.voiceButton}>
              <Mic size={20} color="#3B82F6" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Location Selector */}
      <View style={styles.locationContainer}>
        <MapPin size={16} color="#6B7280" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.locationScroll}>
          {locations.map((location) => (
            <TouchableOpacity
              key={location}
              style={[
                styles.locationChip,
                selectedLocation === location && styles.locationChipActive
              ]}
              onPress={() => setSelectedLocation(location)}
            >
              <Text style={[
                styles.locationText,
                selectedLocation === location && styles.locationTextActive
              ]}>
                {location}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Category Filter */}
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipActive
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <BarChart3 size={24} color="#22C55E" />
          <Text style={styles.statValue}>₹2,180</Text>
          <Text style={styles.statLabel}>Avg. Wheat Price</Text>
        </View>
        <View style={styles.statCard}>
          <TrendingUp size={24} color="#3B82F6" />
          <Text style={styles.statValue}>+12%</Text>
          <Text style={styles.statLabel}>Weekly Growth</Text>
        </View>
        <View style={styles.statCard}>
          <Calendar size={24} color="#F59E0B" />
          <Text style={styles.statValue}>Mon-Wed</Text>
          <Text style={styles.statLabel}>Best Selling Days</Text>
        </View>
      </View>

      {/* Active Price Alerts */}
      <View style={styles.alertsSection}>
        <Text style={styles.sectionTitle}>Price Alerts</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {priceAlerts.map((alert) => (
            <View key={alert.id} style={[
              styles.alertCard,
              { borderLeftColor: alert.status === 'triggered' ? '#22C55E' : '#F59E0B' }
            ]}>
              <Text style={styles.alertCrop}>{alert.crop}</Text>
              <Text style={styles.alertTarget}>Target: {formatPrice(alert.targetPrice)}</Text>
              <Text style={styles.alertCurrent}>Current: {formatPrice(alert.currentPrice)}</Text>
              <View style={[
                styles.alertStatus,
                { backgroundColor: alert.status === 'triggered' ? '#DCFCE7' : '#FEF3C7' }
              ]}>
                <Text style={[
                  styles.alertStatusText,
                  { color: alert.status === 'triggered' ? '#22C55E' : '#F59E0B' }
                ]}>
                  {alert.status === 'triggered' ? 'Triggered' : 'Active'}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Market Data List */}
      <FlatList
        data={filteredData}
        renderItem={({ item }) => <MarketCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
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
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 16,
  },
  searchContainer: {
    marginBottom: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    marginLeft: 12,
  },
  voiceButton: {
    padding: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  locationScroll: {
    marginLeft: 8,
  },
  locationChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
  },
  locationChipActive: {
    backgroundColor: '#3B82F6',
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  locationTextActive: {
    color: '#FFFFFF',
  },
  categoryContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
  },
  categoryChipActive: {
    backgroundColor: '#22C55E',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  alertsSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 12,
  },
  alertCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    minWidth: 150,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  alertCrop: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  alertTarget: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 2,
  },
  alertCurrent: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 8,
  },
  alertStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  alertStatusText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
  },
  listContainer: {
    padding: 20,
    paddingTop: 0,
  },
  marketCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cropInfo: {
    flex: 1,
  },
  cropName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  marketName: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  priceInfo: {
    alignItems: 'flex-end',
  },
  currentPrice: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#22C55E',
  },
  unit: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  cardDetails: {
    marginBottom: 12,
  },
  changeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  changeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  changeText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 4,
  },
  quality: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  volumeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  volume: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  forecast: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#3B82F6',
  },
  alertButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 8,
    borderRadius: 8,
  },
  alertButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#3B82F6',
    marginLeft: 4,
  },
});