import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ProfileHeader from './profile-header';
import ProfileInfo from './profile-info';

interface ProfileCardProps {
  profileData: {
    imageUrl: string;
    name: string;
    email: string;
    licenseExpiry: string;
    medicalCertificateExpiry: string;
    id: string;
    status: string;
    location: string;
  };
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profileData }) => {
  return (
    <View style={styles.card}>
      <ProfileHeader
        imageUrl={profileData.imageUrl}
        name={profileData.name}
        email={profileData.email}
      />
      <ProfileInfo title="Cédula:" value={profileData.id} />
      <ProfileInfo title="Vencimiento Licencia:" value={profileData.licenseExpiry} />
      <ProfileInfo title="Certificado Médico:" value={profileData.medicalCertificateExpiry} />
      <ProfileInfo
        title="Status:"
        value={profileData.status === 'Activo' ? (
          <Text style={styles.active}>{profileData.status}</Text>
        ) : (
          <Text style={styles.inactive}>{profileData.status}</Text>
        )}
      />
      <ProfileInfo title="Localización:" value={profileData.location} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#292A2D',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    width: '100%',
  },
  active: {
    color: '#00FF00',
  },
  inactive: {
    color: '#FF0000',
  },
});

export default ProfileCard;
