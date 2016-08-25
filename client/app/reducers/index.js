var ininitalState = {
    username: undefined,
    documentId: undefined,
    code: '',
    error: false,
    output: '',
    language: 'javascript',
    running: false,
    chat: {
        messages: []
    }
};
export default
function Reducer(state = ininitalState, action) {
    switch (action.type) {
        case 'SET_USERNAME':
            return Object.assign({}, state, {
                username: action.data
            });
            break;
        case 'SET_DOCUMENT_ID':
            return Object.assign({}, state, {
                documentId: action.data
            });
            break;
        case 'INIT':
            return Object.assign({}, state, {
                error:false,
                code: action.data.code,
                output: action.data.output,
                language: action.data.language
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
                error: action.data.error
            });
        case 'SHOW_LOADER':
            return Object.assign({}, state, {});
        default:
            return state
    }
}