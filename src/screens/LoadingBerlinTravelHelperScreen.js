import React, { useEffect, useRef, useState } from 'react';
import { View, ImageBackground, Dimensions, Animated, Text, ActivityIndicator, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const fontDMSansRegular = 'DMSans-Regular';

const LoadingBerlinTravelHelperScreen = ({ setSelectedBerlinScreen }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const navigation = useNavigation();
  const [percentage, setPercentage] = useState(0);

  const animatedOpacity = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const textAnim = useRef(new Animated.Value(dimensions.width)).current;

  useEffect(() => {
    // Запуск анімації мерехтіння
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedOpacity, {
          toValue: 0.5,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animatedOpacity]);

  useEffect(() => {
    // Анімація обертання проти годинникової стрілки (одне обертання за 3 сек)
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateAnim]);

  useEffect(() => {
    setTimeout(() => {
      setSelectedBerlinScreen('Home');
    }, 3000);
  }, [percentage]);

  useEffect(() => {
    Animated.timing(textAnim, {
      toValue: 0,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [textAnim]);

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2E2E2E'
    }}>
      <Animated.Image
        source={require('../assets/images/berlinTravelHelpreLoader.png')}
        resizeMode='contain'
        style={{
          width: dimensions.width * 0.7,
          height: dimensions.width * 0.7,
          opacity: animatedOpacity,
          transform: [{
            rotate: rotateAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '-360deg']  // проти годинникової стрілки
            })
          }]
        }}
      />
      <Animated.Text style={{
        transform: [{ translateX: textAnim }],
        textAlign: 'center',
        fontFamily: fontDMSansRegular,
        fontWeight: 700,
        fontSize: dimensions.width * 0.1,
        alignItems: 'center',
        alignSelf: 'center',
        color: 'white',
        paddingBottom: dimensions.height * 0.014,
        marginBottom: dimensions.height * 0.014,
        paddingHorizontal: dimensions.width * 0.1,
      }}>
        Berlin Travel Helper
      </Animated.Text>

      <ActivityIndicator size="large" color="#FF0000" />
    </View>
  );
};

export default LoadingBerlinTravelHelperScreen;