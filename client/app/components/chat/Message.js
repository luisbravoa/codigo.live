import React from 'react';
import Message from './Message';
import actions from '../../actions/index';
import './message.less';
export default class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {

        var {content, username, date, type} = this.props.data;
        var dateObject = new Date(date);
        var datestring = dateObject.getDate()  + "-" + (dateObject.getMonth()+1) + "-" + dateObject.getFullYear() + " " +
            dateObject.getHours() + ":" + dateObject.getMinutes();

        if(type === 'language'){
            return (
                <li className="message-info">
                    <div className="message-info-content">
                        <i className="message-info-icon fa fa-info-circle fa-2x" aria-hidden="true"></i>
                        <span className="message-info-text">{username} changed the language to <b>{content}</b>.</span>
                    </div>
                </li>
            );
        } else {
            return (
                <li className="message">
                    <div className="message-user">{username}</div>
                    <div className="message-content">{content}</div>
                    <div className="message-date">{dateObject.format("yyyy-MM-dd h:mm:ss")}</div>
                </li>
            );
        }

    }
}
Date.prototype.format = function(format) //author: meizz
{
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(),    //day
        "h+" : this.getHours(),   //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
        "S" : this.getMilliseconds() //millisecond
    }

    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
        (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)if(new RegExp("("+ k +")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length==1 ? o[k] :
                ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
}
