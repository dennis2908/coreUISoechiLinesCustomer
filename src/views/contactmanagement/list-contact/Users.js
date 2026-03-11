import React, { useState, useEffect } from 'react'
//import { useHistory } from 'react-router-dom'
import { primaryBadge,arrayRemove } from '../../genFunctions/genFunctions'
import { store } from '../../redux/store'
import { connect } from 'react-redux'
import {
  CBadge,
  CAlert,
  CCard,
  CSpinner,
  CModal,
  CForm,
  CFormGroup,
  CModalTitle,
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
  CModalHeader,
  CModalBody,
  CModalFooter,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CPagination
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import usersData from './UsersData'

//import CIcon from '@coreui/icons-react'

const Users = ({match}) => {
  //const history = useHistory()
  const [modalDelConf, setModalDelConf] = useState(false);
  const [modalData, setModalData] = useState(false);
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [FormData, setFormData] = useState({});
  const [FormDataView, setFormDataView] = useState({});
//  const [loading, setLoading] = useState(true)
  const [userlist, setuserlist] = useState(usersData.usersData)
  
  const [modalDataView, setModalDataView] = useState(false);
  
  const SavePage = (data)=>{
	//dataRedux = 555;  
	//articles.dispatch({ type: 'ADD_POST', payload: { id: 1, title: 'How to Use Redux' } })
	
	store.dispatch({ type: 'CHANGE_STATE', payload: { modulState:"Save Data",HeadModal:"Save Form User",ShowHideAl:"d-none"} })
	//setmodalHeader("Save Form Contact")  
	//setSubmitBtn("Save Data")
    setFormData({
	});
	toggleData()
	//setShowHideAl('d-none')
	//history.push(`/contactmanagement/listcontact?page=2`)
  }	
    
  const toggleData = ()=>{
	store.dispatch({ type: 'CHANGE_STATE', payload: { Spinner: " " } })  
    setModalData(!modalData);
	//console.log(store.getState())
  }	
  
  
  const detailPage = (data)=>{
	 setFormDataView({
		username : data.username,
		name : data.name,
		password: data.password,
		id:data.id
	});
	toggleDataView()
  }
  
  async function EditDataJSON(formData) {
	  let id = formData.id
	  formData = arrayRemove(formData, "id");
	  await fetch("https://sharingvision-backend.herokuapp.com/user/"+id, {
		  method: "put",
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(FormData)
				}).then(res => res.json())
			  .then(
				(result) => {
					
					store.dispatch({ type: 'CHANGE_STATE', payload: { ShowHideAl:"d-block",Spinner:" ",AlertMsg:"Succeed Update Data"} })
					MyfetchData();
					
			});	
	}
	
  async function SaveDataJSON(formData) {
	  await fetch("https://simple-contact-crud.herokuapp.com/contact", {
		  method: "post",
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
				}).then(res => res.json())
			  .then(
				(result) => {
					//setShowHideAl('d-block')
					store.dispatch({ type: 'CHANGE_STATE', payload: { ShowHideAl:"d-block",Spinner:" ",AlertMsg:"Succeed Save Data"} })
					MyfetchData();
					
				
			});	
	}

 const SubmitForm = (e)=>{
	store.dispatch({ type: 'CHANGE_STATE', payload: { Spinner:<CSpinner size="sm"/> } })
		
	if(FormData.id){
		EditDataJSON(FormData)
	}	
		
	else
		SaveDataJSON(FormData)
	
	e.preventDefault();		
 }
 
 const toggleDataView = ()=>{
    setModalDataView(!modalDataView);
  }
 
 const onFieldChange = (fieldName)=>{
	  //console.log(fieldName);
        return function (event) {
            setFormData({
				id:FormData.id,
			    username:FormData.username,
				password:FormData.password,
				name:FormData.name,
				[fieldName]: event.target.value
		  });
        }
    }
	
const changeEditPage = (data)=>{
	store.dispatch({ type: 'CHANGE_STATE', payload: { modulState:"Edit Data",HeadModal:"Edit Form User",ShowHideAl:"d-none"} })
	//setSubmitBtn("Edit Data")
    setFormData({
		id : data.id,
		name : data.name,
		username : data.username,
		password: data.password
	});
	//setShowHideAl('d-none')
	toggleData()
  }	
	
async function MyfetchData() {
	await fetch("http://localhost:9333/Driver/GetShipmentWithLimitOffset/5/1")
      .then(res => res.json())
      .then(
        (result) => {
		  let Datalist = []
		  let j=0
		  for(var i = 0;i<5;i++){ 
		     if(result.data[j])
				Datalist[i] = result.data[j]
			 j++
		  }
		  setuserlist(Datalist)
		  //console.log(Datalist)
		  setLoading(false)
		  //return
		});	
	
}

const toggleDelConf = ()=>{
    setModalDelConf(!modalDelConf);
  }
 
useEffect(() => {
  MyfetchData();
  

}, []);		
  async function pageChange(newPage) {
    setLoading(true)
	await fetch("https://sharingvision-backend.herokuapp.com/user/5/"+parseInt(newPage))
      .then(res => res.json())
      .then(
        (result) => {
		  let numb = 5*(parseInt(newPage)-1)
		  let Datalist = []
		  let j=0
		  for(var i = numb;i<(numb+5);i++){ 
		     if(result.data[j])
				Datalist[i] = result.data[j]
			 j++
		  }
		  //console.log(Datalist)
		  setuserlist(Datalist)
		  setPage(newPage)
		  setLoading(false)
		});	
  }

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            Users
            <small className="text-muted"> List User</small> <CButton size="sm" color="success" onClick={SavePage} ><svg width="14" height="22" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
  <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
</svg> Add New</CButton>
          </CCardHeader>
          <CCardBody >
		  <CModal
        show={modalDelConf}
        onClose={toggleDelConf}
      >
        <CModalHeader>
          <CModalTitle>Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>
          You are about to delete this item
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary"  onClick={toggleDelConf}>
            Cancel
          </CButton>
          <CButton color="danger">Proceed</CButton>
        </CModalFooter>
      </CModal>
	  <CModal
	   
        show={modalDataView}
        onClose={toggleDataView}
      >
        <CModalHeader closeButton className="text-primary d-flex justify-content-end">{FormDataView.username}</CModalHeader>
        <CModalBody>
		<div className="row g-5 d-flex justify-content-center" >
		  <div className="col">
			<CLabel className="form-label text-info" color="secondary">Username</CLabel>
			<label className="form-control mb-4">{FormDataView.username}</label>
			<label className="form-label text-info">Name</label>
			<label className="form-control mb-4">{FormDataView.name}</label>
			<label className="form-label text-info">Password</label>
			<label className="form-control">{FormDataView.password}</label>
		  </div>	
		</div>
        </CModalBody>
        <CModalFooter>
          {' '}
          <CButton
            color="secondary"
            onClick={toggleDataView}
          >Close</CButton>
        </CModalFooter>
      </CModal>
		  <CModal
        show={modalData}
        onClose={toggleData}
      >
        <CModalHeader closeButton>{store.getState().HeadModal}</CModalHeader>
        <CModalBody>
		<CAlert color="success" className={store.getState().ShowHideAl}>{store.getState().AlertMsg}</CAlert>
         <CForm 
				 onSubmit={(e) => {
                      SubmitForm(e);
				}}
			  className="was-validated">
                <CFormGroup>
                  <CLabel htmlFor="username">Username</CLabel>
				   <CInput type="hidden" id="id" name="id" value={FormData.id || ""} />
                  <CInput type="text" id="username" value={FormData.username || ""} onChange={onFieldChange('username').bind(this)} name="username" minLength="3" placeholder="Enter Username..." required />
                  <CValidFeedback>Good!!</CValidFeedback>
				   <CInvalidFeedback className="help-block">
                    Please Provide At least 3 characters
                  </CInvalidFeedback>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="name">Name</CLabel>
                  <CInput type="text" id="name" name="name" value={FormData.name || ""} minLength="3" onChange={onFieldChange('name').bind(this)}  placeholder="Enter Name..." required/>
                  <CValidFeedback>Good!!</CValidFeedback>
				  <CInvalidFeedback className="help-block">
                    Please Provide At least 3 characters
                  </CInvalidFeedback>
                </CFormGroup>
				<CFormGroup>
                  <CLabel htmlFor="name">Password</CLabel>
                  <CInput type="text" id="password" name="password" min="1" max="99" value={FormData.password || ""} onChange={onFieldChange('password').bind(this)} placeholder="Enter Password.." required/>
                  <CValidFeedback>Good!!</CValidFeedback>
				  <CInvalidFeedback className="help-block">
                    Please Provide At least 7 characters
                  </CInvalidFeedback>
                </CFormGroup>

				<CFormGroup>
				
                  <CButton 
			 
			  type="submit" size="sm" color="primary">
			  <CIcon name="cil-check" /> {store.getState().modulState}</CButton> {store.getState().Spinner}
			 
			  
                </CFormGroup>
              </CForm>
        </CModalBody>
        <CModalFooter>
          {' '}
          <CButton
            color="secondary"
            onClick={toggleData}
          >Cancel</CButton>
        </CModalFooter>
      </CModal>
          <CDataTable
            items={userlist}	
            fields={usersData.fields}
            hover
            striped
			activePage = {page}
            itemsperpage={5}
            //clickableRows
			loading={loading}
            //onRowClick={(item) => history.push(`/usermanagement/listusers/${item.id}/`+page)}
            scopedSlots = {{
				'button_td':
                (item)=>(
                  <td>
				     <CButton 
					  onClick={() => detailPage(item)}
					  type="submit" size="sm" color="info"><svg width="14" height="22" fill="currentColor" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="external-link-alt" role="img" viewBox="0 0 512 512" className="svg-inline--fa fa-external-link-alt fa-w-16 fa-5x"><path fill="currentColor" d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z" className=""></path></svg> Detail</CButton>
					  <CButton 
					  onClick={() => changeEditPage(item)}
					  className="mr-2 ml-2"
					  type="submit" size="sm" color="success"><CIcon name="cil-pencil" /> Edit</CButton> 
                     <CButton 
					  onClick={() => {
							 toggleDelConf()
						}}
					  type="submit" size="sm" color="danger"><CIcon name="cil-trash" /> Delete</CButton>
                  </td>
                ),
				'index':
                (item,index)=>(
				  <td>
				   <CBadge color="info">
                      {index+1}
                   </CBadge>
				  </td>
                ),
				'username':
                (item)=>(
				  <td>
				  {primaryBadge(item.username)}
				  </td>
                ),
				'password':
                (item)=>(
				  <td>
				  {primaryBadge(item.password)}
				  </td>
                ),
				'name':
                (item)=>(
				  <td>
				  {primaryBadge(item.name)}
				  </td>
                ),
				'id':
                (item)=>(
				  <td>
				  {primaryBadge(item.id)}
				  </td>
                )
            }}
          />
          <CPagination
            activePage = {page} 
            onActivePageChange={pageChange}
             itemsPerPage={5}
            doubleArrows={true} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

const mapStateToProps = (state, action) => {
  console.log(state)
  return { state: action.history.location.pathname };
};

export default connect(mapStateToProps,{ store: store })(Users)
