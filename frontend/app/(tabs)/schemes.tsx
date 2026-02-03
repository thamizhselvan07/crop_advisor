import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, FileText, CircleCheck as CheckCircle, Clock, DollarSign, Users, MapPin, Download, ExternalLink, X, CircleAlert as AlertCircle } from 'lucide-react-native';

export default function SchemesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedScheme, setSelectedScheme] = useState<any>(null);
  const [showEligibilityModal, setShowEligibilityModal] = useState(false);

  const categories = [
    'All', 'Seeds', 'Irrigation', 'Equipment', 'Loans', 'Insurance', 'Training'
  ];

  const schemes = [
    {
      id: 1,
      title: 'PM-KISAN Samman Nidhi',
      category: 'Direct Benefit',
      description: 'Direct income support to farmer families',
      benefit: '₹6,000 per year',
      eligibility: ['Small & marginal farmers', 'Land holding up to 2 hectares'],
      documents: ['Aadhaar Card', 'Land Documents', 'Bank Account'],
      applicationMode: 'Online/Offline',
      deadline: 'Open throughout year',
      status: 'Active',
      website: 'pmkisan.gov.in',
      helpline: '155261',
    },
    {
      id: 2,
      title: 'Pradhan Mantri Fasal Bima Yojana',
      category: 'Insurance',
      description: 'Crop insurance for farmers against natural calamities',
      benefit: 'Up to 90% premium subsidy',
      eligibility: ['All farmers', 'Sharecroppers included'],
      documents: ['Aadhaar Card', 'Land Records', 'Bank Account', 'Sowing Certificate'],
      applicationMode: 'Through banks/CSCs',
      deadline: 'Before sowing season',
      status: 'Active',
      website: 'pmfby.gov.in',
      helpline: '14447',
    },
    {
      id: 3,
      title: 'Kisan Credit Card',
      category: 'Loans',
      description: 'Credit support for agriculture and allied activities',
      benefit: 'Crop loan up to ₹3 lakh at 4% interest',
      eligibility: ['All farmers', 'Tenant farmers', 'SHG members'],
      documents: ['Identity Proof', 'Address Proof', 'Land Documents', 'Income Certificate'],
      applicationMode: 'Through banks',
      deadline: 'Open throughout year',
      status: 'Active',
      website: 'kcc.gov.in',
      helpline: '1800-180-1551',
    },
    {
      id: 4,
      title: 'Sub-Mission on Agricultural Mechanization',
      category: 'Equipment',
      description: 'Financial assistance for farm mechanization',
      benefit: '40-50% subsidy on farm equipment',
      eligibility: ['Individual farmers', 'Farmer groups', 'Custom hiring centers'],
      documents: ['Identity Proof', 'Land Documents', 'Income Certificate', 'Bank Account'],
      applicationMode: 'Through state agriculture departments',
      deadline: 'As per state notification',
      status: 'Active',
      website: 'agrimachinery.nic.in',
      helpline: '011-23382012',
    },
    {
      id: 5,
      title: 'National Horticulture Mission',
      category: 'Seeds',
      description: 'Support for horticulture development',
      benefit: 'Up to 50% subsidy on planting material',
      eligibility: ['Individual farmers', 'Farmer groups', 'NGOs'],
      documents: ['Identity Proof', 'Land Documents', 'Project Report'],
      applicationMode: 'Through state horticulture departments',
      deadline: 'As per state calendar',
      status: 'Active',
      website: 'nhm.nic.in',
      helpline: '011-23070544',
    },
  ];

  const eligibilityQuestions = [
    {
      id: 1,
      question: 'Do you own agricultural land?',
      type: 'yes_no',
      key: 'hasLand',
    },
    {
      id: 2,
      question: 'What is your land holding size?',
      type: 'select',
      options: ['Less than 1 hectare', '1-2 hectares', '2-5 hectares', 'More than 5 hectares'],
      key: 'landSize',
    },
    {
      id: 3,
      question: 'Are you a member of any farmer group?',
      type: 'yes_no',
      key: 'farmerGroup',
    },
    {
      id: 4,
      question: 'Do you have a bank account?',
      type: 'yes_no',
      key: 'bankAccount',
    },
  ];

  const [eligibilityAnswers, setEligibilityAnswers] = useState<Record<string, any>>({});

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || scheme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEligibilityAnswer = (key: string, value: any) => {
    setEligibilityAnswers(prev => ({ ...prev, [key]: value }));
  };

  const SchemeCard = ({ scheme }: { scheme: any }) => (
    <TouchableOpacity
      style={styles.schemeCard}
      onPress={() => setSelectedScheme(scheme)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.schemeInfo}>
          <Text style={styles.schemeTitle}>{scheme.title}</Text>
          <Text style={styles.schemeCategory}>{scheme.category}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { backgroundColor: scheme.status === 'Active' ? '#DCFCE7' : '#FEE2E2' }
        ]}>
          <Text style={[
            styles.statusText,
            { color: scheme.status === 'Active' ? '#22C55E' : '#EF4444' }
          ]}>
            {scheme.status}
          </Text>
        </View>
      </View>
      
      <Text style={styles.schemeDescription}>{scheme.description}</Text>
      
      <View style={styles.benefitContainer}>
        <DollarSign size={16} color="#22C55E" />
        <Text style={styles.benefitText}>{scheme.benefit}</Text>
      </View>
      
      <View style={styles.cardFooter}>
        <View style={styles.metaInfo}>
          <Clock size={14} color="#6B7280" />
          <Text style={styles.metaText}>{scheme.deadline}</Text>
        </View>
        <TouchableOpacity
          style={styles.eligibilityButton}
          onPress={() => setShowEligibilityModal(true)}
        >
          <Text style={styles.eligibilityButtonText}>Check Eligibility</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Government Schemes</Text>
        <Text style={styles.headerSubtitle}>सरकारी योजनाएं</Text>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search schemes..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>
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
          <FileText size={24} color="#3B82F6" />
          <Text style={styles.statValue}>{filteredSchemes.length}</Text>
          <Text style={styles.statLabel}>Available Schemes</Text>
        </View>
        <View style={styles.statCard}>
          <CheckCircle size={24} color="#22C55E" />
          <Text style={styles.statValue}>
            {schemes.filter(s => s.status === 'Active').length}
          </Text>
          <Text style={styles.statLabel}>Active Schemes</Text>
        </View>
        <View style={styles.statCard}>
          <Clock size={24} color="#F59E0B" />
          <Text style={styles.statValue}>3</Text>
          <Text style={styles.statLabel}>Ending Soon</Text>
        </View>
      </View>

      {/* Schemes List */}
      <ScrollView
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredSchemes.map((scheme) => (
          <SchemeCard key={scheme.id} scheme={scheme} />
        ))}
      </ScrollView>

      {/* Scheme Details Modal */}
      <Modal
        visible={!!selectedScheme}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        {selectedScheme && (
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedScheme.title}</Text>
              <TouchableOpacity onPress={() => setSelectedScheme(null)}>
                <X size={24} color="#374151" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              <View style={styles.schemeDetailCard}>
                <Text style={styles.detailTitle}>Description</Text>
                <Text style={styles.detailText}>{selectedScheme.description}</Text>
              </View>

              <View style={styles.schemeDetailCard}>
                <Text style={styles.detailTitle}>Benefit</Text>
                <Text style={styles.benefitDetailText}>{selectedScheme.benefit}</Text>
              </View>

              <View style={styles.schemeDetailCard}>
                <Text style={styles.detailTitle}>Eligibility Criteria</Text>
                {selectedScheme.eligibility.map((criteria: string, index: number) => (
                  <View key={index} style={styles.eligibilityItem}>
                    <CheckCircle size={16} color="#22C55E" />
                    <Text style={styles.eligibilityText}>{criteria}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.schemeDetailCard}>
                <Text style={styles.detailTitle}>Required Documents</Text>
                {selectedScheme.documents.map((doc: string, index: number) => (
                  <View key={index} style={styles.documentItem}>
                    <FileText size={16} color="#3B82F6" />
                    <Text style={styles.documentText}>{doc}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.schemeDetailCard}>
                <Text style={styles.detailTitle}>Application Information</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Application Mode:</Text>
                  <Text style={styles.infoValue}>{selectedScheme.applicationMode}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Deadline:</Text>
                  <Text style={styles.infoValue}>{selectedScheme.deadline}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Helpline:</Text>
                  <Text style={styles.infoValue}>{selectedScheme.helpline}</Text>
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Download size={20} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>Download Forms</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.websiteButton]}>
                <ExternalLink size={20} color="#374151" />
                <Text style={[styles.actionButtonText, styles.websiteButtonText]}>Visit Website</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
      </Modal>

      {/* Eligibility Checker Modal */}
      <Modal
        visible={showEligibilityModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Eligibility Checker</Text>
            <TouchableOpacity onPress={() => setShowEligibilityModal(false)}>
              <X size={24} color="#374151" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.eligibilityIntro}>
              <AlertCircle size={24} color="#3B82F6" />
              <Text style={styles.eligibilityIntroText}>
                Answer these questions to check your eligibility for government schemes
              </Text>
            </View>

            {eligibilityQuestions.map((question, index) => (
              <View key={question.id} style={styles.questionCard}>
                <Text style={styles.questionText}>
                  {index + 1}. {question.question}
                </Text>
                
                {question.type === 'yes_no' ? (
                  <View style={styles.yesNoContainer}>
                    <TouchableOpacity
                      style={[
                        styles.yesNoButton,
                        eligibilityAnswers[question.key] === 'yes' && styles.yesNoButtonActive
                      ]}
                      onPress={() => handleEligibilityAnswer(question.key, 'yes')}
                    >
                      <Text style={[
                        styles.yesNoButtonText,
                        eligibilityAnswers[question.key] === 'yes' && styles.yesNoButtonTextActive
                      ]}>
                        Yes
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.yesNoButton,
                        eligibilityAnswers[question.key] === 'no' && styles.yesNoButtonActive
                      ]}
                      onPress={() => handleEligibilityAnswer(question.key, 'no')}
                    >
                      <Text style={[
                        styles.yesNoButtonText,
                        eligibilityAnswers[question.key] === 'no' && styles.yesNoButtonTextActive
                      ]}>
                        No
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.selectContainer}>
                    {question.options?.map((option, optionIndex) => (
                      <TouchableOpacity
                        key={optionIndex}
                        style={[
                          styles.selectOption,
                          eligibilityAnswers[question.key] === option && styles.selectOptionActive
                        ]}
                        onPress={() => handleEligibilityAnswer(question.key, option)}
                      >
                        <Text style={[
                          styles.selectOptionText,
                          eligibilityAnswers[question.key] === option && styles.selectOptionTextActive
                        ]}>
                          {option}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </ScrollView>

          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.actionButton}>
              <CheckCircle size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Check Results</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
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
  filterButton: {
    padding: 4,
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
  listContainer: {
    padding: 20,
    paddingTop: 0,
  },
  schemeCard: {
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
    marginBottom: 8,
  },
  schemeInfo: {
    flex: 1,
  },
  schemeTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  schemeCategory: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
  },
  schemeDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  benefitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#22C55E',
    marginLeft: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 4,
  },
  eligibilityButton: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  eligibilityButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#3B82F6',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  schemeDetailCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  detailTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 20,
  },
  benefitDetailText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#22C55E',
  },
  eligibilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eligibilityText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    marginLeft: 8,
    flex: 1,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  documentText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#111827',
  },
  modalActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#22C55E',
    paddingVertical: 16,
    borderRadius: 12,
  },
  websiteButton: {
    backgroundColor: '#F3F4F6',
  },
  actionButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  websiteButtonText: {
    color: '#374151',
  },
  eligibilityIntro: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  eligibilityIntroText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  questionCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  questionText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 12,
  },
  yesNoContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  yesNoButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  yesNoButtonActive: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  yesNoButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  yesNoButtonTextActive: {
    color: '#FFFFFF',
  },
  selectContainer: {
    gap: 8,
  },
  selectOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectOptionActive: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  selectOptionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#374151',
  },
  selectOptionTextActive: {
    color: '#FFFFFF',
  },
});