import { Applyfilter } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"
import { createSlice } from "@reduxjs/toolkit"


const Filter = () => {
    const dispatch = useDispatch()
    const handleFilterChange = (event) => {
        const parameter = event.target.value.toLowerCase()
        dispatch(Applyfilter(parameter))

    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            <br />
            filter <input onChange={handleFilterChange} />
        </div>
    )
}

export default Filter