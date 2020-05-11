const setPrivateKeyReducer = (state = "", action) => {
    switch(action.type){
        case 'SETPRIVATEKEY':
            return action.payload;
        default:
            return state;
    }
};

export default setPrivateKeyReducer;