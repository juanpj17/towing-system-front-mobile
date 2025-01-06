import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert } from "react-native";
import messaging from "@react-native-firebase/messaging"
import React, {useEffect} from "react";

export default function PushNotification(){
    const requestUserPermision = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled = 
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) console.log("Authorization status:", authStatus);
    }

    useEffect(() => {
        if(requestUserPermision()){
            messaging().
                getToken()
                .then((token) => {
                    console.log(token)
                })
        } else {
            console.log("Permission not granted", authStatus)
        }
        
        messaging().
            getInitialNotification().
                then(async (remoteMessage) => 
                    {
                        if(remoteMessage) console.log("Notification caused app open from quit state: ", remoteMessage.notification)
                    }
                )

        messaging().onNotificationOpenedApp((remoteMessage) => {
            console.log(
                "notification caused app to open from background state:",
                remoteMessage.notification
            )
        });

        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
            console.log("Message hanled in the background!", remoteMessage)
        });

        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
        })
        
        return unsubscribe;
     }, []);

     return (
        <View style={styles.container}>
            <Text>Push Notifications Configured!</Text>
            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

