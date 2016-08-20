var ininitalState = {
    username: undefined,
    documentId: undefined,
    code: '',
    error: false,
    chat: {
        messages: []
    }
};
export default
function Reducer(state = ininitalState, action) {
    // console.log(action.type, state, action);
    switch (action.type) {
        case 'SET_USERNAME':
            return {
                documentId: state.documentId,
                username: action.data,
                error: state.error,
                code: state.code,
                chat: {
                    messages: state.chat.messages.slice(0)
                }
            };
            break;
        case 'SET_DOCUMENT_ID':
            return {
                documentId: action.data,
                username: state.username,
                error: state.error,
                code: state.code,
                chat: {
                    messages: state.chat.messages.slice(0)
                }
            };
            break;
        case 'INIT':
            return {
                documentId: state.documentId,
                username: state.username,
                error: false,
                chat: {
                    messages: action.data.messages
                },
                code: action.data.code
            };
        case 'CHAT_MESSAGE':
            var messages = state.chat.messages.slice(0);
            messages.push(action.data);
            return {
                documentId: state.documentId,
                username: state.username,
                error: false,
                code: state.code,
                chat: {
                    messages: messages
                }
            };
        case 'CODE':
            return {
                documentId: state.documentId,
                username: state.username,
                error: false,
                code: action.data.content,
                chat: {
                    messages: state.chat.messages.slice(0)
                }
            };
        case 'SHOW_LOADER':
            return {
                documentId: state.documentId,
                username: state.username,
                error: false,
                code: state.code,
                chat: {
                    messages: state.chat.messages.slice(0)
                }
            };
        default:
            return state
    }
}