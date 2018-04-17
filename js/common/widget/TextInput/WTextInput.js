/**
 * Created by git on 16/9/6.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, Platform, TextInput} from 'react-native';

class WTextInput extends React.Component
{

    static PropType={
        doChangeText:PropTypes.func,
        placeholder:PropTypes.string,
        text:PropTypes.string,
        defaultValue:PropTypes.string,
        keyboardType:PropTypes.string,
        maxLength:PropTypes.number,
        editable:PropTypes.bool,
        textStyle:Text.prototype.style,
        textInputStyle:TextInput.prototype.style
    }
    constructor(props, context)
    {
        super(props, context);

        this._deleteDepartment = this._deleteDepartment.bind(this)
        this._onFocus = this._onFocus.bind(this)
        this._onBlur = this._onBlur.bind(this)
        this._textChange = this._textChange.bind(this)

        this.state={
            onClick:false
        }
    }
    _text=''
    render()
    {
        let Icon = require('./img/icon_delete.png');
        let deleteBtn = Platform.OS === 'android'?this._text && this.state.onClick ?(
            <TouchableOpacity onPress={this._deleteDepartment} ref={(ref)=>this._deleteBtn = ref} style={styles.deleteBtn}>
                <Image source={Icon} width="15" height="15"/>
            </TouchableOpacity>
        ):null:null;
        let {onChangeText , ...props} = this.props
        return (
            <View style={styles.container}>
                <Text style={[styles.text,this.props.textStyle]}>{this.props.text}</Text>
                <TextInput ref={(ref)=>this._textInput = ref}
                           placeholder={this.props.placeholder}
                           placeholderTextColor="#b5b5b5"
                           underlineColorAndroid="transparent"
                           clearButtonMode='while-editing'
                           style={[styles.textInput,this.props.textInputStyle]}
                           defaultValue={this.props.defaultValue}
                           keyboardType={this.props.keyboardType}
                           onChangeText={(text)=>this._textChange(text)}
                           maxLength={this.props.maxLength}
                           onFocus={this._onFocus}
                           onBlur={this._onBlur}
                           editable={this.props.editable}
                    {...props}
                />
                {deleteBtn}
            </View>
        );
    }
    _deleteDepartment(){
        this._textInput.clear();
        this._textChange('');
    }
    _textChange(text){
        this._text = text;
        this.forceUpdate();
        this.props.onChangeText && this.props.onChangeText(text)
    }
    onClear(){
        this._textInput.clear()
    }
    _onFocus(){
        this.setState({onClick:true})
    }
    _onBlur(){
        this.setState({onClick:false})
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
        alignItems:'center'
    },

    text:{
        fontSize:14,
        marginRight:10,
        color:'#666',
        //width:70
    },
    textInput:{
        flex:1,
        fontSize:14,
        justifyContent:'center',
        color:'#333'
    },
    deleteBtn:{
        marginRight:8,
    }
});

export default WTextInput;