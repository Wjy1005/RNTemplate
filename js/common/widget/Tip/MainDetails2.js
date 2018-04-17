/**
 * Created by wangjianying1@git.com.cn on 17/2/8.
 * @flow
 * 提示框
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, Dimensions, Platform, EventEmitter, TextInput, ScrollView ,TouchableWithoutFeedback} from 'react-native';
import {Manager, ModalContainer} from 'react-native-root-modal';
import AppEventEmitter from '../../../../js/eventEmitter/AppEventEmitter2'
import AppEvent from '../../../../js/eventEmitter/AppEvent'
import {ScreenWidth, iOS} from './../../util/Constant'
class Dialog extends React.Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
      }
    render(){
        let {defaultTitle,onDismiss} = this.props
        let deleteBtn = (
            <TouchableOpacity  style={styles.deleteBtn}
                               onPress={()=>{ onDismiss()}}>
                <Image source={require('./img/delete.png')}/>
            </TouchableOpacity>
        )


        return (
            <TouchableWithoutFeedback onPress={()=>onDismiss()} style={{flex:1}}
                                      onStartShouldSetResponder={(evt)=>{
                                            console.log("onStartShouldSetResponder")
                                      }}
                                      onStartShouldSetResponder={(evt)=>{
                                            //console.log("onStartShouldSetResponder:     " )
                                            //console.log(evt.nativeEvent.locationY)
                                            this._startY = evt.nativeEvent.locationY
                                            return true
                                      }}
                                      onResponderRelease={(evt)=>{
                                            //console.log("onResponderRelease:     " )
                                            // console.log(evt.nativeEvent.locationY)
                                            this._endY = evt.nativeEvent.locationY
                                            console.log("startY:" + this._startY )
                                            console.log("endY:" + this._endY )
                                            if(this._startY && this._endY){
                                                this.setState({
                                                    bgColor:this._endY - this._startY >0
                                                })
                                            }
                                      }}>
                <View  style={styles.container}>
                    <View style={[styles.dialog]}>
                        <ScrollView onResponderMove={(evt)=>{
                                            console.log(evt.nativeEvent.locationY)
                                        }}
                                    onStartShouldSetResponder={(evt)=>{
                                            console.log(2222222)
                                    }}
                                    onStartShouldSetResponderCapture={(evt)=>{
                                                console.log(111111)
                                              return true
                                        }}>
                            <View style={{marginBottom:15,height:150,marginHorizontal:15,backgroundColor:'#f7f7f7',paddingVertical:10}}>
                                <View style={{paddingHorizontal:15}}
                                            >
                                    <Text style={{lineHeight:20,fontSize:12,color:'#333'}}>{defaultTitle}</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>

            </TouchableWithoutFeedback>
        );
    }
    componentDidMount() {
        if(Platform.OS === 'android'){
            this._subcription = AppEventEmitter.addListener(AppEvent.EVENT_ALERT, ()=>{
                this.props.onDismiss&&this.props.onDismiss();
            });
        }
    }
    componentWillUnmount() {
        if(Platform.OS === 'android'){
            if(this._subcription){
                this._subcription.remove();
            }
        }
    }
}

var modal = null;

class Alert {
    static alert(json){
        let props = {visible: true,
            style: styles.modal ,
            children: <Dialog {...json} onDismiss={this._onDismiss}/>}
        if(modal){
            modal.destroy();
        }
        modal = new Manager(<ModalContainer
            {...props}
        />);
    }

    static _onDismiss(){
        modal.destroy();
        modal = null;
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:55
    },
    modal: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    dialog: {
        width: ScreenWidth * 3 / 4,
        backgroundColor: 'white',
        borderRadius: 9,
        overflow:'hidden',
        flexDirection:'column',
    },
    deleteBtn:{
        position:'absolute',
        right:10,
        top:10,
        width:25,
        height:25,
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    topView:{
        height:50,
        justifyContent:'center',
        alignItems:'center',
    },

});

export default Alert;