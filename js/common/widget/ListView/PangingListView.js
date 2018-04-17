/**
 * Created by zhangjianlin@git.com.cn on 16/9/11.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, ActivityIndicator} from 'react-native';

import GiftedListView from 'react-native-gifted-listview';

class PangingListView extends React.Component {

    constructor(props) {
        super(props);

        this._renderSeperator = this._renderSeperator.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
        this._paginationFetchingView = this._paginationFetchingView.bind(this);
        this._paginationAllLoadedView = this._paginationAllLoadedView.bind(this);
        this._paginationWaitingView = this._paginationWaitingView.bind(this);
        this._emptyView = this._emptyView.bind(this);
        this._onEndReached = this._onEndReached.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
        this._onScrollTo = this._onScrollTo.bind(this);
    }

    render() {
        return (
            <GiftedListView rowView={this._renderRow}
                            //onFetch={this._onFetch}
                            firstLoader={false}
                            pagination={true}
                            refreshable={true}
                            paginationFetchingView={this._paginationFetchingView}
                            paginationAllLoadedView={this._paginationAllLoadedView}
                            paginationWaitingView={this._paginationWaitingView}
                            emptyView={this._emptyView}
                            renderSeparator={this._renderSeperator}
                            onEndReached={this._onEndReached}
                            renderHeader={this._renderHeader}
                            ref = {(ref)=>this.giftedView = ref}
                            onEndReachedThreshold={10}
                {...this.props}/>
        );
    }

    getRows=()=>{
        return this.giftedView.getRows();
    }

    reloadRows=(rows)=>{
        return this.giftedView.reloadRows(rows);
    }

    reload=()=>{
        this.giftedView._onRefresh()
    }

    _onRefresh(){
        this.giftedView._onRefresh()
    }

    _renderSeperator(sid, rid){
        return (<View key={sid+rid} style={{height: Stylesheet.hairlineWidth, backgroundColor: '#dddddd'}} />);
    }

    _renderHeader(){
        return null;
    }
    _setPage(page){
        this.giftedView._setPage(page)
    }
    //_scrollTo(size){
    //    this.giftedView.scrollTo(size)
    //}
    _paginationFetchingView(firstLoaderHide){
        if(firstLoaderHide){
            return null;
        }else{
            return (
                <View style={{flexDirection: 'row',justifyContent: 'center',padding: 10, backgroundColor: 'white'}}>
                    <ActivityIndicator size="small"/>
                    <Text style={{marginLeft:5, fontSize: 16}}>加载中...</Text>
                </View>
            );
        }
    }

    _paginationAllLoadedView(){
        return null;
        //return (
        //    <View style={{margin: 10,alignItems: 'center',}}>
        //        <Text>没有更多数据了</Text>
        //    </View>
        //);
    }

    _paginationWaitingView(pagnateCallback){
        this._pagnateCallback = pagnateCallback;
        return (
            <View style={{alignItems: 'center',padding: 10, backgroundColor: 'white'}}>
                <Text style={{fontSize: 16}}>上拉加载更多数据</Text>
            </View>
        );
    }

    _emptyView(refreshCallback){
        return null;
        //return (
        //    <View style={{flex: 1,flexDirection: 'row',alignItems: 'center',
        //    justifyContent: 'center',height: Height-64, backgroundColor: 'white'}}>
        //    </View>
        //);
    }

    _onEndReached(){
        if(this._pagnateCallback && this.props.pagination !== false){
            this._pagnateCallback();
        }
    }
    _onScrollTo(index){
        this.giftedView._onScrollTo(index)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default PangingListView;