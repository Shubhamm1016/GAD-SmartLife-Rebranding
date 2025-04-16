import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
 
const NetworkStatus = () => {
    const [isConnected, setIsConnected] = useState(true);
    const [connectionType, setConnectionType] = useState('');
    const [linkSpeed, setLinkSpeed] = useState(null);
    const [signalStrength, setSignalStrength] = useState(null);
    const [slowConnection, setSlowConnection] = useState(false);
    const [cellularGeneration, setCellularGeneration] = useState('');
    const [connectionStatus, setConnectionStatus] = useState(null);
 
    const MAX_RETRIES = 1;
    const TIMEOUT = 500; // 5 seconds
 
    const checkSpeed = async (retryCount = 0) => {
        try {
            const source = axios.CancelToken.source();
            const timeoutId = setTimeout(() => {
                source.cancel();
            }, TIMEOUT);
 
            await axios.get('https://www.google.com/generate_204', {
                cancelToken: source.token,
            });
 
            clearTimeout(timeoutId);
            setSlowConnection(false);
        } catch (error) {
            if (axios.isCancel(error)) {
                if (retryCount < MAX_RETRIES) {
                    checkSpeed(retryCount + 1);
                } else {
                    setSlowConnection(true);
                }
            } else {
                console.error('Error measuring network speed:', error);
                setSlowConnection(true);
            }
        }
    };
 
    const getConnectionStatus = () => {
        if (!isConnected) return 'No internet connection';
        if (slowConnection) return 'Poor internet connection';
        if (connectionType === 'wifi') {
            if (linkSpeed !== null && linkSpeed < 40) return 'Poor internet connection';
            if (signalStrength !== null && signalStrength < 50) return 'Poor internet connection';
        } else if (connectionType === 'cellular') {
            if (cellularGeneration) {
                if (cellularGeneration === '2g' || cellularGeneration === '3g') return 'Poor internet connection';
            }
        }
        return 'Good internet connection';
    };
 
    useEffect(() => {
        const handleConnectionChange = async (state) => {
            setIsConnected(state.isConnected);
            setConnectionType(state.type);
            if (state.type === 'wifi') {
                setLinkSpeed(state.details?.linkSpeed ?? null);
                setSignalStrength(state.details?.strength ?? null);
            } else if (state.type === 'cellular') {
                setCellularGeneration(state.details?.cellularGeneration ?? '');
            }
            console.log('Network connection state:', state);
            setConnectionStatus(getConnectionStatus());
            await checkSpeed(); // Check speed immediately on network change
            setConnectionStatus(getConnectionStatus()); // Update status after speed check
        };
 
        const unsubscribe = NetInfo.addEventListener(handleConnectionChange);
 
        const intervalId = setInterval(async () => {
            await checkSpeed();
            setConnectionStatus(getConnectionStatus());
        }, 500); // Check every 5 seconds
 
        return () => {
            unsubscribe();
            clearInterval(intervalId);
        };
    }, [isConnected, connectionType, linkSpeed, signalStrength, slowConnection, cellularGeneration]);
 
    return (
        <View style={styles.container}>
            {connectionStatus && (
                <Text style={styles.statusText}>{connectionStatus}</Text>
            )}
        </View>
    );
};
 
const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
    },
    statusText: {
        color: 'red',
        fontWeight: 'bold',
    },
});
 
export default NetworkStatus;