/**
 * Created by git on 16/8/30.
 * mod by xiaowei 2017-1-10 15:50:32
 */

'use strict';

import Http from '../network/Http';
import * as AppUrl from '../network/AppUrl';
import Util from '../common/util/Util'

var currentUser;

class User {

    static currentUser() {
        return currentUser;
    }


}

module.exports = User;