import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  //CCol,
  //CCollapse,
  //CDropdownItem,
  //CDropdownMenu,
  //CDropdownToggle,
  //CFade,
  CForm,
  CFormGroup,
  CFormText,
  //CValidFeedback,
  //CInvalidFeedback,
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
  //CRow,
  //CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
//import { DocsLink } from 'src/reusable'

const CreateContact = () => {
	
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
      <CCard>
            <CCardHeader>
              Add User
              <small> Form</small>
            </CCardHeader>
            <CCardBody>
              <CForm 
				onChange={(e) => {
                      ChangeForm(e);
				}}
				>
                <CFormGroup>
                  <CLabel htmlFor="username">Username</CLabel>
                  <CInput type="text" id="username" name="username" placeholder="Enter Username	.." autoComplete="current-username" required />
                  <CFormText className="help-block">Please enter your username</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="password">Password</CLabel>
                  <CInput type="password" id="password" name="password" placeholder="Enter Password.." autoComplete="current-password" required/>
                  <CFormText className="help-block">Please enter your password</CFormText>
                </CFormGroup>
				<CFormGroup>
                  <CLabel htmlFor="name">Nama</CLabel>
                  <CInput type="text" id="name" 
				  name="name"
				  
				  placeholder="Enter Name.." autoComplete="current-name" required />
                  <CFormText className="help-block">Please enter your name</CFormText>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton 
			  onClick={(e) => {
                      SubmitForm(e);
				}}
			  type="submit" size="sm" color="primary"><CIcon name="cil-check" /> Submit</CButton> <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
	</>
  )
}

export default CreateContact