import { useReducer, createContext } from "react";


const NotiReducer = (state, action) => {
    switch (action.type) {
        case "NEW_NOTI":
            return `A new anecdote created: ${action.data}`;
        case "VOTE_NOTI":
            return `Vote cast: ${action.data}`;
        case "ERROR":
            return action.payload;
        case "RESET":
            return "";
        default: 
            return state;
    }
}

const NotiContext = createContext()  
export const NotiContextProvider = (props) => {
    const [noti, notiDispatch] = useReducer(NotiReducer, "")

    return (
        <NotiContext.Provider value={[ noti, notiDispatch ]}>
            {props.children}
        </NotiContext.Provider>
    )
}

export default NotiContext