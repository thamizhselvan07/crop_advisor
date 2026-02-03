import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, MapPin, Phone, Mail, Settings, Bell, Moon, Globe, CircleHelp as HelpCircle, FileText, LogOut, CreditCard as Edit3, ChevronRight, Camera, Smartphone, Wifi, Download } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

export default function ProfileScreen() {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState('en');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
        language,
      });
      Alert.alert('Success', 'User registered successfully');
    } catch (error) {
      Alert.alert('Error', error.response?.data?.error || 'Registration failed');
    }
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('register')}</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('name')}</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder={t('name')}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('email')}</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder={t('email')}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('password')}</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder={t('password')}
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('language')}</Text>
            <View style={styles.languageButtons}>
              <TouchableOpacity
                style={[styles.langButton, language === 'en' && styles.langButtonActive]}
                onPress={() => changeLanguage('en')}
              >
                <Text style={[styles.langText, language === 'en' && styles.langTextActive]}>English</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.langButton, language === 'hi' && styles.langButtonActive]}
                onPress={() => changeLanguage('hi')}
              >
                <Text style={[styles.langText, language === 'hi' && styles.langTextActive]}>हिंदी</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.langButton, language === 'ta' && styles.langButtonActive]}
                onPress={() => changeLanguage('ta')}
              >
                <Text style={[styles.langText, language === 'ta' && styles.langTextActive]}>தமிழ்</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleRegister}>
            <Text style={styles.submitText}>{t('submit')}</Text>
          </TouchableOpacity>
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
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  form: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#111827',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  languageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  langButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: '#FFFFFF',
  },
  langButtonActive: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  langText: {
    fontSize: 16,
    color: '#111827',
  },
  langTextActive: {
    color: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#22C55E',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
});