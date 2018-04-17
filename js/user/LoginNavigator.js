/**
 * Created by git on 16/8/11.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, Navigator,Platform, BackAndroid,ToastAndroid} from 'react-native';

import ExNavigator from '@exponent/react-native-navigator'
import Login from './Loign'
import Button from '../common/widget/Button/Button'
import AppEventEmitter from '../../js/eventEmitter/AppEventEmitter2'
import AppEvent from '../../js/eventEmitter/AppEvent'
class LoginNavigator extends React.Component {
    constructor(props) {
        super(props);

        this._renderBackButton = this._renderBackButton.bind(this);
        this._onBackAndroid = this._onBackAndroid.bind(this);

        this.state = {
            barVisible: true,
            barStyle: 'light',
        };
    }

    render() {
        let {login} = this.props;
        let route = {
            renderScene(navigator) {
                return <Login navigator={navigator} style={{marginTop: navigator.props.barHeight}} login={login}/>;
            },
            getTitle(){
                return '登录';
            },
            // renderRightButton(navigator, index, state) {
            //     let route = state.routeStack[index];
            //     return (
            //         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 5}}>
            //             <Button style={{backgroundColor: 'transparent', borderWidth: 0}} onPress={() => {if(route.scene.onRightButtonPress){route.scene.onRightButtonPress();}}}>
            //                <Text style={[{fontSize:15,color:'#fff'}]}>注册</Text>
            //             </Button>
            //         </View>);
            // },
        };
        let {barStyle} = this.state;
        return (
            <ExNavigator style={styles.container}
                         ref={'nav'}
                         titleStyle={[barStyle==='light'?{color: 'white'}:{color:'#3c4a55'},{fontSize:18},]}
                         initialRoute={route}
                         barHeight={Navigator.NavigationBar.Styles.General.TotalNavHeight}
                         showNavigationBar={this.state.barVisible}
                         navigationBarStyle={[barStyle==='light'?{backgroundColor:'#f04141',borderColor:'#e40001',borderBottomWidth:1}:{backgroundColor: '#f7f9fc'},{borderBottomWidth: 0}]}
                         renderBackButton={this._renderBackButton}>
            </ExNavigator>
        );
    }

    componentDidMount() {
        //this.props.onBarStyleChange('dark');
    }

    _renderBackButton(navigator){
        let backPic = require('../img/icon_return_white.png');
        return (
            <TouchableOpacity style={{flex:1, justifyContent: 'center', alignItems: 'center'}} onPress={()=>{navigator.pop()}}>
                <Image source={backPic} style={{marginHorizontal:10}}/>
            </TouchableOpacity>
        )
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

        if(Platform.OS === 'android' && AppEventEmitter.listeners(AppEvent.EVENT_CHANGE_ALERT).length){
            AppEventEmitter.emit(AppEvent.EVENT_CHANGE_ALERT)
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
});

export default LoginNavigator;