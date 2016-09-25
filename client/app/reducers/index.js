var ininitalState = {
    username: undefined,
    documentId: undefined,
    code: '',
    error: false,
    output: '',
    language: undefined,
    running: false,
    connected: false,
    chat: {
        messages: []
    },
    online: [],
    theme: 'tomorrow_night_eighties',
    view: {
        Result: false,
        Info: true
    }
};
export default
function Reducer(state = ininitalState, action) {
    // console.log(action.type, action);
    switch (action.type) {
        case 'PARTICIPANTS':
            return Object.assign({}, state, {
                online: action.data
            });
            break;
        case 'CONNECTED':
            return Object.assign({}, state, {
                connected: action.data
            });
            break;
        case 'SET_USERNAME':
            return Object.assign({}, state, {
                username: action.data
            });
            break;
        case 'SET_THEME':
            return Object.assign({}, state, {
                theme: action.data
            });
            break;
        case 'SET_VIEW':
            var object = {};
            object[action.data.option] = action.data.value;
            return Object.assign({}, state, {
                view: Object.assign({}, state.view, object)
            });
            break;
        case 'SET_DOCUMENT_ID':
            return Object.assign({}, state, {
                documentId: action.data
            });
            break;
        case 'INIT':
            return Object.assign({}, state, {
                error: false,
                code: action.data.code,
                output: action.data.output,
                language: action.data.language,
                chat: {
                    messages: action.data.messages
                }
            });
        case 'CHAT_MESSAGE':
            var messages = state.chat.messages.slice(0);
            messages.push(action.data);
            return Object.assign({}, state, {
                chat: {
                    messages: messages
                }
            });
        case 'CODE':
            return Object.assign({}, state, {
                code: action.data.content
            });
        case 'SET_LANGUAGE':
            return Object.assign({}, state, {
                language: action.data.language
            });
        case 'RUNNING':
            return Object.assign({}, state, {
                running: true
            });
        case 'OUTPUT':
            return Object.assign({}, state, {
                output: action.data.output,
                running: false
            });
        case 'ERROR':
            return Object.assign({}, state, {
                error: action.data
            });
        case 'SHOW_LOADER':
            return Object.assign({}, state, {});
        default:
            return state
    }
}