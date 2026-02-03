import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Camera, Image as ImageIcon, RotateCcw, Zap, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, X, Download, Share } from 'lucide-react-native';

export default function ScannerScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Camera size={80} color="#22C55E" />
          <Text style={styles.permissionTitle}>Camera Permission Required</Text>
          <Text style={styles.permissionText}>
            We need camera access to scan your crops and identify diseases or pests.
          </Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Grant Camera Access</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        setCapturedImage(photo.uri);
        analyzeCrop(photo.uri);
      } catch (error) {
        Alert.alert('Error', 'Failed to capture image. Please try again.');
      }
    }
  };

  const analyzeCrop = (imageUri: string) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResult({
        disease: 'Leaf Spot Disease',
        confidence: 89,
        severity: 'Moderate',
        description: 'Brown spot disease commonly affects wheat crops during humid weather conditions.',
        treatment: {
          immediate: 'Remove affected leaves immediately',
          spray: 'Apply Copper Oxychloride fungicide',
          organic: 'Use neem oil spray as organic alternative',
          prevention: 'Ensure proper field drainage and air circulation',
        },
        cost: '₹150-250 per acre',
        timeline: '7-10 days for visible improvement',
      });
      setIsAnalyzing(false);
      setShowResult(true);
    }, 3000);
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const resetScanner = () => {
    setCapturedImage(null);
    setAnalysisResult(null);
    setShowResult(false);
  };

  const ScanGuide = () => (
    <View style={styles.guideContainer}>
      <Text style={styles.guideTitle}>How to Scan</Text>
      <View style={styles.guideSteps}>
        <View style={styles.guideStep}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepText}>1</Text>
          </View>
          <Text style={styles.stepDescription}>Position leaf/crop in center</Text>
        </View>
        <View style={styles.guideStep}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepText}>2</Text>
          </View>
          <Text style={styles.stepDescription}>Ensure good lighting</Text>
        </View>
        <View style={styles.guideStep}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepText}>3</Text>
          </View>
          <Text style={styles.stepDescription}>Keep camera steady</Text>
        </View>
      </View>
    </View>
  );

  if (capturedImage && !showResult) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.analysisContainer}>
          <Image source={{ uri: capturedImage }} style={styles.capturedImage} />
          {isAnalyzing ? (
            <View style={styles.analyzingContainer}>
              <View style={styles.loader} />
              <Text style={styles.analyzingText}>Analyzing your crop...</Text>
              <Text style={styles.analyzingSubtext}>Please wait while AI examines the image</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.retakeButton} onPress={resetScanner}>
              <Text style={styles.retakeButtonText}>Retake Photo</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Crop Health Scanner</Text>
        <Text style={styles.headerSubtitle}>फसल स्वास्थ्य स्कैनर</Text>
      </View>

      {!capturedImage ? (
        <>
          <View style={styles.cameraContainer}>
            <CameraView
              ref={cameraRef}
              style={styles.camera}
              facing={facing}
            >
              <View style={styles.cameraOverlay}>
                <View style={styles.scanFrame} />
                <Text style={styles.scanInstruction}>
                  Position crop leaf within the frame
                </Text>
              </View>
            </CameraView>
          </View>

          <View style={styles.controls}>
            <TouchableOpacity style={styles.controlButton} onPress={() => {}}>
              <ImageIcon size={24} color="#374151" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <View style={styles.captureInner} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.controlButton} onPress={toggleCameraFacing}>
              <RotateCcw size={24} color="#374151" />
            </TouchableOpacity>
          </View>

          <ScanGuide />
        </>
      ) : null}

      {/* Results Modal */}
      <Modal
        visible={showResult}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Scan Results</Text>
            <TouchableOpacity onPress={() => setShowResult(false)}>
              <X size={24} color="#374151" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <Image source={{ uri: capturedImage! }} style={styles.resultImage} />
            
            <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <AlertTriangle size={32} color="#F59E0B" />
                <View style={styles.resultInfo}>
                  <Text style={styles.diseaseName}>{analysisResult?.disease}</Text>
                  <Text style={styles.confidence}>
                    {analysisResult?.confidence}% confidence
                  </Text>
                </View>
                <View style={[
                  styles.severityBadge,
                  { backgroundColor: '#FEF3C7' }
                ]}>
                  <Text style={styles.severityText}>{analysisResult?.severity}</Text>
                </View>
              </View>
              
              <Text style={styles.description}>{analysisResult?.description}</Text>
            </View>

            <View style={styles.treatmentCard}>
              <Text style={styles.treatmentTitle}>Treatment Plan</Text>
              
              <View style={styles.treatmentStep}>
                <CheckCircle size={20} color="#22C55E" />
                <View style={styles.treatmentContent}>
                  <Text style={styles.treatmentLabel}>Immediate Action</Text>
                  <Text style={styles.treatmentText}>{analysisResult?.treatment.immediate}</Text>
                </View>
              </View>

              <View style={styles.treatmentStep}>
                <Zap size={20} color="#3B82F6" />
                <View style={styles.treatmentContent}>
                  <Text style={styles.treatmentLabel}>Chemical Treatment</Text>
                  <Text style={styles.treatmentText}>{analysisResult?.treatment.spray}</Text>
                </View>
              </View>

              <View style={styles.treatmentStep}>
                <CheckCircle size={20} color="#10B981" />
                <View style={styles.treatmentContent}>
                  <Text style={styles.treatmentLabel}>Organic Alternative</Text>
                  <Text style={styles.treatmentText}>{analysisResult?.treatment.organic}</Text>
                </View>
              </View>

              <View style={styles.costInfo}>
                <Text style={styles.costLabel}>Estimated Cost:</Text>
                <Text style={styles.costValue}>{analysisResult?.cost}</Text>
              </View>

              <View style={styles.timelineInfo}>
                <Text style={styles.timelineLabel}>Recovery Timeline:</Text>
                <Text style={styles.timelineValue}>{analysisResult?.timeline}</Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Download size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Save Report</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.shareButton]}>
              <Share size={20} color="#374151" />
              <Text style={[styles.actionButtonText, styles.shareButtonText]}>Share</Text>
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
    backgroundColor: '#000000',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
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
    marginTop: 4,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  permissionTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginTop: 20,
    marginBottom: 12,
  },
  permissionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  permissionButton: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  permissionButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  cameraContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 3,
    borderColor: '#22C55E',
    borderRadius: 12,
    borderStyle: 'dashed',
  },
  scanInstruction: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#22C55E',
  },
  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#22C55E',
  },
  guideContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  guideTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  guideSteps: {
    gap: 12,
  },
  guideStep: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  stepDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#374151',
  },
  analysisContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  capturedImage: {
    width: '100%',
    height: '60%',
    resizeMode: 'cover',
  },
  analyzingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loader: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: '#E5E7EB',
    borderTopColor: '#22C55E',
    marginBottom: 20,
  },
  analyzingText: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 8,
  },
  analyzingSubtext: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  retakeButton: {
    backgroundColor: '#22C55E',
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  retakeButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
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
  resultImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  resultCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultInfo: {
    flex: 1,
    marginLeft: 12,
  },
  diseaseName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  confidence: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  severityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  severityText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#92400E',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 20,
  },
  treatmentCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  treatmentTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  treatmentStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  treatmentContent: {
    flex: 1,
    marginLeft: 12,
  },
  treatmentLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginBottom: 4,
  },
  treatmentText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
  costInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    marginBottom: 8,
  },
  costLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
  },
  costValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#22C55E',
  },
  timelineInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timelineLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
  },
  timelineValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#3B82F6',
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
  shareButton: {
    backgroundColor: '#F3F4F6',
  },
  actionButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  shareButtonText: {
    color: '#374151',
  },
});