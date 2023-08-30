const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.payload
        default:
            return state
    }
}

export const Applyfilter = (filter) => {
    if (filter === '') {
        return {
            type: 'SET_FILTER',
            payload: ''
        }
    }
    return {
        type: 'SET_FILTER',
        payload: filter
    }
}

export default filterReducer