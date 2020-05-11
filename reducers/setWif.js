const setWifReducer = (state = "", action) => {
    switch(action.type){
        case 'SETWIF':
            return action.payload;
        default:
            return state;
    }
};

export default setWifReducer;