/**
 * Created by git on 16/10/8.
 */

import {Dimensions, Platform, Navigator} from 'react-native';

export const ScreenWidth = Dimensions.get('window').width;
export const ScreenHeight = Dimensions.get('window').height;

export const ScreenRadio = ScreenWidth/375;

export const NavigationBarHeight = Navigator.NavigationBar.Styles.General.TotalNavHeight;
export const TabBarHeight = 49

export const iOS = Platform.OS==='ios'
export const android = Platform.OS==='android'

export const PhoneRegular = /^1[3|4|5|6|7|8|9]\d{9}$/;
export const ZhongwenRegular = /.*[\u4e00-\u9fa5]+.*$/;
export const TitleCheckRegular = /[\[\]\\<>'";&]+/;
