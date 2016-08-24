var ininitalState = {
    username: undefined,
    documentId: undefined,
    code: '',
    error: false,
    chat: {
        messages: []
    },
    output: '',
    language: 'javascript',
    running: false
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
                output: state.output,
                language: state.language,
                running: state.running,
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
                output: state.output,
                running: state.running,
                language: state.language,
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
                code: action.data.code,
                output: action.data.output,
                running: state.running,
                language: action.data.language,
                chat: {
                    messages: action.data.messages
                }
            };
        case 'CHAT_MESSAGE':
            var messages = state.chat.messages.slice(0);
            messages.push(action.data);
            return {
                documentId: state.documentId,
                username: state.username,
                error: false,
                code: state.code,
                language: state.language,
                output: state.output,
                running: state.running,
                chat: {
                    messages: messages
                }
            };
        case 'CODE':
            return {
                documentId: state.documentId,
                username: state.username,
                language: state.language,
                error: false,
                code: action.data.content,
                output: state.output,
                running: state.running,
                chat: {
                    messages: state.chat.messages.slice(0)
                }
            };
        case 'RUNNING':
            return {
                documentId: state.documentId,
                username: state.username,
                language: state.language,
                error: false,
                code: state.code,
                output: state.output,
                running: true,
                chat: {
                    messages: state.chat.messages.slice(0)
                }
            };
        case 'OUTPUT':
            return {
                documentId: state.documentId,
                username: state.username,
                language: state.language,
                error: false,
                code: state.code,
                output: action.data.output,
                running: false,
                chat: {
                    messages: state.chat.messages.slice(0)
                }
            };
        case 'SHOW_LOADER':
            return {
                documentId: state.documentId,
                username: state.username,
                language: state.language,
                output: state.output,
                error: false,
                running: state.running,
                code: state.code,
                chat: {
                    messages: state.chat.messages.slice(0)
                }
            };
        default:
            return state
    }
}