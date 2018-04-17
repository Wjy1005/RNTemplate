/**
 * Created by git on 16/8/5.
 * @flow
 */

'use strict';
const AppEvent = {
    EVENT_USER_LOGOUT: 'kEventUserLogout',
    EVENT_SIGNAL_SELECTED_ENABLED:'kEventSignalSelectedEnabled',
    EVENT_SIGNAL_SELECTED_DISABLED:'kEventSignalSelectedDisabled',
    EVENT_ALERT :'kEventAlert',
    EVENT_WEBVIEW_BACK : 'KEventWebViewBack',
    EVENT_APPSTATE :'change',
    EVENT_CAN_REFRESH: 'KEventRefreshing',
    EVENT_CANNOT_REFRESH : 'KEventNotRefreshing',
    EVENT_CHANGE_ALERT :'kEventChangeAlert',
};


module.exports = AppEvent;