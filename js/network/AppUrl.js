/**
 * Created by git on 16/8/30.
 * mod by xiaowei on 2017-1-11 10:43:28
 */

'use strict';

import {NativeModules} from 'react-native';
const SettingsManager = NativeModules.SettingsManager;

//true 代表本地测试环境，false 代表挡板数据

var testFlag = true;
var host = 'https://ixtapptest.citic.com/ixtapp';

if (!testFlag){
    host = 'https://ixtapp.citic.com/ixtapp';
}

//根据gettestFlag接口来判断是否联网
class AppUrl {
    static gettestFlag() {
        return testFlag
    }
}



export default  AppUrl;