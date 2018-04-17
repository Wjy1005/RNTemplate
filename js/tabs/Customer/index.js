/**
 * Created by git on 17/2/7.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, Animated, Easing, Dimensions, Navigator, TouchableWithoutFeedback} from 'react-native';
const {width} = Dimensions.get('window')
class Customer extends React.Component
{
    constructor(props, context)
    {
        super(props, context);

        this.state={
            top:new Animated.Value(0),
            translateTop:0,
            bottom:new Animated.Value(0),
            translateBottom:0
        }
    }

    componentDidMount() {
        this.setState({
            translateTop:this.state.top.interpolate({  inputRange:[0,1], outputRange:[-200,Navigator.NavigationBar.Styles.General.TotalNavHeight + 15]  }),
        })
    }
    render()
    {
        return (
            <TouchableWithoutFeedback onPress={()=>{
             Animated.timing(this.state.top, {
                                    toValue: 0,
                                    easing: Easing.linear,
                                    during: 1000
                              }).start()
            }}>
            <View style={[styles.container,this.props.style]}>

                <Animated.View style={[{
                      opacity: this.state.top
                    },{position:'absolute',top:this.state.translateTop,width:width}]}>
                    <View style={{height:200,backgroundColor:'green'}}>
                        <TouchableOpacity onPress={()=>{}}>
                            <Text>点击</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>


                <TouchableOpacity onPress={()=>{
                    if(this.state.top._value === 1){
                         Animated.timing(this.state.top, {
                                    toValue: 0,
                                    easing: Easing.linear,
                                    during: 1000
                              }).start()
                    }else{
                         Animated.timing(this.state.top, {
                                        toValue: 1,
                                        easing: Easing.linear,
                                        during: 1000
                                  }).start()
                    }

                }} style={{height:10}}>
                    <Text style={{  textDecorationLine:'line-through'}}>上上上上上上上</Text>
                </TouchableOpacity>

            </View>
                </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


export default Customer;