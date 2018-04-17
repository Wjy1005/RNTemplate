/**
 * Created by git on 16/8/30.
 */

'use strict';

import React from 'react';
import {AsyncStorage, EventEmitter} from 'react-native';
import AppEvent from './../../js/eventEmitter/AppEvent'
const SKIP_INTRODUCE = 'SKIP_INTRODUCE';
const LOADING_AD = 'LOADING_AD';

class AppSetting {
    getIntroduceSkiped(): Promise{
        return AsyncStorage.getItem(SKIP_INTRODUCE)
            .then((skip)=>{
                return skip === 'true';
            });
    }
    setIntroduceSkiped(){
        AsyncStorage.setItem(SKIP_INTRODUCE, 'true');
    }

    getLoadingAdInfo(): Promise{
        return AsyncStorage.getItem(LOADING_AD).then((data)=>{
            if(data){
                return JSON.parse(data);
            }
            return data;
        });
    }

    setLoadingAdInfo(info){
        AsyncStorage.setItem(LOADING_AD, JSON.stringify(info));
    }

    getCheckWechat(){
        return this._wechatCheck;
    }
    setCheckWechat(check){
        this._wechatCheck = check;
    }
    alertEvent
    getAlertEvent(Cb){
        this.alertEvent = EventEmitter.addListener(AppEvent.EVENT_ALERT,Cb)
    }
    rmAlertEvent(){
        EventEmitter.removeListener(this.alertEvent)
    }
}

var appSetting = new AppSetting();

module.exports = appSetting;
