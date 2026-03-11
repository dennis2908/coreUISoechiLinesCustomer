import { createStore } from 'redux'
import {
  CSpinner,

} from '@coreui/react'
const initialState = {
  modulState : "",
  HeadModal : "",
  ShowHideAl : "d-none",
  Spinner : <CSpinner size="sm" />,
  AlertMsg:"",
}

const reducer = (state = initialState, action) => {
	if(action.type==="CHANGE_STATE"){
		if(action.payload.modulState)
			state.modulState = action.payload.modulState;
		if(action.payload.HeadModal)
			state.HeadModal = action.payload.HeadModal;
		if(action.payload.ShowHideAl)
			state.ShowHideAl = action.payload.ShowHideAl;
		if(action.payload.Spinner)
			state.Spinner = action.payload.Spinner;
		if(action.payload.AlertMsg)
			state.AlertMsg = action.payload.AlertMsg;
	}
	
    return state
}

const store = createStore(reducer)


export {store}