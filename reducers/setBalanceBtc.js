const setBalanceBtcReducer = (state = 0, action) => {
    switch(action.type){
        case 'SETBALANCEBTC':
            return action.payload;
        default:
            return state;
    }
};

export default setBalanceBtcReducer;