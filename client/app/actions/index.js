import store from '../stores/index';

import DataService from '../utils/DataService';
const dataService = new DataService();

function login(email, password) {
    store.dispatch({
        type: 'SHOW_LOADER'
    });
    dataService.login(email, password)
        .then((user) => {

            dataService.fetchCourses()
                .then((courses)=>{
                    store.dispatch({
                        type: 'SHOW_DASHBOARD',
                        data: {
                            user,
                            courses
                        }
                    });
                });

        })
        .catch((e)=>{
            store.dispatch({
                type: 'SHOW_LOGIN_ERROR'
            });
        });
}

function enrole(userId, CourseId) {
    store.dispatch({
        type: 'SHOW_LOADER'
    });
    dataService.enrole(userId, CourseId)
        .then((user) => {

            store.dispatch({
                type: 'SET_USER',
                data: user
            });

        })
        .catch((e)=>{
            store.dispatch({
                type: 'SHOW_COURSE_ERROR'
            });
        });
}


function dropout(userId, CourseId) {
    store.dispatch({
        type: 'SHOW_LOADER'
    });
    dataService.dropout(userId, CourseId)
        .then((user) => {

            store.dispatch({
                type: 'SET_USER',
                data: user
            });

        })
        .catch((e)=>{
            store.dispatch({
                type: 'SHOW_COURSE_ERROR'
            });
        });
}

function logout() {
    store.dispatch({
        type: 'LOGOUT'
    });
}

function showCourse (id){
    store.dispatch({
        type: 'SHOW_COURSE',
        id: id
    });
}

export default {
    login,
    logout,
    showCourse,
    enrole,
    dropout
};