var $ = require('jquery');
var api_token;
function DataService() {
    this.base_url = "http://college.luisbravoa.com";


}

function beforeSend(xhr){
    xhr.setRequestHeader('Authorization', 'Bearer '+ api_token);
}

DataService.prototype.fetchCourses = function () {

    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: this.base_url+'/courses',
            beforeSend: beforeSend,
            success: function (data) {
                resolve(data);
            },
            error: reject
        });
    });

};
DataService.prototype.enrole = function (userId, courseId) {

    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            dataType: "json",
            url: this.base_url+'/users/'+userId+'/courses/'+courseId,
            beforeSend: beforeSend,
            success: function (data) {
                resolve(data);
            },
            error: reject
        });
    });

};

DataService.prototype.dropout = function (userId, courseId) {

    return new Promise((resolve, reject) => {
        $.ajax({
            type: "DELETE",
            dataType: "json",
            url: this.base_url+'/users/'+userId+'/courses/'+courseId,
            beforeSend: beforeSend,
            success: function (data) {
                resolve(data);
            },
            error: reject
        });
    });

};

DataService.prototype.login = function (email='', password=1) {

    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            dataType: "json",
            url: this.base_url+'/login',
            data: {
                email: email,
                password: password
            },
            success:  (user) =>{
                api_token = user.api_token;
                resolve(user);
            },
            error: reject
        });
    });

};

module.exports = DataService;