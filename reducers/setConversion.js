const setConversionReducer = (state = 0, action) => {
    switch(action.type){
        case 'SETCONVERSION':
            return action.payload;
        default:
            return state;
    }
};

export default setConversionReducer;