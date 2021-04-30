import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Layout, Text } from '@ui-kitten/components';
import {BottomNavigationTabThemingShowcase} from './Tab';
import PositionScreen from '../Screen/Position/PositionScreen'
import ImgScreen from '../Screen/ImgShow/ImgScreen'
import DetectScreen from '../Screen/Detect/DetectScreen'
import VideoScreen from '../Screen/Video/VideoScreen'

const { Navigator, Screen } = createBottomTabNavigator();






const TabNavigator = () => (
    <Navigator tabBar={props => <BottomNavigationTabThemingShowcase  {...props}/>}>
        <Screen name='Video' component={VideoScreen}/>
        <Screen name='Position' component={PositionScreen}/>
        <Screen name='Show' component={ImgScreen}/>
        <Screen name='Detect' component={DetectScreen}/>

    </Navigator>
);

export const AppNavigator = () => (
    <NavigationContainer>
        <TabNavigator/>
    </NavigationContainer>
);
