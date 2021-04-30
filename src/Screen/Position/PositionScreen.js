/* eslint-disable class-methods-use-this */
import React from 'react';
import { StyleSheet, View, Text, Switch, Platform,PermissionsAndroid  } from 'react-native';
import { init,Geolocation } from "react-native-amap-geolocation";

import { MapView } from "react-native-amap3d";
import commonStyles from "./styles";

class PositionScreen extends React.Component {
    constructor() {
        super();
        this.state={
            latitude: 39.91095,
            longitude: 116.37296
        }
    }
    async componentDidMount() {

        // 对于 Android 需要自行根据需要申请权限
        await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ]);

// 使用自己申请的高德 App Key 进行初始化
        await init({
            android: "129add757014d54b940390c56b971308"
        });

        Geolocation.getCurrentPosition(({ coords }) => {
            console.log(coords);
            this.setState({
                latitude: coords.latitude,
                longitude: coords.longitude,
            })
        },error => {
            console.log(error)
        })


    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}>
                <Text>This is empty date!</Text>
            </View>
        );
    }


    static navigationOptions = { title: "图层的显示" };

    state = {
        showsLabels: true,
        showsTraffic: false,
        showsBuildings: false
    };
    render() {
        const { items, loadItems } = this.props;
        return (
            <View style={StyleSheet.absoluteFill}>
                <MapView
                    zoomLevel={17}
                    center={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude
                    }}
                    tilt={60}
                    showsLabels={this.state.showsLabels}
                    showsTraffic={this.state.showsTraffic}
                    showsBuildings={this.state.showsBuildings}
                    style={styles.map}
                />
                <View style={styles.controls}>
                    <View style={styles.control}>
                        <Text style={styles.label}>建筑</Text>
                        <Switch
                            onValueChange={showsBuildings => this.setState({ showsBuildings })}
                            value={this.state.showsBuildings}
                        />
                    </View>
                    <View style={styles.control}>
                        <Text style={styles.label}>路况</Text>
                        <Switch
                            onValueChange={showsTraffic => this.setState({ showsTraffic })}
                            value={this.state.showsTraffic}
                        />
                    </View>
                    <View style={styles.control}>
                        <Text style={styles.label}>标签</Text>
                        <Switch
                            onValueChange={showsLabels => this.setState({ showsLabels })}
                            value={this.state.showsLabels}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = {
    ...commonStyles,
    map: [
        commonStyles.map,
        {
            ...Platform.select({
                ios: {
                    marginBottom: 54
                }
            })
        }
    ],
    controls: [
        commonStyles.controls,
        {
            height: 54
        }
    ],
    control: [
        commonStyles.control,
        {
            flexDirection: "row"
        }
    ],
    label: {
        marginRight: 5
    }
};


export default PositionScreen;
