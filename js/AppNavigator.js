/**
 * Created by git on 16/6/13.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, Navigator,Platform,BackAndroid,ToastAndroid} from 'react-native';

import ExNavigator from '@exponent/react-native-navigator'
import TabNavigator from './tabs/TabNavigator'
import AppLoading from './AppLoading'
import AppEvent from '../js/eventEmitter/AppEvent'
import AppEventEmitter from '../js/eventEmitter/AppEventEmitter2'

class AppNavigator extends React.Component {

    constructor(props, context) {
        super(props, context);

        this._getTitle = this._getTitle.bind(this);
        this._onTabItemChange = this._onTabItemChange.bind(this);
        this._onBarVisible = this._onBarVisible.bind(this);
        this._onBarStyleChange = this._onBarStyleChange.bind(this);
        this._renderBackButton = this._renderBackButton.bind(this);
        this._onBackButtonChange = this._onBackButtonChange.bind(this);
        this._onBackAndroid = this._onBackAndroid.bind(this);
        this._onRenderNavigationBar = this._onRenderNavigationBar.bind(this);

        this.state = {
            tabItem: null,
            barVisible: false,
            barStyle: 'light',
            backButton: null,
        };
    }

    render() {
        let route = {...TabNavigator.route, getTitle: this._getTitle};
        let {barStyle} = this.state;
        return (
            <ExNavigator style={styles.container}
                         ref={'nav'}
                         title={this._getTitle()}
                         titleStyle={[barStyle==='light'?{color: 'white'}:{color:'#3c4a55'},styles.title,]}
                         initialRoute={route}
                         barHeight={Navigator.NavigationBar.Styles.General.TotalNavHeight}
                         showNavigationBar={this.state.barVisible}
                         navigationBarStyle={[barStyle==='light'?{backgroundColor:'#f04141',borderColor:'#e40001',borderBottomWidth:1}:{backgroundColor: '#f7f9fc'},{borderBottomWidth: 0}]}
                         renderBackButton={this._renderBackButton}
                         onTabItemChange={this._onTabItemChange}
                         onBarVisible={this._onBarVisible}
                         onBarStyleChange={this._onBarStyleChange}
                         onBackButtonChange={this._onBackButtonChange}
                         onRenderNavigationBar={this._onRenderNavigationBar}
                         onStatusBarHidden={this.props.onStatusBarHidden}>
            </ExNavigator>
        );
    }
    _onBackButtonChange(source){
        this.setState({backButton:source})
    }
    _renderBackButton(navigator){
        let backPic = this.state.backButton?this.state.backButton:require('./img/icon_return_white.png');
        return (
            <TouchableOpacity style={{flex:1, justifyContent: 'center', alignItems: 'center'}} onPress={()=>navigator.pop()}>
                <Image source={backPic} style={{marginHorizontal:10}} />
            </TouchableOpacity>
        )
    }
    _onTabItemChange(tabItem){
        this.setState({tabItem});
    }

    _onBarVisible(show){
        this.setState({
            barVisible: show,
        });
    }

    _onBarStyleChange(barStyle){
        this.setState({
            barStyle
        });

        this.props.onBarStyleChange && this.props.onBarStyleChange(barStyle);
    }

    _getTitle() {
        if(this.state.tabItem){
            return this.state.tabItem.title;
        }
        return '';
    }

    _onRenderNavigationBar(){
        this.refs.nav.__navigator&&this.refs.nav.__navigator._navBar.forceUpdate();
    }

    componentDidMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this._onBackAndroid);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this._onBackAndroid);
        }
    }

    _onBackAndroid() {
        if(Platform.OS === 'android' && AppEventEmitter.listeners(AppEvent.EVENT_ALERT).length){
            AppEventEmitter.emit(AppEvent.EVENT_ALERT)
            return true;
        }
        if(Platform.OS === 'android' && AppEventEmitter.listeners(AppEvent.EVENT_WEBVIEW_BACK).length){
            AppEventEmitter.emit(AppEvent.EVENT_WEBVIEW_BACK)
            return true;
        }
        let routers = this.refs['nav'].getCurrentRoutes();
        if (routers.length > 1) {
            this.refs['nav'].pop();
            return true;
        }

        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
            return false;
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
        return true;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navigationBarStyle: {
        borderTopWidth:0
    },
    title: {
        fontSize: 18,
        fontWeight: 'normal',
    }
});

export default AppNavigator;