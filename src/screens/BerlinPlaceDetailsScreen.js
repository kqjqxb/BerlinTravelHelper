import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ChevronLeftIcon } from 'react-native-heroicons/solid';

const fontDMSansRegular = 'DMSans-Regular';

const BerlinPlaceDetailsScreen = ({ setSelectedBerlinScreen, selectedBerlinScreen, selectedPlace, selectedBerlinPlace }) => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    const [visited, setVisited] = useState([]);

    useEffect(() => {
        const fetchVisitedPlaces = async () => {
            try {
                const saved = await AsyncStorage.getItem('visited');
                setVisited(saved ? JSON.parse(saved) : []);
            } catch (error) {
                console.error('error  visited:', error);
            }
        };

        fetchVisitedPlaces();
    }, [selectedBerlinScreen,]);

    const handleVisited = async (favourite) => {
        try {
            const visitedPlaces = await AsyncStorage.getItem('visited');
            const parsedPlaces = visitedPlaces ? JSON.parse(visitedPlaces) : [];

            const visitedPlaceIndex = parsedPlaces.findIndex((fav) => fav.id === favourite.id);

            if (visitedPlaceIndex === -1) {
                const updatedVisited = [favourite, ...parsedPlaces];
                await AsyncStorage.setItem('visited', JSON.stringify(updatedVisited));
                setVisited(updatedVisited);
            } else {
                const updatedVisited = parsedPlaces.filter((fav) => fav.id !== favourite.id);
                await AsyncStorage.setItem('visited', JSON.stringify(updatedVisited));
                setVisited(updatedVisited);
            }
        } catch (error) {
            console.error('Error mark like visited place:', error);
        }
    };

    const isVisited = (place) => {
        return visited.some((vis) => vis.id === place.id);
    };
    
    return (
        <SafeAreaView style={{
            width: dimensions.width,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            position: 'relative',
            width: '100%',
            zIndex: 1
        }} >
            <View style={{
                width: dimensions.width * 0.9,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignSelf: 'center',
                paddingBottom: dimensions.height * 0.01,
            }}>
                <TouchableOpacity
                    onPress={() => {
                        setSelectedBerlinScreen('Home');
                    }}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <ChevronLeftIcon size={dimensions.height * 0.034} color='#FF0000' />
                    <Text
                        style={{
                            fontFamily: fontDMSansRegular,
                            color: '#FF0000',
                            fontSize: dimensions.width * 0.05,
                            textAlign: 'left',
                            fontWeight: 400,
                            paddingHorizontal: dimensions.width * 0.012,
                        }}>
                        Back
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={{
                width: dimensions.width,
                alignSelf: 'center',
            }} showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: dimensions.height * 0.16,
                }}
            >
                <Image
                    source={selectedBerlinPlace?.bthImage}
                    style={{
                        width: dimensions.width,
                        height: dimensions.height * 0.23,
                        borderRadius: dimensions.width * 0.055555,
                        alignSelf: 'center',
                        marginTop: dimensions.height * 0.02,
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                    }}
                    resizeMode='stretch'
                />

                <Text
                    style={{
                        fontFamily: fontDMSansRegular,
                        color: 'white',
                        fontSize: dimensions.width * 0.055,
                        textAlign: 'left',
                        alignSelf: 'flex-start',
                        fontWeight: 600,
                        paddingHorizontal: dimensions.width * 0.05,
                        marginTop: dimensions.height * 0.012,
                    }}>
                    {selectedBerlinPlace?.bthTitle}
                </Text>

                <Text
                    style={{
                        fontFamily: fontDMSansRegular,
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontSize: dimensions.width * 0.037,
                        textAlign: 'left',
                        alignSelf: 'flex-start',
                        fontWeight: 400,
                        paddingHorizontal: dimensions.width * 0.05,
                        marginTop: dimensions.height * 0.016,
                    }}>
                    History
                </Text>

                <Text
                    style={{
                        fontFamily: fontDMSansRegular,
                        color: 'white',
                        fontSize: dimensions.width * 0.04,
                        textAlign: 'left',
                        alignSelf: 'flex-start',
                        fontWeight: 400,
                        paddingHorizontal: dimensions.width * 0.05,
                        marginTop: dimensions.height * 0.01,
                    }}>
                    {selectedBerlinPlace?.bthHistory}
                </Text>

                <Text
                    style={{
                        fontFamily: fontDMSansRegular,
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontSize: dimensions.width * 0.037,
                        textAlign: 'left',
                        alignSelf: 'flex-start',
                        fontWeight: 400,
                        paddingHorizontal: dimensions.width * 0.05,
                        marginTop: dimensions.height * 0.016,
                    }}>
                    Address
                </Text>

                <Text
                    style={{
                        fontFamily: fontDMSansRegular,
                        color: 'white',
                        fontSize: dimensions.width * 0.04,
                        textAlign: 'left',
                        alignSelf: 'flex-start',
                        fontWeight: 400,
                        paddingHorizontal: dimensions.width * 0.05,
                        marginTop: dimensions.height * 0.005,
                    }}>
                    {selectedBerlinPlace?.bthAddress}
                </Text>

                <Text
                    style={{
                        fontFamily: fontDMSansRegular,
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontSize: dimensions.width * 0.037,
                        textAlign: 'left',
                        alignSelf: 'flex-start',
                        fontWeight: 400,
                        paddingHorizontal: dimensions.width * 0.05,
                        marginTop: dimensions.height * 0.016,
                    }}>
                    Entrance
                </Text>

                <Text
                    style={{
                        fontFamily: fontDMSansRegular,
                        color: 'white',
                        fontSize: dimensions.width * 0.04,
                        textAlign: 'left',
                        alignSelf: 'flex-start',
                        fontWeight: 400,
                        paddingHorizontal: dimensions.width * 0.05,
                        marginTop: dimensions.height * 0.005,
                    }}>
                    {selectedBerlinPlace?.bthEntrance}
                </Text>

                <Text
                    style={{
                        fontFamily: fontDMSansRegular,
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontSize: dimensions.width * 0.037,
                        textAlign: 'left',
                        alignSelf: 'flex-start',
                        fontWeight: 400,
                        paddingHorizontal: dimensions.width * 0.05,
                        marginTop: dimensions.height * 0.016,
                    }}>
                    Tips
                </Text>

                <Text
                    style={{
                        fontFamily: fontDMSansRegular,
                        color: 'white',
                        fontSize: dimensions.width * 0.04,
                        textAlign: 'left',
                        alignSelf: 'flex-start',
                        fontWeight: 400,
                        paddingHorizontal: dimensions.width * 0.05,
                        marginTop: dimensions.height * 0.005,
                    }}>
                    {selectedBerlinPlace?.bthTips}
                </Text>

                <TouchableOpacity 
                    onPress={() => handleVisited(selectedBerlinPlace)}
                style={{
                    width: dimensions.width * 0.9,
                    height: dimensions.height * 0.059,
                    backgroundColor: isVisited(selectedBerlinPlace) ? '#848484' : '#FF0000',
                    borderRadius: dimensions.width * 0.034,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: dimensions.height * 0.021,
                }}>
                    <Text
                        style={{
                            fontFamily: fontDMSansRegular,
                            color: 'white',
                            fontSize: dimensions.width * 0.05,
                            textAlign: 'center',
                            alignSelf: 'center',
                            fontWeight: 600,
                            paddingHorizontal: dimensions.width * 0.05,
                        }}>
                        Mark as {!isVisited(selectedBerlinPlace) ? 'visited' : 'not visited'}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default BerlinPlaceDetailsScreen;
