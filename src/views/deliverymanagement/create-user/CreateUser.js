import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'

import {
  CButton,
  CCard,
  CCardBody,
  //CCardFooter,
  CCardHeader,
  CCol,
  //CCollapse,
  //CDropdownItem,
  //CDropdownMenu,
  //CDropdownToggle,
  //CFade,
  CForm,
  CFormGroup,
  //CFormText,
  CValidFeedback,
  CInvalidFeedback,
  //CTextarea,
  CInput,
  //CInputFile,
  //CInputCheckbox,
  //CInputRadio,
  //CInputGroup,
  //CInputGroupAppend,
  //CInputGroupPrepend,
  //CDropdown,
  //CInputGroupText,
  CLabel,
  //CSelect,
  CRow,
  //CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
//import { DocsLink } from 'src/reusable'

const CreateUser = () => {
	
  //const [collapsed, setCollapsed] = React.useState(true)
  //const [showElements, setShowElements] = React.useState(true)
const [name, setName] = useState("")
const [password, SetPassword] = useState("")
const [username, SetUsername] = useState("");

const [formData, SetformData] = useState({});
const history = useHistory()
const ChangeForm = (e)=>{
	e.preventDefault();
	console.log(e.target.value)
	console.log(e.target.name)
						if(e.target.name === "name")
						   setName(e.target.value)
					   else if(e.target.name === "username"){
						   SetUsername(e.target.value)
					   }
					       
					   else{	   
						   SetPassword(e.target.value)
					   }
					   e.preventDefault();
}
async function fetchDataJSON(formData) {
	  await fetch("https://sharingvision-backend.herokuapp.com/user", {
		  method: "post",
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
				}).then(res => res.json())
			  .then(
				(result) => {
					history.push(`/usermanagement/listuser/`)
				
			});	
	}
const SubmitForm = (e)=>{
	
    
	formData.username = username;
	formData.password = password
	formData.name = name;
	SetformData(formData);
	
	fetchDataJSON(formData)
	
	
			
	e.preventDefault();		
}
  return (
    <>
      <CRow>
        <CCol xs="5" sm="5">
          <CCard>
            <CCardHeader>
              Create New User
            </CCardHeader>
            <CCardBody>
              <CForm 
			  onChange={(e) => {
                      ChangeForm(e);
				}}
				 onSubmit={(e) => {
                      SubmitForm(e);
				}}
			  className="was-validated">
                <CFormGroup>
                  <CLabel htmlFor="username">Username</CLabel>
                  <CInput type="text" id="username" name="username" minLength="3" placeholder="Enter Username	.." required />
                  <CValidFeedback>Good!!</CValidFeedback>
				   <CInvalidFeedback className="help-block">
                    Please Provide At least 3 characters
                  </CInvalidFeedback>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="password">Password</CLabel>
                  <CInput type="password" id="password" name="password" minLength="7" placeholder="Enter Password.." required/>
                  <CValidFeedback>Good!!</CValidFeedback>
				  <CInvalidFeedback className="help-block">
                    Please Provide At least 7 characters
                  </CInvalidFeedback>
                </CFormGroup>
				<CFormGroup>
                  <CLabel htmlFor="name">Name</CLabel>
                  <CInput type="input" id="name" name="password" minLength="3" placeholder="Enter Name.." required/>
                  <CValidFeedback>Good!!</CValidFeedback>
				  <CInvalidFeedback className="help-block">
                    Please Provide At least 3 characters
                  </CInvalidFeedback>
                </CFormGroup>
				<CFormGroup>
                  <CButton 
			 
			  type="submit" size="sm" color="primary"><CIcon name="cil-check" /> Submit</CButton> <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
	</>
  )
}

export default CreateUser