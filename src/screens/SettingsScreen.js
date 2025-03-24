import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    TextInput,
    SafeAreaView,
    Linking,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  ChevronRightIcon } from 'react-native-heroicons/solid';

const fontDMSansRegular = 'DMSans-Regular';

const privacyBerlinAndTermsBtns = [
    {
        id: 2,
        title: 'Privacy Policy',
        link: '',
    },
    {
        id: 1,
        title: 'Terms of Use',
        link: '',
    },
]

const SettingsScreen = ({ selectedBerlinScreen, favorites, setFavorites }) => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    const [firstCurrencyAmount, setFirstCurrencyAmount] = useState('');
    const [secondCurrencyAmount, setSecondCurrencyAmount] = useState('');

    const [firstCurrencyIs, setFirstCurrencyIs] = useState('Dollars ($)');
    const [secondCurrencyIs, setSecondCurrencyIs] = useState('Pound (£)');

    const [firstConvertedResult, setFirstConvertedResult] = useState('');
    const [secondConvertedResult, setSecondConvertedResult] = useState('');

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

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={{
                width: dimensions.width,
                flex: 1,
                zIndex: 1,
                alignItems: 'center',
                position: 'relative',
                width: '100%',
                justifyContent: 'flex-start',
            }}>
                <View style={{
                    width: dimensions.width,
                    borderBottomColor: '#FFFFFF80',
                    borderBottomWidth: dimensions.height * 0.00055,
                    alignSelf: 'center',
                    marginBottom: dimensions.height * 0.01,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: fontDMSansRegular,
                        fontWeight: 700,
                        fontSize: dimensions.width * 0.05,
                        alignItems: 'center',
                        alignSelf: 'center',
                        color: 'white',
                        paddingBottom: dimensions.height * 0.014,
                    }}
                    >
                        Settings
                    </Text>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        width: '100%',
                    }}
                    contentContainerStyle={{
                        paddingBottom: dimensions.height * 0.25,
                    }}
                >
                    <View style={{
                        marginTop: dimensions.height * 0.01,
                        width: dimensions.width * 0.93,
                        alignSelf: 'center',
                        backgroundColor: '#404040',
                        borderRadius: dimensions.width * 0.05,
                        paddingHorizontal: dimensions.width * 0.04,
                        paddingVertical: dimensions.height * 0.016,
                    }}>
                        <Image
                            source={require('../assets/images/settingsImage.png')}
                            style={{
                                width: dimensions.width * 0.37,
                                height: dimensions.width * 0.37,
                                alignSelf: 'center',
                            }}
                            resizeMode='contain'
                        />

                        <Text style={{
                            textAlign: 'left',
                            fontFamily: fontDMSansRegular,
                            fontWeight: 400,
                            fontSize: dimensions.width * 0.043,
                            marginTop: dimensions.height * 0.016,
                            alignSelf: 'flex-start',
                            color: 'white',
                            paddingBottom: dimensions.height * 0.014,
                        }}
                        >
                            Currency Converter
                        </Text>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            alignSelf: 'center',
                        }}>
                            <TextInput
                                placeholder={`${firstCurrencyIs}`}
                                value={firstCurrencyAmount}
                                maxLength={7}
                                onChangeText={(text) => {
                                    setFirstCurrencyAmount(text);
                                    const numericValue = parseFloat(text);
                                    if (isNaN(numericValue)) {
                                        setFirstConvertedResult('');
                                    } else {
                                        if (firstCurrencyIs === 'Dollars ($)') {
                                            setFirstConvertedResult((numericValue * 0.93).toFixed(1));
                                        } else {
                                            setFirstConvertedResult((numericValue * 1.09).toFixed(1));
                                        }
                                    }
                                }}
                                placeholderTextColor="rgba(237, 237, 237, 0.85)"
                                placeholderTextSize={dimensions.width * 0.03}
                                keyboardType='numeric'
                                style={{
                                    maxWidth: dimensions.width * 0.8,
                                    padding: dimensions.width * 0.03,
                                    fontFamily: fontDMSansRegular,
                                    fontSize: firstCurrencyAmount.length > 0 ? dimensions.width * 0.043 : dimensions.width * 0.037,
                                    color: 'white',
                                    height: dimensions.height * 0.059,
                                    alignSelf: 'center',
                                    width: dimensions.width * 0.34,
                                    borderRadius: dimensions.width * 0.025,
                                    backgroundColor: '#5A5A5A',
                                }}
                            />

                            <TouchableOpacity
                                onPress={() => {
                                    const tempAmount = firstCurrencyAmount;
                                    const tempCurrency = firstCurrencyIs;
                                    setFirstCurrencyAmount(firstConvertedResult);
                                    setFirstConvertedResult(tempAmount);

                                    if (firstCurrencyIs === 'Dollars ($)') {
                                        setFirstCurrencyIs('Euros (€)');
                                    } else setFirstCurrencyIs('Dollars ($)');
                                }}
                                style={{
                                    flex: 1
                                }}>
                                <Image
                                    source={require('../assets/icons/changeIcon.png')}
                                    style={{
                                        width: dimensions.width * 0.088,
                                        height: dimensions.width * 0.088,
                                        alignSelf: 'center',
                                    }}
                                    resizeMode='contain'
                                />

                            </TouchableOpacity>

                            <View style={{
                                width: dimensions.width * 0.34,
                                backgroundColor: '#5A5A5A',
                                borderRadius: dimensions.width * 0.025,
                                height: dimensions.height * 0.059,
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingHorizontal: dimensions.width * 0.03,
                            }}>
                                <Text style={{
                                    textAlign: 'left',
                                    alignSelf: 'flex-start',
                                    fontFamily: fontDMSansRegular,
                                    fontWeight: 400,
                                    fontSize: dimensions.width * 0.037,
                                    color: 'white',
                                }}>
                                    {firstCurrencyAmount.replace(/\s/g, '').length === 0 && firstCurrencyIs === 'Dollars ($)' ? 'Euros (€)'
                                        : firstCurrencyAmount.replace(/\s/g, '').length === 0 && firstCurrencyIs !== 'Dollars ($)' ? 'Dollars ($)' : firstConvertedResult} {firstCurrencyAmount.replace(/\s/g, '').length !== 0 ? (firstCurrencyIs === 'Dollars ($)' ? '(€)' : '($)') : ''}
                                </Text>
                            </View>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            alignSelf: 'center',
                            marginTop: dimensions.height * 0.021,
                        }}>
                            <TextInput
                                placeholder={`${secondCurrencyIs}`}
                                value={secondCurrencyAmount}
                                maxLength={7}
                                onChangeText={(text) => {
                                    setSecondCurrencyAmount(text);
                                    const numericValue = parseFloat(text);
                                    if (isNaN(numericValue)) {
                                        setSecondConvertedResult('');
                                    } else {
                                        if (secondCurrencyIs === 'Pound (£)') {
                                            setSecondConvertedResult((numericValue * 1.2).toFixed(1));
                                        } else {
                                            setSecondConvertedResult((numericValue * 0.84).toFixed(1));
                                        }
                                    }
                                }}
                                placeholderTextColor="rgba(237, 237, 237, 0.85)"
                                placeholderTextSize={dimensions.width * 0.03}
                                keyboardType='numeric'
                                style={{
                                    maxWidth: dimensions.width * 0.8,
                                    padding: dimensions.width * 0.03,
                                    fontFamily: fontDMSansRegular,
                                    fontSize: secondCurrencyAmount.length > 0 ? dimensions.width * 0.043 : dimensions.width * 0.037,
                                    color: 'white',
                                    height: dimensions.height * 0.059,
                                    alignSelf: 'center',
                                    width: dimensions.width * 0.34,
                                    borderRadius: dimensions.width * 0.025,
                                    backgroundColor: '#5A5A5A',
                                }}
                            />

                            <TouchableOpacity
                                onPress={() => {
                                    const tempAmount = secondCurrencyAmount;
                                    setSecondCurrencyAmount(secondConvertedResult);
                                    setSecondConvertedResult(tempAmount);

                                    if (secondCurrencyIs === 'Pound (£)') {
                                        setSecondCurrencyIs('Euros (€)');
                                    } else setSecondCurrencyIs('Pound (£)');
                                }}
                                style={{
                                    flex: 1
                                }}>
                                <Image
                                    source={require('../assets/icons/changeIcon.png')}
                                    style={{
                                        width: dimensions.width * 0.088,
                                        height: dimensions.width * 0.088,
                                        alignSelf: 'center',
                                    }}
                                    resizeMode='contain'
                                />

                            </TouchableOpacity>

                            <View style={{
                                width: dimensions.width * 0.34,
                                backgroundColor: '#5A5A5A',
                                borderRadius: dimensions.width * 0.025,
                                height: dimensions.height * 0.059,
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingHorizontal: dimensions.width * 0.03,
                            }}>
                                <Text style={{
                                    textAlign: 'left',
                                    alignSelf: 'flex-start',
                                    fontFamily: fontDMSansRegular,
                                    fontWeight: 400,
                                    fontSize: dimensions.width * 0.037,
                                    color: 'white',
                                }}>
                                    {secondCurrencyAmount.replace(/\s/g, '').length === 0 && secondCurrencyIs === 'Pound (£)' ? 'Euros (€)'
                                        : secondCurrencyAmount.replace(/\s/g, '').length === 0 && secondCurrencyIs !== 'Pound (£)' ? 'Pound (£)' : secondConvertedResult} {secondCurrencyAmount.replace(/\s/g, '').length !== 0 ? (secondCurrencyIs === 'Pound (£)' ? '(€)' : '(£)') : ''}
                                </Text>
                            </View>
                        </View>

                    </View>

                    <View style={{
                        marginTop: dimensions.height * 0.008,
                        width: '100%',
                    }}>
                        {privacyBerlinAndTermsBtns.map((button) => (
                            <TouchableOpacity
                                key={button.id}
                                onPress={() => {
                                    Linking.openURL(button.link);
                                }}
                                style={{
                                    backgroundColor: '#404040',
                                    alignItems: 'center',
                                    borderRadius: dimensions.width * 0.034,
                                    marginBottom: dimensions.height * 0.008,
                                    alignSelf: 'center',
                                    width: dimensions.width * 0.93,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    paddingVertical: dimensions.height * 0.019,
                                    paddingHorizontal: dimensions.width * 0.05,
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: fontDMSansRegular,
                                        color: 'white',
                                        fontSize: dimensions.width * 0.043,
                                        textAlign: 'center',
                                        fontWeight: 400,
                                    }}>
                                    {button.title}
                                </Text>
                                <ChevronRightIcon size={dimensions.height * 0.025} color='white' />
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={{
                        textAlign: 'left',
                        fontFamily: fontDMSansRegular,
                        fontWeight: 400,
                        fontSize: dimensions.width * 0.043,
                        marginTop: dimensions.height * 0.019,
                        alignSelf: 'flex-start',
                        color: 'white',
                        paddingHorizontal: dimensions.width * 0.05,
                    }}
                    >
                        Visited Places
                    </Text>
                    {visited.length > 0 ? (
                        visited.map((item, index) => (
                            <View
                                key={index}
                                onPress={() => {
                                }}
                                style={{
                                    alignSelf: 'center',
                                    width: dimensions.width * 0.95,
                                    marginBottom: dimensions.height * 0.021,
                                    marginTop: dimensions.height * 0.01,
                                    zIndex: 500
                                }}
                            >
                                <Image
                                    source={item.bthImage}
                                    style={{
                                        width: dimensions.width * 0.93,
                                        height: dimensions.height * 0.25,
                                        alignSelf: 'center',
                                        textAlign: 'center',
                                        borderRadius: dimensions.width * 0.03,
                                    }}
                                    resizeMode="stretch"
                                />
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: dimensions.width * 0.97,
                                }}>
                                    <Text
                                        style={{
                                            fontFamily: fontDMSansRegular,
                                            fontSize: dimensions.width * 0.046,
                                            color: 'white',
                                            padding: dimensions.width * 0.021,
                                            fontWeight: 600,
                                            maxWidth: dimensions.width * 0.9,
                                        }}
                                    >
                                        {item.bthTitle}
                                    </Text>
                                </View>
                            </View>
                        ))

                    ) : (
                        <View style={{
                            width: dimensions.width * 0.95,
                            alignSelf: 'center',
                            backgroundColor: '#404040',
                            borderRadius: dimensions.width * 0.034,
                            paddingVertical: dimensions.height * 0.019,
                            paddingHorizontal: dimensions.width * 0.16,
                            marginTop: dimensions.height * 0.01,
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                fontFamily: fontDMSansRegular,
                                fontWeight: 400,
                                fontSize: dimensions.width * 0.043,
                                alignSelf: 'center',
                                color: 'white',
                                paddingHorizontal: dimensions.width * 0.05,
                            }}
                            >
                                You have no visited places yet
                            </Text>
                        </View>
                    )}
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

export default SettingsScreen;
