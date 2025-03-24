import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import casData from '../components/casData';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';

const fontDMSansRegular = 'DMSans-Regular';

const CasScreen = ({ setSelectedBerlinScreen, selectedBerlinPlace, setSelectedBerlinPlace }) => {

  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  const [selectedEventCategory, setSelectedEventCategory] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCasi, setSelectedCasi] = useState(null);
  const scrollViewRef = useRef(null);

  const getDataByCategory = (category) => {
    switch (category) {
      case 'All':
        return casData;
      case 'Poker':
        return casData.filter(item => item.isPoker);
      case 'Roulette':
        return casData.filter(item => item.isRoulette);
      case 'Slot machines':
        return casData.filter(item => item.IsSlots);
      default:
        return [];
    }
  };

  const data = getDataByCategory(selectedEventCategory);

  useEffect(() => {
    console.log('data:', data);
  }, [data])

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: false });
    }
  }, [selectedEventCategory]);

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#2E2E2E',
      width: dimensions.width
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
          Casino
        </Text>
      </View>

      <View style={{
        marginVertical: dimensions.height * 0.01,
      }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            width: '100%',
            alignSelf: 'center',
          }}
        >
          <View style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
            {['All', 'Poker', 'Roulette', 'Slot machines'].map((category) => (
              <TouchableOpacity
                key={category}
                style={{
                  borderRadius: dimensions.width * 0.016,
                  backgroundColor: selectedEventCategory === category ? '#FF0000' : '#848484',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: dimensions.width * 0.03,
                  height: dimensions.height * 0.05,
                }}
                onPress={() => {
                  setSelectedEventCategory(`${category}`);
                }}
              >
                <Text
                  style={{
                    fontFamily: fontDMSansRegular,
                    fontSize: dimensions.width * 0.043,
                    color: 'white',
                    fontWeight: 400,
                    paddingHorizontal: dimensions.width * 0.03,
                  }}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

      </View>

      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
          alignSelf: 'center',
          marginTop: dimensions.height * 0.01,
        }}
        contentContainerStyle={{
          paddingBottom: dimensions.height * 0.25,
        }}
      >
        <View style={{
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}>

          {data.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedCasi(item);
                setModalVisible(true)
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

                {item.isTop && (
                  <View style={{
                    position: 'absolute',
                    bottom: dimensions.height * 0.019,
                    right: dimensions.width * 0.03,
                    backgroundColor: '#FF0000',
                    borderRadius: dimensions.width * 0.019,
                  }}>
                    <Text
                      style={{
                        fontFamily: fontDMSansRegular,
                        fontSize: dimensions.width * 0.043,
                        color: 'white',
                        padding: dimensions.width * 0.021,
                        fontWeight: 500,
                        maxWidth: dimensions.width * 0.9,
                      }}
                    >
                      Top casino
                    </Text>
                  </View>
                )}
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
                  {item.bthTitle}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
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
          }}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
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
              source={selectedCasi?.bthImage}
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

            {selectedCasi?.isTop && (
              <View style={{
                backgroundColor: '#FF0000',
                borderRadius: dimensions.width * 0.019,
                marginTop: dimensions.height * 0.016,
                alignSelf: 'flex-start',
                marginLeft: dimensions.width * 0.05,
              }}>
                <Text
                  style={{
                    fontFamily: fontDMSansRegular,
                    fontSize: dimensions.width * 0.043,
                    color: 'white',
                    padding: dimensions.width * 0.021,
                    fontWeight: 500,
                  }}
                >
                  Top casino
                </Text>
              </View>
            )}

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
              {selectedCasi?.bthTitle}
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
              {selectedCasi?.bthDescription}
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
                marginTop: dimensions.height * 0.01,
              }}>
              {selectedCasi?.bthAddress}
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
              Features
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
              {selectedCasi?.bthFeatures}
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
                marginTop: dimensions.height * 0.025,
              }}>
              Rules
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
              {selectedCasi?.bthRules}
            </Text>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default CasScreen;
