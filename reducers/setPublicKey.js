const setPublicKeyReducer = (state = "", action) => {
    switch(action.type){
        case 'SETPUBLICKEY':
            return action.payload;
        default:
            return state;
    }
};

export default setPublicKeyReducer;