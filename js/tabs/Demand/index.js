/**
 * Created by git on 17/2/7.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import Check from 'react-native-git-check'
class Demand extends
React.Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state={
            VO:[
                {name:'金山小区222号101室',value:'1'},
                {name:'金山小区222号102室',value:'2'},
                {name:'金山小区222号103室',value:'3'},
                {name:'金山小区222号104室',value:'4'},
                {name:'金山小区222号105室',value:'5'},
                {name:'金山小区222号106室',value:'6'},
                {name:'金山小区222号107室',value:'7'},
                {name:'金山小区222号108室',value:'8'},
            ],
        }
    }

    /**
     *   dataSource:PropTypes.array.isRequired,
     selectedIcon:Image.prototype.source,
     unselectedIcon:Image.prototype.source,
     style:View.prototype.style,
     itemStyle:View.prototype.style
     topView:View.propTypes.style
     * *
     * */
    render()
    {
        return (
            <View style={[styles.container,this.props.style]}>
                <Check   dataSource={this.state.VO}
                         style={{flexDirection:'column'}}
                         itemStyle={{justifyContent:'center'}}
                         currentSelect={this._currentSelect}/>
            </View>
        );
    }
    _currentSelect = (dataSource )=>{
        console.log(dataSource)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


export default Demand;