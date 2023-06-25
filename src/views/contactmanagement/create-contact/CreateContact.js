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
      <CRow>
        <CCol xs="5" sm="5">
          <CCard>
            <CCardHeader>
              Create New Contact
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
                  <CLabel htmlFor="firstName">First Name</CLabel>
                  <CInput type="text" id="firstName" name="firstName" minLength="3" placeholder="Enter First Name..." required />
                  <CValidFeedback>Good!!</CValidFeedback>
				   <CInvalidFeedback className="help-block">
                    Please Provide At least 3 characters
                  </CInvalidFeedback>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="lastName">Last Name</CLabel>
                  <CInput type="text" id="lastName" name="lastName" minLength="3" placeholder="Enter Last Name..." required/>
                  <CValidFeedback>Good!!</CValidFeedback>
				  <CInvalidFeedback className="help-block">
                    Please Provide At least 3 characters
                  </CInvalidFeedback>
                </CFormGroup>
				<CFormGroup>
                  <CLabel htmlFor="name">Age</CLabel>
                  <CInput type="number" id="age" name="password" min="1" max="99" placeholder="Enter Age.." required/>
                  <CValidFeedback>Good!!</CValidFeedback>
				  <CInvalidFeedback className="help-block">
                    Please Provide Valid Age
                  </CInvalidFeedback>
                </CFormGroup>
				<CFormGroup>
                  <CLabel htmlFor="name">Photo URL</CLabel>
                  <CInput type="url" id="photo" name="photo" placeholder="Enter Photo URL.." required/>
                  <CValidFeedback>Good!!</CValidFeedback>
				  <CInvalidFeedback className="help-block">
                    Please Provide Valid Photo URL
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

export default CreateContact