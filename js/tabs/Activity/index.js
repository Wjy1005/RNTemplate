/**
 * Created by git on 17/2/7.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, LayoutAnimation, Animated} from 'react-native';

class Activity extends
React.Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state={
            top:100,
            left:100,
            allowMove:true
        }
    }

    render()
    {
        let {top, left} = this.state
        return (
            <View style={[styles.container,this.props.style]}
                  //onLayout={(event)=>{
                  //  console.log(event.nativeEvent)
                  //}}
                  //onStartShouldSetResponder={(evt)=>{
                  //      //console.log("onStartShouldSetResponder:     " )
                  //      //console.log(evt.nativeEvent.locationY)
                  //      this._startY = evt.nativeEvent.locationY
                  //      this._startX = evt.nativeEvent.locationX
                  //      return true
                  //}}
                  //onResponderRelease={(evt)=>{
                  //      //console.log("onResponderRelease:     " )
                  //      // console.log(evt.nativeEvent.locationY)
                  //      this._endY = evt.nativeEvent.locationY
                  //      this._endX = evt.nativeEvent.locationX
                  //      console.log("endX:" + this._endX )
                  //      console.log("endY:" + this._endY )
                  //      if(this._endX && this._endY && this.state.allowMove){
                  //          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                  //          this.setState({
                  //              top:this._endY - 50,
                  //              left:this._endX - 50,
                  //              //allowMove:false
                  //          })
                  //
                  //      }
                  //}}
            >
                <Animated.View  style={{width:100,height:100,backgroundColor:'red',position:'absolute',top:top, left:left}}
                                ref="view"
                    onStartShouldSetResponder={(event)=>{
                                                this._startY = event.nativeEvent.locationY
                                                this._startX = event.nativeEvent.locationX
                                                console.log(event.nativeEvent)
                                                console.log('单击')
                                                return true
                                          }}
                    //onResponderRelease={(event)=>{
                    //                          console.log(event.nativeEvent)
                    //                          if(this.state.allowMove){
                    //                             LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                    //                               this.setState({
                    //                                    top:event.nativeEvent.pageY - 50,
                    //                                    left:event.nativeEvent.pageX - 50,
                    //                                    //allowMove:false
                    //                                })
                    //                          }
                    //                      }}
                    onResponderMove={(event)=>{ console.log(event.nativeEvent)
                                                if( this._startX && this._startY){
                                                    LayoutAnimation.configureNext(LayoutAnimation.Presets.caseInEaseOut);
                                                    this.setState({
                                                        top:event.nativeEvent.pageY - 50,
                                                        left:event.nativeEvent.pageX - 50,
                                                        //allowMove:false
                                                    })
                                                }
                                            }}
                            >
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


export default Activity;