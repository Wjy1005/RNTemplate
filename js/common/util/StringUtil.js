/**
 * Created by git on 16/9/6.
 */

import React, {PropTypes} from 'react';
import {StyleSheet, Text} from 'react-native';

export function splitString(string, substring, style, matchstyle){
    let texts = [];
    let indexString = '';
    let keyIndex = 0;

    if(!string){
        return null;
    }

    if(!substring){
        return (
            <Text style={[style]} numberOfLines={1}>
                {string}
            </Text>
        );
    }

    while(string){
        let index = string.indexOf(substring);
        if(index !== -1){
            indexString = string.substring(0, index);
            if(indexString){
                texts.push(
                    <Text key={''+keyIndex} style={[style]} numberOfLines={1}>
                        {indexString}
                    </Text>
                );
            }
            indexString = substring;
            keyIndex += index;
            texts.push(
                <Text key={''+keyIndex} style={[style, matchstyle]} numberOfLines={1}>
                    {indexString}
                </Text>
            );

            keyIndex+=substring.length;
            string = string.substring(index+substring.length);
        }else{
            indexString = string;
            texts.push(
                <Text key={''+keyIndex} style={[style]} numberOfLines={1}>
                    {indexString}
                </Text>
            );
            string = null;
        }
    }
    return texts;
}