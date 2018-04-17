/**
 * Created by git on 16/8/30.
 * mod by xiaowei on 2017-1-11 14:09:58
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, Navigator,TouchableHighlight, ActivityIndicator, Dimensions, Platform, findNodeHandle, NativeModules,TouchableWithoutFeedback, AppState} from 'react-native';

import Toast from '@remobile/react-native-toast'
import Button from '../common/widget/Button/Button';
import TabNavigator from '../tabs/TabNavigator';
import TextInput from './../common/widget/TextInput/WTextInput'
import dismissKeyboard from 'dismissKeyboard'

import AppEvent from '../../js/eventEmitter/AppEvent'
const Width = Dimensions.get('window').width
const SettingsManager = NativeModules.SettingsManager;
class Loign extends React.Component {

    static PropsType={
        login:PropTypes.func
    }

    constructor(props) {
        super(props);
        this._onLogin = this._onLogin.bind(this);

        this._subTime = this._subTime.bind(this);
        this._getVerification = this._getVerification.bind(this);
        this._isCanLogin = this._isCanLogin.bind(this);
        this._onSelorg = this._onSelorg.bind(this);

        this.state={
            message:'获取验证码',
            verification:true,
            isCanLogin:false,
            selorg:[],
            isSelorg:false,
        }
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={()=>dismissKeyboard()} >
                <View style={[styles.container,this.props.style]}>
                    <TouchableOpacity style={[styles.registerBtn]} onPress={this._onLogin} >
                        <Text style={[{color:'#fff',fontSize:16}]}>登录</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        );
    }
    _getVerification(){

    }
    _subTime(){

    }
    _clearCountDownTime(){

    }
    _isCanLogin(){

    }
    _onSelorg(idx, value){

    }
    _onLogin(){
        this.props.login && this.props.login()
    }
    _flag = 0
    onRightButtonPress(){
        //let route = {
        //    renderScene(navigator) {
        //        return <Register navigator={navigator} style={{marginTop: navigator.props.barHeight}} />;
        //    },
        //    getTitle(){
        //        return '注册申请';
        //    },
        //}
        //if (this._flag === 0 || (this.lastBackPressed && this.lastBackPressed + 2000 <= Date.now())) {
        //    this.props.navigator.push(route);
        //}
        //this.lastBackPressed = Date.now();
        //this._flag = 1
    }
}

const styles = StyleSheet.create({
    textStyle:{
       width:50,
    },
    text:{
       fontSize:16
    },
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    row: {
        paddingLeft:13,
        paddingRight:11.5,
        height: 50,
        flexDirection:'row',
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderColor:'#ddd',
        alignItems:'center',
        //borderRadius:25,
        backgroundColor:'#fff',
        flex:1,
    },
    picker:{
        paddingLeft:13,
        paddingRight:11.5,
        height: 50,
        // flexDirection:'row',
        borderTopWidth: StyleSheet.hairlineWidth ,
        borderTopColor: '#ddd',
        // alignItems:'center',
        //borderRadius:25,
        backgroundColor:'#fff',
        flex:1,
    },
    registerBtn:{
        height:40,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#f04141',
        marginHorizontal:10,
        marginTop:24
    },
    thirdLoginBtn:{
        marginTop:20,
        justifyContent:'flex-end',
        flexDirection:'row',
        marginRight:14
    },
    Spinner: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        backgroundColor: '#0000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    zym:{
        width:92.5,
        backgroundColor:'#f56657',
        height:31,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    }
});

Loign.navRoute = {
    renderScene(navigator) {
        return <Loign navigator={navigator} style={{marginTop: navigator.props.barHeight}} />;
    },
    getTitle(){
        return '登录'
    },
    configureScene(){
        return Navigator.SceneConfigs.FadeAndroid;
    }
};
//reactMixin(Loign.prototype, ProgressHudMixin);
export default Loign;