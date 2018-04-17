/**
 * Created by git on 16/8/30.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, Dimensions} from 'react-native';
import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';
import Button from './common/widget/Button/Button';
import AppSetting from './model/AppSetting';


const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const Radio = Dimensions.get('window').width/375.0;

class AppIntroduce extends React.Component {

    static PropsType={
        onPress:PropTypes.func
    }
    constructor(props) {
        super(props);

        this._onPress = this._onPress.bind(this);
    }

    render() {
        let pic = [
            require('./img/page1.jpg'),
            require('./img/page2.jpg'),
            require('./img/page3.jpg'),
        ]

        let pages = pic.map((item, index, items)=>{
            let button = index === pic.length-1?(<Button style={{width:100,height:31,marginBottom:77*Radio,backgroundColor:'transparent',borderColor:'#ffb4b3'}} onPress={this._onPress} textStyle={{color:'#fff',fontSize:14}}> 立即体验 </Button>):null;
            return (
                <View key={''+index} >
                    <Image source={item} style={{alignItems:'center', justifyContent: 'flex-end',width:deviceWidth,height:deviceHeight}} resizeMode="stretch" >
                        {button}
                    </Image>
                </View>
            );
        });
        return (
            <View style={styles.container}>
                <IndicatorViewPager style={{flex: 1}}
                                    //indicator={(<PagerDotIndicator pageCount={pages.length} />)}
                >
                    {pages}
                </IndicatorViewPager>
            </View>
        );
    }

    _onPress(){
        AppSetting.setIntroduceSkiped();
        this.props.onPress()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default AppIntroduce;