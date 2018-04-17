/**
 * Created by xiaowei on 2017-1-6 10:56:25
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, Dimensions, TextInput, Animated } from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import Main from './Main'
import Customer from './Customer'
import Demand from './Demand'
import Project from './Project'
import Activity from './Activity'

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

class TabsNavigator extends React.Component {
    static propTypes = {
        onTabItemChange: PropTypes.func,
    };
    constructor(props, context) {
        super(props, context);

        this.state={
            selectedTab: '首页',
        }
        this._onTabPress = this._onTabPress.bind(this)

    }

    render() {
        let paddingTop = {paddingTop: this.props.navigator.props.barHeight};

        let tabitems = [{title: '首页', renderIcon: require('./img/main.png'),
            renderSelectedIcon: require('./img/main_select.png'), component: Main},
            {title: '客户档案', renderIcon: require('./img/xietong.png'),
                renderSelectedIcon: require('./img/xietong_select.png'), component: Customer},
            {title: '协同需求', renderIcon: require('./img/xietong.png'),
                renderSelectedIcon: require('./img/xietong_select.png'), component: Demand},
            {title: '协同项目', renderIcon: require('./img/xietong.png'),
                renderSelectedIcon: require('./img/xietong_select.png'), component: Project},
            {title: '活动', renderIcon: require('./img/mine.png'),
                renderSelectedIcon: require('./img/mine_select.png'), component: Activity},
        ].map((item)=>{
            let tabitem = {...item};
            let Component = tabitem.component;
            tabitem.component = <Component ref={item.title} style={paddingTop} navigator={this.props.navigator} />;
            return tabitem;
        });

        let tabs = tabitems.map((item)=>{
            return (
                <TabNavigator.Item
                    key={item.title}
                    selected={this.state.selectedTab === item.title}
                    title={item.title}
                    titleStyle={[{color:'#333333'},{fontSize:10}]}
                    selectedTitleStyle={{color:'#f04141'}}
                    renderIcon={() => <Image style={styles.tabIcon} source={item.renderIcon} />}
                    renderSelectedIcon={() =>  <Image style={styles.tabIcon} source={item.renderSelectedIcon} />}
                    onPress={()=>{this._onTabPress(item)}}>
                    {item.component}
                </TabNavigator.Item>
            );
        });

        let tabBarHeight = 50;
        let tabBarStyle = {height: tabBarHeight};
        let sceneStyle = {paddingBottom: tabBarHeight};

        return (
            <View style={{flex: 1}}>
                <TabNavigator style={this.props.style}
                              tabBarStyle={[tabBarStyle, {backgroundColor: 'white'}]}
                              sceneStyle={sceneStyle}>
                    {tabs}
                </TabNavigator>
            </View>
        );
    }
    _onTabPress(item){
        this.setState({ selectedTab: item.title });
        this.props.onTabItemChange && this.props.onTabItemChange(item);
    }
    componentDidFocus(){
        this.props.navigator.props.onBarVisible(true);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabIcon: {
        width: 25,
        height: 25,
    },
    modal: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0, 0.6)',

    },
});


TabsNavigator.route = {
    renderScene(navigator) {
        return <TabsNavigator navigator={navigator} onTabItemChange={navigator.props.onTabItemChange} />;
    },
    getTitle(navigator){
        return navigator.props.title || '首页';
    },
    renderTitle(navigator, index, state){
        let title = navigator.props.title || '首页';
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',width:(Width-144)}}>
                <Text style={{fontSize: 18, color: 'white'}}>{title}</Text>
            </View>
        );
    },
    renderRightButton(navigator, index, state){

    }
};

export default TabsNavigator;