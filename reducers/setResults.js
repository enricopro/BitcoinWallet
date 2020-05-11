const setResultsReducer = (state = [], action) => {
    switch(action.type){
        case 'SETRESULTS':
            return action.payload;
        default:
            return state;
    }
};

export default setResultsReducer;