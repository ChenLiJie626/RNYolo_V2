import React, {useState} from 'react';
import {Image, ImageBackground, ListRenderItemInfo, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Avatar, Button, Card, List, Text, Layout} from '@ui-kitten/components';
import {ImageOverlay} from './extra/image-overlay.component';
import {HeartIcon, PlusIcon, ShareIcon, MessageCircleIcon} from './extra/icons';
import {Training} from './extra/data';
import {RadioGroup} from '../../components';
import {TabView, SceneMap} from 'react-native-tab-view';
import ProfileScreen from '../Profile/Profile';

const data = [
    Training.basketball(),
    Training.running(),
    Training.workout(),
];

function ImgScreen() {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {key: 'first', title: '开始探索'},
        {key: 'second', title: '个人主页'},
    ]);
    const renderItemHeader = (info) => (
        <ImageBackground
            style={styles.itemHeader}
            source={info.item.image}
        />
    );

    const renderItemFooter = (info) => (
        <View style={styles.itemFooter}>
            <Avatar source={info.item.author.photo}/>
            <View style={styles.itemAuthoringContainer}>
                <Text
                    category='s2'>
                    {info.item.author.fullName}
                </Text>
                <Text
                    appearance='hint'
                    category='c1'>
                    {info.item.date}
                </Text>
            </View>
            <Button
                style={styles.iconButton}
                appearance='ghost'
                status='basic'
                accessoryLeft={MessageCircleIcon}>
                {`${info.item.comments.length}`}
            </Button>
            <Button
                style={styles.iconButton}
                appearance='ghost'
                status='danger'
                accessoryLeft={HeartIcon}>
                {`${info.item.likes.length}`}
            </Button>
        </View>
    );

    const renderItem = (info) => (
        <Card
            style={styles.item}
            header={() => renderItemHeader(info)}
            footer={() => renderItemFooter(info)}
            // onPress={() => onItemPress(info.index)}
        >
            <Text
                style={styles.itemContent}
                appearance='hint'
                category='s1'>
                {`${info.item.content.substring(0, 82)}...`}
            </Text>
        </Card>
    );
    const Layout1 =()=> (
        <Layout
            style={styles.container}
            level='2'>
            <List
                style={styles.list}
                contentContainerStyle={styles.listContent}
                data={data}
                renderItem={renderItem}
            />
        </Layout>
    );

    const renderScene = SceneMap({
        first: Layout1,
        second: ProfileScreen,
    });

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    item: {
        marginVertical: 8,
    },
    itemHeader: {
        height: 220,
    },
    itemContent: {
        marginVertical: 8,
    },
    itemFooter: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 10,
        // marginHorizontal: -8,
    },
    iconButton: {
        paddingHorizontal: 0,
    },
    itemAuthoringContainer: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
    },
});
export default ImgScreen;
