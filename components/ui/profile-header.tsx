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
