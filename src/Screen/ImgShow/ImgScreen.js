import React from 'react';
import {Image, ListRenderItemInfo, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Card, List, Text} from '@ui-kitten/components';
import {ImageOverlay} from './extra/image-overlay.component';
import {HeartIcon, PlusIcon, ShareIcon} from './extra/icons';
import {Training} from './extra/data';

const data = [
    Training.basketball(),
    Training.running(),
    Training.workout(),
];

function ImgScreen() {
    console.log(data);
    const renderItemHeader = (info) => (
        <ImageOverlay
            style={styles.itemHeader}
            source={info.item.photo}>
            <Text
                style={styles.itemTitle}
                category='h4'
                status='control'>
                {info.item.title}
            </Text>
        </ImageOverlay>
    );

    const renderItemFooter = () => (
        <View style={styles.itemFooter}>
            <View style={styles.itemReactionsContainer}>
                <Button
                    style={styles.iconButton}
                    appearance='ghost'
                    status='basic'
                    accessoryLeft={ShareIcon}/>
                <Button
                    style={styles.iconButton}
                    appearance='ghost'
                    status='danger'
                    accessoryLeft={HeartIcon}
                />
            </View>
            <View style={styles.avatarContainer}>
                <Image
                    source={require('./assets/avatar.png')}
                    style={{
                        width: 50,
                        height: 50,
                        resizeMode: 'cover',
                        borderRadius: 25,
                        borderColor: 'white',
                        borderWidth: 1,
                    }}
                />
                <View style={{paddingLeft: 15,marginRight:10}}>
                    <Text >2018/6/6</Text>
                </View>
            </View>
        </View>
    );

    const renderItem = (info) => (
        <Card
            style={styles.item}
            header={() => renderItemHeader(info)}
            footer={renderItemFooter}>
            <Text
                style={styles.itemDescription}
                category='s1'>
                {info.item.description}
            </Text>
        </Card>
    );

    return (
        <List
            style={styles.list}
            contentContainerStyle={styles.listContent}
            data={data}
            renderItem={renderItem}
        />
    );
};

const styles = StyleSheet.create({
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
        minHeight: 220,
    },
    itemTitle: {
        position: 'absolute',
        left: 24,
        bottom: 24,
    },
    itemDescription: {
        marginHorizontal: -8,
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemReactionsContainer: {
        flexDirection: 'row',
    },
    itemAddButton: {
        flexDirection: 'row-reverse',
        paddingHorizontal: 0,
    },
    iconButton: {
        paddingHorizontal: 0,
    },
    avatarContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});
export default ImgScreen;