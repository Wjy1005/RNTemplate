/**
 * Created by git on 17/2/7.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import My from 'react-native-DIYMy'
import MainDetails from './../../common/widget/Tip/MainDetails2'
class Main extends React.Component
{
    constructor(props, context)
    {
        super(props, context);

        this.state={
            bgColor:true,
        }
    }

    render()
    {
        let bgColor = this.state.bgColor?{backgroundColor:'#ddd'}:{backgroundColor:'#fff'}
        let number = 0
        return (
            <View style={[styles.container,this.props.style,bgColor]}
                  //onStartShouldSetResponderCapture={(evt)=>{
                  //      console.log(111111)
                  //      this._startY = evt.nativeEvent.locationY
                  //      return true
                  //}}
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
                  }}
                  //onResponderMove={(evt)=>{
                  //       console.log("onResponderMove:     " )
                  //       console.log(evt.nativeEvent.locationY)
                  //}}
                 // onResponderGrant={(evt)=>{
                 //       console.log("onResponderGrant:  ")
                 //       console.log(evt.nativeEvent.locationY)
                 //
                 //}}
            >

                <TouchableOpacity onPress={()=>{
                                         My.show(number.toString(),'2222')
                                         number++
                                        }}>
                    <Text>显示</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                                        My.hide()
                                        }}>
                    <Text>消失</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{
                                        let json = {
                                        defaultTitle:'123231312312'
                                        }
                                        MainDetails.alert(json)
                                       }}>
                    <Text>弹窗</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{
                     My.showHud();
                     setInterval(this._onPress,3000)
                }}>
                    <Text>显示HUD</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{My.hideHud()}}>
                    <Text>消失HUD</Text>
                </TouchableOpacity>
            </View>
        );
    }

    componentDidMount() {
        let json = {
            name:"king",
            number:'100',
        }
        My.addDic(json)
    }
    _onPress = ()=>{
        My.hideHud()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Main;