import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProfileInfoProps {
  title: string;
  value: string | React.ReactNode;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ title, value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F66021',
  },
  value: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default ProfileInfo;
