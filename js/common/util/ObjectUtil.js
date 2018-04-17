/**
 * Created by git on 16/6/15.
 */

export function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}