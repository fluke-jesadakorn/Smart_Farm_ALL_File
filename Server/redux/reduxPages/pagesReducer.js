const initialState = {
    payload: 1
}

export const PagesReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'HOME':
            return {
                payload: action.payload
            };
        case 'ORDER':
            return {
                payload: action.payload
            };
        case 'GRAPH':
            return {
                payload: action.payload
            };
        case 'PROFILE':
            return {
                payload: action.payload
            };
        case 'SETTING1':
            return {
                payload: action.payload
            };
        case 'SETTING2':
            return {
                payload: action.payload
            };
        default:
            return state;
    };
}