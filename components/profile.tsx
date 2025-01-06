import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Footer from './ui/footer';
import ProfileCard from './ui/profile-card';

const Profile = () => {
  const profileData = {
    imageUrl: 'https://via.placeholder.com/150',
    name: 'Juan Pérez',
    email: 'juanperez@example.com',
    licenseExpiry: '12/12/2025',
    medicalCertificateExpiry: '15/03/2025',
    id: '12345678',
    status: 'Activo',
    location: 'Caracas, Venezuela',
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Perfil</Text>
        <ProfileCard profileData={profileData} />
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171718',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F66021',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default Profile;
