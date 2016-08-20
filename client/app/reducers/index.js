export default
function Reducer(state = {user:{}}, action){
    switch (action.type) {
        case 'LOGOUT':
            return {
                user: {},
                loading: false,
                error: false
            };
        case 'SHOW_LOADER':
            return {
                user: state.user,
                courses: state.courses,
                loading: true,
                error: false,
                route: state.route
            };
        case 'SHOW_COURSE_ERROR':
            return {
                user: state.user,
                courses: state.courses,
                loading: false,
                error: true,
                route: 'dashboard'
            };
        case 'SHOW_LOGIN_ERROR':
            return {
                user: {},
                loading: false,
                error: true,
                route: 'login'
            };
        case 'SHOW_DASHBOARD':
            return {
                user: action.data.user,
                courses: action.data.courses,
                loading: false,
                error: false,
                route: 'dashboard'
            };
        case 'SET_USER':
            return {
                user: action.data,
                courses: state.courses,
                loading: false,
                error: false,
                route: 'dashboard'
            };
        case 'SHOW_COURSE':
            return {
                user: state.user,
                courses: state.courses,
                loading: false,
                error: false,
                route: 'dashboard',
                selectedCourseId: action.id
            };
        default:
            return state
    }
}