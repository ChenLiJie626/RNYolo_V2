import React from 'react';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';

const PersonIcon = (props) => (
    <Icon {...props} name='person-outline'/>
);

const BellIcon = (props) => (
    <Icon {...props} name='bell-outline'/>
);

const EmailIcon = (props) => (
    <Icon {...props} name='email-outline'/>
);

export const BottomNavigationTabThemingShowcase = ({ navigation, state }) => {

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    return (
        <BottomNavigation
            selectedIndex={selectedIndex}
            style={{backgroundColor:"black"}}
            onSelect={index => {
                navigation.navigate(state.routeNames[index])
                setSelectedIndex(index)
            }}>
            <BottomNavigationTab icon={EmailIcon} title='Video'/>
            <BottomNavigationTab icon={PersonIcon} title='Position'/>
            <BottomNavigationTab icon={BellIcon} title='Show'/>
            <BottomNavigationTab icon={EmailIcon} title='Detect'/>
        </BottomNavigation>
    );
};
