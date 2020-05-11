const setBalanceUsdReducer = (state = 0, action) => {
    switch(action.type){
        case 'SETBALANCEUSD':
            return action.payload;
        default:
            return state;
    }
};

export default setBalanceUsdReducer;