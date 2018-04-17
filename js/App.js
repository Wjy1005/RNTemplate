/**
 * Created by git on 16/8/29.
 * mod by xiaowei on 2017-1-9 16:22:35
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, StatusBar, Navigator, NativeAppEventEmitter, Platform} from 'react-native';

import AppNavigator from './AppNavigator';
import Login from './user/Loign'
import LoginNavigator from './user/LoginNavigator'
import AppEvent from './../js/eventEmitter/AppEvent'
import AppEventEmitter from './../js/eventEmitter/AppEventEmitter'
import AppLoading from './AppLoading'
import AppIntroduce from './AppIntroduce'
import Toast from '@remobile/react-native-toast'

//import JPushModule from 'jpush-react-native';

class App extends React.Component {
    constructor(props) {
        super(props);

        this._onBarStyleChange = this._onBarStyleChange.bind(this);
        this._login = this._login.bind(this);
        this._onAppLoaded = this._onAppLoaded.bind(this);
        this._onPress = this._onPress.bind(this);

        this.state= {
            barStyle: 'light',
            logined:false,
            introduce:false,
            login:false,
            loadData:true,
            notification:'',
            statusBarHidden:false,
        }
    }

    render() {
        let {barStyle, statusBarHidden} = this.state;

        let appNavigator = this.state.logined?(<AppNavigator ononStatusBarHiddenChange={this._onBarStyleChange}/>):null;
        let scrollPageView = this.state.introduce?(<AppIntroduce onPress={this._onPress} />):null;
        let loginView = this.state.login?(<LoginNavigator login={this._login}/>):null;
        let loadDataView = this.state.loadData?(<AppLoading onAppLoaded={(obj)=>this._onAppLoaded(obj)}/>):null;
        return (
            <View style={styles.container}>
                <StatusBar
                    hidden={statusBarHidden}
                    backgroundColor={barStyle==='light'?'#rgba(0, 0, 0, 0.2)':'black'}
                    barStyle={barStyle==='light'?"light-content":'default'}
                />
                {appNavigator}
                {loginView}
                {loadDataView}
                {scrollPageView}
            </View>
        );
    }

    _onBarStyleChange(barStyle){
        this.setState({barStyle});
    }
    _login(){
        this.setState({login:false,logined:true})
    }
    _onAppLoaded(obj){
        this.setState({
            statusBarHidden: false
        });
        if (obj.skip !== undefined && obj.skip === false) {
            this.setState({
                introduce: true,
                loadData: false,
            });
        }
        else if (obj.user !== undefined) {
            if (obj.user) {
                this.setState({
                    logined: true,
                    loadData: false,
                });
            } else {
                this.setState({
                    login: true,
                    loadData: false,
                });
            }
        }
    }


    _onPress(){
        this.setState({
            logined: true,
            introduce: false,
        });
        //if (User.currentUser()) {
        //    this.setState({
        //        logined: true,
        //        introduce: false,
        //    });
        //} else {
        //    this.setState({
        //        login: true,
        //        introduce: false,
        //    });
        //}
    }
    componentDidMount() {
        AppEventEmitter.addEventListener(AppEvent.EVENT_USER_LOGOUT, event => {
            this.setState({
                logined: false,
                login: true,
            });
        });

    }
    componentWillUnmount() {
        //AppEventEmitter.removeListener(AppEvent.EVENT_USER_LOGOUT, () => {});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;