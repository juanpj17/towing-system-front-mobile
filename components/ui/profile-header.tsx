import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface ProfileHeaderProps {
  imageUrl: string;
  name: string;
  email: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ imageUrl, name, email }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.profileImage} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#F66021',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F66021',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 20,
  },
});

export default ProfileHeader;
