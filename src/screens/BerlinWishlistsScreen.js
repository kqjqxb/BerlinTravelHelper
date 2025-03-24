import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    SafeAreaView,
    ScrollView,
    Alert,
    Modal,
    TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import * as ImagePicker from 'react-native-image-picker';
import popularSouvenirsData from '../components/popularSouvenirsData';

const fontDMSansRegular = 'DMSans-Regular';


const BerlinWishlistsScreen = ({ setSelectedBerlinScreen, selectedBerlinScreen }) => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    const [modalVisible, setModalVisible] = useState(false);
    const [modalDetailsVisible, setModalDetailsVisible] = useState(false);
    const [selectedWishList, setSelectedWishList] = useState(null);
    const [berlinTitle, setBerlinTitle] = useState('');
    const [description, setDescription] = useState('');
    const [berlinWishlists, setBerlinWishlists] = useState([]);
    const [detailsType, setDetailsType] = useState('');
    const wishlistScrollViewRef = useRef(null);
    const swipeableRefs = useRef(new Map());

    const [price, setPrice] = useState('');
    const [whereToBuy, setWhereToBuy] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [wishlistImage, setWishlistImage] = useState('');

    const removeChecklist = async (checklistToRemove) => {
        try {
            const updatedChecklists = berlinWishlists.filter(list =>
                !(list.berlinTitle === checklistToRemove.berlinTitle && list.description === checklistToRemove.description && list.id === checklistToRemove.id)
            );
            await AsyncStorage.setItem('berlinWishlists', JSON.stringify(updatedChecklists));
            setBerlinWishlists(updatedChecklists);
            setModalDetailsVisible(false);
        } catch (error) {
            console.error('Error removing checklist:', error);
            Alert.alert('Error', 'Failed to remove checklist from berlinWishlists.');
        }
    };


    const saveBerlinWishlist = async () => {
        try {
            const existingBerlinWishlists = await AsyncStorage.getItem('berlinWishlists');
            const berlinWishlists = existingBerlinWishlists ? JSON.parse(existingBerlinWishlists) : [];

            const maxBerlinId = berlinWishlists.length > 0 ? Math.max(...berlinWishlists.map(list => list.id)) : 0;

            const newBerlinWishlist = {
                id: maxBerlinId + 1,
                title: berlinTitle,
                description,
                price,
                whereToBuy,
                selectedStatus,
                image: wishlistImage,
            };

            berlinWishlists.unshift(newBerlinWishlist);

            setBerlinWishlists(berlinWishlists);

            await AsyncStorage.setItem('berlinWishlists', JSON.stringify(berlinWishlists));

            setModalVisible(false);
            setBerlinTitle('');
            setDescription('');
            setPrice('');
            setWhereToBuy('');
            setSelectedStatus('');
            setWishlistImage('');

        } catch (error) {
            console.error('Error saving checklist', error);
        }
    };


    useEffect(() => {
        const loadBerlinWishlists = async () => {
            try {
                const existingBerlinWishlists = await AsyncStorage.getItem('berlinWishlists');
                if (existingBerlinWishlists) {
                    setBerlinWishlists(JSON.parse(existingBerlinWishlists));
                }
            } catch (error) {
                console.error('Error loading berlinWishlists', error);
            }
        };

        loadBerlinWishlists();
    }, [berlinWishlists, selectedBerlinScreen]);

    useEffect(() => {
        if (wishlistScrollViewRef.current) {
            wishlistScrollViewRef.current.scrollTo({ y: 0, animated: false });
        }
    }, [modalVisible]);

    const handleCoinImagePicker = () => {
        ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                setWishlistImage(response.assets[0].uri);
            }
        });
    };

    const handleDeleteCollectionImage = () => {
        Alert.alert(
            "Delete image",
            "Are you sure you want to delete image of wishlist item?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => {
                        setWishlistImage('');
                    },
                    style: "destructive"
                }
            ]
        );
    };

    return (
        <SafeAreaView style={{
            width: dimensions.width,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            position: 'relative',
            width: '100%',
            zIndex: 1,
        }} >
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
                    Wish-list
                </Text>
            </View>

            <Text style={{
                textAlign: 'left',
                fontFamily: fontDMSansRegular,
                fontWeight: 400,
                fontSize: dimensions.width * 0.043,
                marginTop: dimensions.height * 0.016,
                alignSelf: 'flex-start',
                color: 'white',
                paddingHorizontal: dimensions.width * 0.05,
            }}
            >
                Popular souvenirs
            </Text>

            <ScrollView
                ref={wishlistScrollViewRef}
                showsVerticalScrollIndicator={false}
                style={{
                    marginTop: dimensions.height * 0.01,
                    width: '100%',
                }}
                contentContainerStyle={{
                    paddingBottom: dimensions.height * 0.03,
                }}
            >
                {popularSouvenirsData.map((popularSouvenir, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            setSelectedWishList(popularSouvenir);
                            setModalDetailsVisible(true);
                            setDetailsType('popularSouvenir');
                        }}
                        style={{
                            alignSelf: 'center',
                            width: dimensions.width * 0.95,
                            marginBottom: dimensions.height * 0.021,
                            zIndex: 500
                        }}
                    >
                        <Image
                            source={popularSouvenir.psdImage}
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
                                {popularSouvenir.psdTitle}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}

                <Text style={{
                    textAlign: 'left',
                    fontFamily: fontDMSansRegular,
                    fontWeight: 400,
                    fontSize: dimensions.width * 0.043,
                    alignSelf: 'flex-start',
                    color: 'white',
                    paddingHorizontal: dimensions.width * 0.05,
                }}
                >
                    Your wish-list
                </Text>

                {berlinWishlists.length !== 0 ? (
                    <View style={{
                        width: '100%',
                        alignSelf: 'center',
                        flex: 1,
                        marginTop: dimensions.height * 0.02,
                        marginBottom: dimensions.height * 0.16,
                    }}>
                        {berlinWishlists.map((berlWishlist, index) => (
                            <TouchableOpacity
                                key={berlWishlist.id}
                                onPress={() => {
                                    setSelectedWishList(berlWishlist);
                                    setModalDetailsVisible(true);
                                }}
                                style={{
                                    alignSelf: 'center',
                                    width: dimensions.width * 0.95,
                                    marginBottom: dimensions.height * 0.021,
                                    zIndex: 500
                                }}
                            >
                                <View style={{
                                    position: 'relative',
                                    width: dimensions.width * 0.93,
                                    height: dimensions.height * 0.25,
                                    alignSelf: 'center',
                                }}>
                                    <Image
                                        source={{ uri: berlWishlist.image }}
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
                                        position: 'absolute',
                                        top: dimensions.height * 0.012,
                                        right: dimensions.width * 0.03,
                                        backgroundColor: '#FF0000',
                                        borderRadius: dimensions.width * 0.019,
                                    }}>
                                        <Text
                                            style={{
                                                fontFamily: fontDMSansRegular,
                                                fontSize: dimensions.width * 0.037,
                                                color: 'white',
                                                paddingHorizontal: dimensions.width * 0.025,
                                                paddingVertical: dimensions.height * 0.014,
                                                fontWeight: 400,
                                                maxWidth: dimensions.width * 0.9,
                                            }}
                                        >
                                            {berlWishlist.selectedStatus}
                                        </Text>
                                    </View>
                                </View>

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
                                        {berlWishlist.title}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity
                            onPress={() => { setModalVisible(true) }}
                            style={{
                                width: dimensions.width * 0.88,
                                height: dimensions.height * 0.07,
                                backgroundColor: '#FF0000',
                                borderRadius: dimensions.width * 0.037,
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center',
                                marginTop: dimensions.height * 0.025,
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: fontDMSansRegular,
                                    fontSize: dimensions.width * 0.044,
                                    color: 'white',
                                    fontWeight: 700,

                                }}
                            >
                                Add
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={{
                        width: dimensions.width * 0.95,
                        alignSelf: 'center',
                        backgroundColor: '#404040',
                        borderRadius: dimensions.width * 0.034,
                        paddingVertical: dimensions.height * 0.025,
                        paddingHorizontal: dimensions.width * 0.05,
                        marginTop: dimensions.height * 0.02,
                    }}>
                        <Text
                            style={{
                                fontSize: dimensions.width * 0.05,
                                fontFamily: fontDMSansRegular,
                                color: 'white',
                                textAlign: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                fontWeight: 700,
                                paddingHorizontal: dimensions.width * 0.14,
                            }}>
                            You have no wish lists added
                        </Text>

                        <TouchableOpacity
                            onPress={() => { setModalVisible(true) }}
                            style={{
                                width: dimensions.width * 0.88,
                                height: dimensions.height * 0.07,
                                backgroundColor: '#FF0000',
                                borderRadius: dimensions.width * 0.037,
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center',
                                marginTop: dimensions.height * 0.025,
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: fontDMSansRegular,
                                    fontSize: dimensions.width * 0.044,
                                    color: 'white',
                                    fontWeight: 700,

                                }}
                            >
                                Add
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>

            <Modal visible={modalVisible} transparent={true} animationType="slide">
                <SafeAreaView
                    style={{
                        alignSelf: 'center',
                        alignItems: 'center',
                        width: '100%',
                        paddingHorizontal: dimensions.width * 0.05,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        width: dimensions.width,
                        zIndex: 1000,
                        backgroundColor: '#2E2E2E',
                        height: dimensions.height,
                    }}
                >
                    <View style={{
                        zIndex: 50,
                        alignSelf: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: dimensions.width,
                        paddingHorizontal: dimensions.width * 0.019,
                        borderBottomColor: '#FFFFFF80',
                        borderBottomWidth: dimensions.height * 0.00055,
                        paddingBottom: dimensions.height * 0.01,
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisible(false);
                            }}
                            style={{
                                borderRadius: dimensions.width * 0.5,
                                zIndex: 100,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <ChevronLeftIcon size={dimensions.height * 0.034} color='#FF0000' />
                            <Text style={{
                                fontFamily: fontDMSansRegular,
                                color: '#FF0000',
                                fontWeight: 400,
                                fontSize: dimensions.width * 0.043,
                                alignItems: 'center',
                                alignSelf: 'center',
                                textAlign: 'center',
                            }}
                            >
                                Back
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        ref={wishlistScrollViewRef}
                        showsVerticalScrollIndicator={false}
                        style={{
                            marginTop: dimensions.height * 0.01,
                            width: '100%',
                        }}
                        contentContainerStyle={{
                            paddingBottom: dimensions.height * 0.1,
                        }}
                    >
                        <View style={{
                            width: dimensions.width * 0.93,
                            alignItems: 'center',
                            alignSelf: 'center',
                        }}>
                            {wishlistImage === '' || !wishlistImage ? (
                                <TouchableOpacity
                                    onPress={() => handleCoinImagePicker()}
                                    style={{
                                        borderRadius: dimensions.width * 0.5,
                                        backgroundColor: '#404040',
                                        width: dimensions.width * 0.4,
                                        height: dimensions.width * 0.4,
                                        alignSelf: 'center',
                                        marginTop: dimensions.height * 0.01,
                                    }}>
                                    <Image
                                        source={require('../assets/images/deleteWishlistImage.png')}
                                        style={{
                                            width: dimensions.width * 0.16,
                                            height: dimensions.width * 0.16,
                                            alignSelf: 'center',
                                            position: 'absolute',
                                            top: '30%',
                                        }}
                                        resizeMode='contain'
                                    />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    onPress={() => {
                                        handleDeleteCollectionImage();
                                    }}
                                    style={{
                                        alignSelf: 'center',
                                        marginTop: dimensions.height * 0.01,
                                    }}>
                                    <Image
                                        source={{ uri: wishlistImage }}
                                        style={{
                                            width: dimensions.width * 0.4,
                                            height: dimensions.width * 0.4,
                                            borderRadius: dimensions.width * 0.5,
                                            alignSelf: 'center',
                                        }}
                                        resizeMode='stretch'
                                    />
                                    <Image
                                        source={require('../assets/images/deleteWishlistImage.png')}
                                        style={{
                                            width: dimensions.width * 0.16,
                                            height: dimensions.width * 0.16,
                                            alignSelf: 'center',
                                            position: 'absolute',
                                            top: '30%',
                                        }}
                                        resizeMode='contain'
                                    />
                                </TouchableOpacity>
                            )}
                            <TextInput
                                placeholder="Title"
                                value={berlinTitle}
                                onChangeText={setBerlinTitle}
                                placeholderTextColor="#FFFFFF80"
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingVertical: dimensions.width * 0.035,
                                    paddingHorizontal: dimensions.width * 0.04,
                                    backgroundColor: '#404040',
                                    borderRadius: dimensions.width * 0.03,
                                    width: '100%',
                                    color: 'white',
                                    fontFamily: fontDMSansRegular,
                                    fontSize: dimensions.width * 0.041,
                                    fontWeight: 400,
                                    textAlign: 'left',
                                    marginTop: dimensions.height * 0.01,
                                }}
                            />

                            <TextInput
                                placeholder="Description"
                                value={description}
                                onChangeText={setDescription}
                                placeholderTextColor="#FFFFFF80"
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingVertical: dimensions.width * 0.035,
                                    paddingHorizontal: dimensions.width * 0.04,
                                    backgroundColor: '#404040',
                                    borderRadius: dimensions.width * 0.03,
                                    width: '100%',
                                    height: dimensions.height * 0.16,
                                    color: 'white',
                                    fontFamily: fontDMSansRegular,
                                    fontSize: dimensions.width * 0.041,
                                    fontWeight: 400,
                                    textAlign: 'left',
                                    marginTop: dimensions.height * 0.01,
                                }}
                                multiline={true}
                                textAlign='flex-start'
                            />

                            <TextInput
                                placeholder="Price"
                                keyboardType='numeric'
                                value={price}
                                onChangeText={setPrice}
                                placeholderTextColor="#FFFFFF80"
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingVertical: dimensions.width * 0.035,
                                    paddingHorizontal: dimensions.width * 0.04,
                                    backgroundColor: '#404040',
                                    borderRadius: dimensions.width * 0.03,
                                    width: '100%',
                                    color: 'white',
                                    fontFamily: fontDMSansRegular,
                                    fontSize: dimensions.width * 0.041,
                                    fontWeight: 400,
                                    textAlign: 'left',
                                    marginTop: dimensions.height * 0.01,
                                }}
                            />

                            <TextInput
                                placeholder="Where to buy"
                                value={whereToBuy}
                                onChangeText={setWhereToBuy}
                                placeholderTextColor="#FFFFFF80"
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingVertical: dimensions.width * 0.035,
                                    paddingHorizontal: dimensions.width * 0.04,
                                    backgroundColor: '#404040',
                                    borderRadius: dimensions.width * 0.03,
                                    width: '100%',
                                    color: 'white',
                                    fontFamily: fontDMSansRegular,
                                    fontSize: dimensions.width * 0.041,
                                    fontWeight: 400,
                                    textAlign: 'left',
                                    marginTop: dimensions.height * 0.01,
                                }}
                            />

                            <Text style={{
                                textAlign: 'left',
                                fontFamily: fontDMSansRegular,
                                fontWeight: 400,
                                fontSize: dimensions.width * 0.043,
                                alignSelf: 'flex-start',
                                color: 'white',
                                marginTop: dimensions.height * 0.03,
                            }}
                            >
                                Status
                            </Text>

                            {['Purchased', 'I want to buy'].map((status, index) => (
                                <TouchableOpacity
                                    onPress={() => setSelectedStatus(status)}
                                    key={index}
                                    style={{
                                        width: dimensions.width * 0.93,
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#404040',
                                        borderRadius: dimensions.width * 0.034,
                                        marginTop: dimensions.height * 0.01,
                                        height: dimensions.height * 0.059,
                                        borderColor: '#FF0000',
                                        borderWidth: selectedStatus === status ? dimensions.width * 0.01 : 0,
                                    }}>
                                    <Text style={{
                                        textAlign: 'left',
                                        fontFamily: fontDMSansRegular,
                                        fontWeight: 400,
                                        fontSize: dimensions.width * 0.043,
                                        alignSelf: 'center',
                                        color: 'white',
                                        paddingHorizontal: dimensions.width * 0.05,
                                    }}
                                    >
                                        {status}
                                    </Text>
                                </TouchableOpacity>
                            ))}

                        </View>

                        <TouchableOpacity
                            disabled={berlinTitle === '' || description === '' || price === '' || whereToBuy === '' || selectedStatus === '' || wishlistImage === '' || !wishlistImage}
                            onPress={saveBerlinWishlist}
                            style={{
                                width: dimensions.width * 0.93,
                                height: dimensions.height * 0.064,
                                backgroundColor: berlinTitle === '' || description === '' || price === '' || whereToBuy === '' || selectedStatus === '' || wishlistImage === '' || !wishlistImage ? '#939393' : '#FF0000',
                                borderRadius: dimensions.width * 0.037,
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center',
                                opacity: berlinTitle === '' || description === '' ? 0.5 : 1,
                                marginTop: dimensions.height * 0.025,
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: fontDMSansRegular,
                                    fontSize: dimensions.width * 0.037,
                                    color: 'white',
                                    fontWeight: 700,
                                }}
                            >
                                Done
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </SafeAreaView>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalDetailsVisible}
                onRequestClose={() => {
                    setModalDetailsVisible(!modalDetailsVisible);
                }}
            >
                <SafeAreaView style={{
                    flex: 1,
                    backgroundColor: '#2E2E2E',
                    width: dimensions.width,
                    height: dimensions.height,
                }}>
                    <View style={{
                        width: dimensions.width * 0.9,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        alignSelf: 'center',
                        paddingBottom: dimensions.height * 0.014,
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                setModalDetailsVisible(false);
                                setDetailsType('');
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
                            source={detailsType === 'popularSouvenir'
                                ? selectedWishList?.psdImage
                                : { uri: selectedWishList?.image }}
                            style={{
                                width: dimensions.width,
                                height: dimensions.height * 0.34,
                                borderRadius: dimensions.width * 0.055555,
                                alignSelf: 'center',
                                marginTop: dimensions.height * 0.02,
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 0,
                            }}
                            resizeMode='stretch'
                        />

                        {detailsType !== 'popularSouvenir' && (
                            <View style={{
                                backgroundColor: '#FF0000',
                                marginTop: dimensions.height * 0.021,
                                marginLeft: dimensions.width * 0.05,
                                alignSelf: 'flex-start',
                                borderRadius: dimensions.width * 0.019,
                            }}>
                                <Text
                                    style={{
                                        fontFamily: fontDMSansRegular,
                                        fontSize: dimensions.width * 0.04,
                                        color: 'white',
                                        paddingHorizontal: dimensions.width * 0.03,
                                        paddingVertical: dimensions.height * 0.014,
                                        fontWeight: 400,
                                        maxWidth: dimensions.width * 0.9,
                                    }}
                                >
                                    {selectedWishList?.selectedStatus}
                                </Text>
                            </View>
                        )}

                        <Text
                            style={{
                                fontFamily: fontDMSansRegular,
                                color: 'white',
                                fontSize: dimensions.width * 0.075,
                                textAlign: 'left',
                                alignSelf: 'flex-start',
                                fontWeight: 600,
                                paddingHorizontal: dimensions.width * 0.05,
                                marginTop: dimensions.height * 0.012,
                            }}>
                            {detailsType === 'popularSouvenir' ? selectedWishList?.psdTitle : selectedWishList?.title}
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
                                marginTop: dimensions.height * 0.021,
                            }}>
                            Description
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
                            {detailsType === 'popularSouvenir' ? selectedWishList?.psdDescription : selectedWishList?.description}
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
                                marginTop: dimensions.height * 0.021,
                            }}>
                            Price
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
                            {detailsType === 'popularSouvenir' ? selectedWishList?.psdPrice : selectedWishList?.price} €
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
                                marginTop: dimensions.height * 0.021,
                            }}>
                            Where to buy
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
                            {detailsType === 'popularSouvenir' ? selectedWishList?.psdWhereToBuy : selectedWishList?.whereToBuy}
                        </Text>

                        {detailsType !== 'popularSouvenir' && (
                            <TouchableOpacity
                                disabled={false}
                                onPress={() => {
                                    removeChecklist(selectedWishList);
                                }}
                                style={{
                                    width: dimensions.width * 0.93,
                                    height: dimensions.height * 0.064,
                                    backgroundColor: '#FF0000',
                                    borderRadius: dimensions.width * 0.037,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                    marginTop: dimensions.height * 0.025,
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: fontDMSansRegular,
                                        fontSize: dimensions.width * 0.05,
                                        color: 'white',
                                        fontWeight: 700,
                                    }}
                                >
                                    Delete
                                </Text>
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
};

export default BerlinWishlistsScreen;
