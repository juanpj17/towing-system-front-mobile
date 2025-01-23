import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ProfileHeader from './profile-header';

interface ProfileCardProps {
  profileData: {
    imageUrl: string;
    name: string;
    email: string;
    licenseExpiry: string;
    medicalCertificateExpiry: string;
    id: number;
    status: string;
    location: string;
  };
}

interface ProfileInfoProps {
  title: string;
  value: string | number | React.ReactNode;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ title, value }) => {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.infoTitle}>{title}</Text>
      <View style={styles.valueContainer}>
        {typeof value === 'string' || typeof value === 'number' ? (
          <Text style={styles.infoValue}>{value}</Text>
        ) : (
          value
        )}
      </View>
    </View>
  );
};

const ProfileCard: React.FC<ProfileCardProps> = ({ profileData }) => {
  return (
    <View style={styles.card}>
      <ProfileHeader
        imageUrl={profileData.imageUrl}
        name={profileData.name}
        email={profileData.email}
      />
      <View style={styles.contentContainer}>
        <View style={styles.column}>
          <ProfileInfo title="Cédula:" value={profileData.id} />
          <ProfileInfo title="Vencimiento Licencia:" value={profileData.licenseExpiry} />
          <ProfileInfo title="Status:"
            value={profileData.status === 'Activo' ? (
              <Text style={styles.active}>{profileData.status}</Text>
            ) : (
              <Text style={styles.inactive}>{profileData.status}</Text>
            )}
          />
        </View>
        <View style={styles.column}>
          <ProfileInfo title="Certificado Médico:" value={profileData.medicalCertificateExpiry} />
          <ProfileInfo title="Localización:" value={profileData.location} />
        </View>
      </View>
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
    width: '100%',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  column: {
    flex: 1,
    paddingHorizontal: 10,
  },
  infoContainer: {
    marginVertical: 5,
  },
  infoTitle: {
    color: '#888',
    marginBottom: 4,
  },
  valueContainer: {
    flex: 1,
  },
  infoValue: {
    color: '#FFF',
    flexWrap: 'wrap',
  },
  active: {
    color: '#00FF00',
  },
  inactive: {
    color: '#FF0000',
  },
});

export default ProfileCard;