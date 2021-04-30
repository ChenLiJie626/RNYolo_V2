import React, { Component } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import convertToProxyURL from 'react-native-video-cache';

import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    Animated, ScrollView, SafeAreaView,
} from 'react-native';
import { Button } from 'react-native-elements';


import Video from 'react-native-video';
// import { BlurView } from '@react-native-community/blur';

import Carousel from 'react-native-snap-carousel';
import { ENTRIES1 } from './data';
import { itemWidth, sliderWidth } from './styles/SliderEntry.style';
import SliderEntry from './components/SliderEntry';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const SLIDER_1_FIRST_ITEM = 1;

export default class DetectScreen extends Component {

    componentDidMount() {

    }

    launchCamera = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchCamera(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = { uri: response.uri };
                console.log('response', JSON.stringify(response));
                this.setState({
                    filePath: response,
                    fileData: response.data,
                    fileUri: response.uri,
                });
            }
        });

    };

    launchImageLibrary = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = { uri: response.uri };
                console.log('response', JSON.stringify(response));
                this.setState({
                    filePath: response,
                    fileData: response.data,
                    fileUri: response.uri,
                });
            }
        });

    };



    _renderItemWithParallax({ item, index }, parallaxProps) {
        return (
            <SliderEntry
                data={item}
                even={(index + 1) % 2 === 0}
                parallax={true}
                parallaxProps={parallaxProps}
            />
        );
    }

    mainExample() {
        return (
            <Carousel
                ref={c => this._slider1Ref = c}
                data={ENTRIES1}
                renderItem={this._renderItemWithParallax}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                hasParallaxImages={true}
                firstItem={SLIDER_1_FIRST_ITEM}
                inactiveSlideScale={0.94}
                inactiveSlideOpacity={0.7}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
                loop={true}
                loopClonesPerSide={2}
                autoplay={true}
                autoplayDelay={500}
                autoplayInterval={3000}
                onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
            />
        );
    }

    render() {
        const example1 = this.mainExample();
        return (
            <View  style={styles.container}>

                <Video
                    source={{uri: convertToProxyURL("http://116.62.184.209:9000/yolo/background.mp4")}}
                    rate={1.0}
                    volume={0.0}
                    muted={false}
                    paused={false}
                    resizeMode="cover"
                    repeat
                    style={styles.backgroundVideo}
                />
                <View
                    shouldRasterizeIOS
                    renderToHardwareTextureAndroid
                    style={{
                        // flex: 1,
                        alignItems: 'center',
                        // justifyContent: 'center',
                        marginTop: 100,
                    }}
                >


                    <Text
                        style={{
                            marginBottom: 30,
                            fontSize: 38,
                            fontWeight: '800',
                            letterSpacing: 0.4,
                            color: 'white',
                            backgroundColor: 'transparent',
                            fontFamily: "Times New Roman"
                        }}
                    >
                        {"Yolo Application"}
                    </Text>
                </View>
                <View style={styles.btnParentSection}>
                    <Button
                        type="outline"
                        title={'打开相机'}
                        titleStyle={{ color: 'white' ,fontSize:20}}
                        onPress={this.launchCamera}
                    />
                    <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                    <Button
                        type="outline"
                        title={'打开相册'}
                        titleStyle={{ color: 'white' ,fontSize:20}}
                        onPress={this.launchImageLibrary}
                    />

                </View>
                <View style={{flex: 1}}>
                    <ScrollView
                        style={{flex: 1}}
                        scrollEventThrottle={200}
                        directionalLockEnabled={true}
                    >
                        {example1}
                    </ScrollView>
                </View>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    btnParentSection: {
        alignItems: 'center',
        flexDirection:'row',
        marginTop: 50,
        marginBottom: 60,
    },
    btnSection: {
        width: 225,
        height: 50,
        backgroundColor: '#0ea378',
        alignItems: 'center',
        // justifyContent: 'center',
        borderRadius: 3,
        margin: 10,
    },
    slider: {
        marginTop: 15,
        overflow: 'visible' // for custom animations
    },
    sliderContentContainer: {
        paddingVertical: 10 // for custom animation
    },
});
