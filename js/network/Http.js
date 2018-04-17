/**
 * Created by git on 16/8/30.
 */

const Util = require('../common/util/Util');
import formData from '../common/util/post-as-form'
import {Platform} from 'react-native'

class Http {
    static Get(url:string, paramters:Object):Promise {
        url = Util.urlAppendQeury(url, paramters);
        return fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        }).then((response)=> {
            try {
                return response.json()
            } catch (e){
                throw new Error('请求返回错误');
            }
        }).then((json)=>{
                if(json.result && json.result === 'success') {
                    return json.bizVO;
                } else{
                    if(__DEV__) console.warn('error:'+json.message);
                    throw new Error(json.message?json.message:'请求错误');
                }
            });
    }

    static Post(url:string, paramters:Object):Promise {
        return fetch(url, {
            credentials: true,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paramters)
        }).then((response)=> {
                try {
                    if(response.status === 200 || response.status === 401){
                        return response.json()
                    }else{
                        Promise.reject(error);
                    }
                } catch (e){
                    //throw new Error('请求返回错误');
                    throw new Error('服务器繁忙,请稍后连接');
                }
            }).then((json)=>{
                if(json.result && json.result === 'success') {
                    return json.bizVO;
                } else{
                    if(__DEV__) console.warn('error:'+json.message);
                    throw new Error(json.message?json.message:'请求错误');
                }
            });
    }

    static FormPost(url:string, paramters:Object):Promise {
        return fetch(url, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
            body: formData(paramters)
        }).then((response)=> {
            try {
                return response.json()
            } catch (e){
                throw new Error('请求返回错误');
            }
            }).then((json)=>{
                if(json.result && json.result === 'success') {
                    return json.bizVO;
                } else{
                    if(__DEV__) console.warn('error:'+json.message);
                    throw new Error(json.message?json.message:'请求错误');
                }
            });
    }

    static MultipartPost(url:string, paramters:Object):Promise{
        let formData = new FormData();
        for(let key in paramters){
            let value = paramters[key];
            if(key==='files'){
                value.forEach((file, index)=>{
                    let uri = file.uri;
                    let name = file.name;
                    let type = file.type;

                    if(!name){
                        let index = uri.lastIndexOf('/');
                        name = uri.slice(index+1);
                    }
                    if(!name){
                        name='file'+index;
                    }

                    if(!type){
                        let index = name.lastIndexOf('.');
                        if(index !== -1){
                            type = name.slice(index+1).toLowerCase();
                        }

                        if(type==='jpg'||type==='jpeg'){
                            type='image/jpeg'
                        } else if(type==='png'){
                            type='image/png'
                        }
                    }
                    if(!type){
                        type='text/plain';
                    }

                    formData.append('file', {uri, name, type});
                });
            }else{
                formData.append(key, value);
            }
        }

        let options = {};
        options.method = 'POST';
        options.headers = {
            'Content-Type':'multipart/form-data;',
            'Accept':'application/json'
        };

        options.body = formData;
        return fetch(url, options).then((response)=> {
            try {
                return response.json()
            } catch (e){
                throw new Error('请求返回错误');
            }
        }).then((json)=>{
                if(json.result && json.result === 'success') {
                    return json.bizVO;
                } else{
                    if(__DEV__) console.warn('error:'+json.message);
                    throw new Error(json.message?json.message:'请求错误');
                }
        });
    }
}

module.exports = Http;