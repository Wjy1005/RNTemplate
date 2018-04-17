/**
 * Created by git on 16/8/30.
 * @flow
 * mod by xiaowei on 2017-2-6 16:05:05
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, ActivityIndicator,
    Navigator, Platform, NativeAppEventEmitter, TouchableWithoutFeedback, Linking} from 'react-native';
import AppSetting from './model/AppSetting'

class AppLoading extends React.Component {

    static PropsType={
        onAppLoaded:PropTypes.func
    }
    constructor(props) {
        super(props);

    }

    render() {

        return (
            <View style={styles.container}>

            </View>
        );
    }
    componentDidMount() {
        //AppSetting.getIntroduceSkiped()
        //    .then((skip)=>{
        //        if(skip){
        //            return User.checkLoginIn();
        //        }else{
        //            this.props.onAppLoaded({skip});
        //        }
        //        //return User.checkLoginIn();
        //    }).then((user)=>{
        //    this.props.onAppLoaded({user});
        //    //this.props.onAppLoaded({skip: false});
        //}).catch((error)=>{
        //    if(error.message === 'not login'){
        //        this.props.onAppLoaded({user: null});
        //    }else{
        //        console.warn(error.message);
        //    }
        //});

        AppSetting.getIntroduceSkiped()
            .then((skip)=>{
                if(skip){
                    this.props.onAppLoaded({user:null});
                }else{
                    this.props.onAppLoaded({skip});
                }
                //return User.checkLoginIn();
            }).catch((error)=>{
            if(error.message === 'not login'){
                this.props.onAppLoaded({user: null});
            }else{
                console.warn(error.message);
            }
        });
    }
    
    componentWillUnmount() {

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default AppLoading;