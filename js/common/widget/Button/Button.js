/**
 * Created by git on 16/7/1.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, Platform,ActivityIndicator} from 'react-native';

class Button extends React.Component {
    static defaultProps = {
        disabled: false,
        loading: false,
        activeOpacity: 0.2,
    }
    static PropTypes = {
        ...TouchableOpacity.propTypes,
        image: Image.prototype.source,
        disabledImage: Image.prototype.source,
        text: PropTypes.string,
        backgroundImage: Image.prototype.source,

        disabled: PropTypes.bool,
        loading: PropTypes.bool,

        imageStyle: Image.prototype.style,
        textStyle: Text.prototype.style,
        textStyleDisabled: Text.prototype.style,
    }
    constructor(props) {
        super(props);

        let {disabled, loading} = props;
        this.state = {disabled, loading};
    }

    render() {
        let {image, imageStyle, disabledImage, text, textStyle, textStyleDisabled, backgroundImage,
            disabled, loading, children,  ...restProps} = this.props;
        let bgimage = backgroundImage?(<Image key="bgimage" style={styles.bgimage}  source={backgroundImage}/>):null;
        let tstyle = [styles.text, disabled?styles.textDisabled:null, textStyle, disabled?textStyleDisabled:null];
        let ctext = text?<Text key="text" style={tstyle}>{text}</Text>:null;
        let cimage = (disabled && disabledImage)?(<Image key="image" style={imageStyle?imageStyle:styles.image} source={disabledImage} />)
            :(image?(<Image key="image" style={imageStyle?imageStyle:styles.image} source={image} />):null);
        let cloading = loading?this._getSpinner():null;

        let components = React.Children.map(children, (child, index)=>{
            if(React.isValidElement(child)){
                if(child.type === Text){
                    return React.cloneElement(child, {style: [tstyle, child.props.style]})
                }
                return child;
            } else{
                return <Text key={'child'+index} style={tstyle}>{child}</Text>;
            }
        });

        if(!components){
            components = [];
        }
        components.unshift(ctext);
        components.unshift(cimage);
        components.unshift(cloading);

        let propsDisabled = {};
        if (disabled) {
            propsDisabled.activeOpacity = 1;
            propsDisabled.onPress = null;
            propsDisabled.onPressIn = null;
            propsDisabled.onPressOut = null;
            propsDisabled.onLongPress = null;
        }
        return (
            <TouchableOpacity  {...restProps} {...propsDisabled}
                style={[styles.container, this.props.style, disabled?styles.containerDisabled:null]}
                ref='target'>
                {bgimage}
                {components}
            </TouchableOpacity>
        );
    }

    componentWillReceiveProps(props) {
        if(('disabled' in props) && props.disabled !== this.state.disabled){
            this.setState({disabled: props.disabled});
        }

        if(('loading' in props) && props.loading !== this.state.loading){
            this.setState({loading: props.loading});
        }
    }

    _getSpinner() {
        return (<ActivityIndicator key='spinner' size="small" color="#fff"/>);
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#cfd1d0',
        backgroundColor: 'white',
        paddingVertical: 5,
        //paddingHorizontal: 10,
    },
    containerDisabled: {
        backgroundColor: '#f7f6f5',
    },
    bgimage: {
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
    image: {
        //width: 22,
        //height: 22,
        //marginRight: 5,
    },
    text: {
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#515353',
        backgroundColor: 'transparent',
    },
    textDisabled: {
        color: '#bec1c1',
    },
    spinner: {
        marginRight: 5,
    }
});

export default Button;