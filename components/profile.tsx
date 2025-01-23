import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Footer from './ui/footer';
import ProfileCard from './ui/profile-card';
import { useDriver } from '../context/driver-context'

const Profile = () => {
  const { driver } = useDriver()
  
  const profileData = {
    imageUrl: 'https://via.placeholder.com/150',
    name: driver.Name,
    email: driver.Email,
    licenseExpiry: driver.DrivingLicenseExpiranseDate.toString(),
    medicalCertificateExpiry: driver.MedicalCerificateExpiranseDate.toString(),
    id: driver.IdentificationNumber,
    status: driver.Status,
    location: driver.Location,
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