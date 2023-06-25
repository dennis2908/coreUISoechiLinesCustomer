import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { validURL,primaryBadge,arrayRemove } from '../../genFunctions/genFunctions'
import { store } from '../../redux/store'

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
  CImg,
  CPagination
} from '@coreui/react'

import usersData from './UsersData'

import CIcon from '@coreui/icons-react'

//const store = createStore(reducer)
//const articles = 23123132;

const Contacts = () => {
  const [loading, setLoading] = useState(true)
  const history = useHistory()
  const [modalDelConf, setModalDelConf] = useState(false);
  const [modalData, setModalData] = useState(false);
  const [modalDataView, setModalDataView] = useState(false);
  
  //const [ShowHideAl, setShowHideAl] = useState("d-none");
 // const [modalHeader, setmodalHeader] = useState("Save Contact Form");
//  const [SubmitBtn, setSubmitBtn] = useState("Submit");
  const [FormData, setFormData] = useState({});
  const [FormDataView, setFormDataView] = useState({});
  //const [loading, setLoading] = useState(true)
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [contacts, setcontacts] = useState(usersData.usersData)

  const pageChange = newPage => {
	store.dispatch({ type: 'CHANGE_STATE', payload: { loading : true } })  
	currentPage !== newPage && history.push(`/contactmanagement/listcontact?page=${newPage}`)
	store.dispatch({ type: 'CHANGE_STATE', payload: { loading : false } })
  }
  
  const columnFilterAge = (age) => {
    if(!age){
		return "N/A"
	}
	else
		return age
  }
  
  const toggleData = ()=>{
	store.dispatch({ type: 'CHANGE_STATE', payload: { Spinner: " " } })  
    setModalData(!modalData);
	//console.log(store.getState())
  }
  
  const toggleDataView = ()=>{
    setModalDataView(!modalDataView);
  }
  
  const toggleDelConf = ()=>{
    setModalDelConf(!modalDelConf);
  }
  
  const onFieldChange = (fieldName)=>{
	  //console.log(fieldName);
        return function (event) {
            setFormData({
				id:FormData.id,
			    firstName:FormData.firstName,
				lastName:FormData.lastName,
				photo:FormData.photo,
				age:FormData.age,
				[fieldName]: event.target.value
		  });
        }
    }

  const SavePage = (data)=>{
	//dataRedux = 555;  
	//articles.dispatch({ type: 'ADD_POST', payload: { id: 1, title: 'How to Use Redux' } })
	
	store.dispatch({ type: 'CHANGE_STATE', payload: { modulState:"Save Data",HeadModal:"Save Form Contact",ShowHideAl:"d-none"} })
	//setmodalHeader("Save Form Contact")  
	//setSubmitBtn("Save Data")
    setFormData({
	});
	toggleData()
	//setShowHideAl('d-none')
	//history.push(`/contactmanagement/listcontact?page=2`)
  }	
  
  const changeEditPage = (data)=>{
	store.dispatch({ type: 'CHANGE_STATE', payload: { modulState:"Edit Data",HeadModal:"Edit Form Contact",ShowHideAl:"d-none"} })
	//setSubmitBtn("Edit Data")
    setFormData({
		id : data.id,
		firstName : data.firstName,
		lastName : data.lastName,
		age: data.age,
		photo:data.photo
	});
	//setShowHideAl('d-none')
	toggleData()
  }
  
  const detailPage = (data)=>{
	 setFormDataView({
		firstName : data.firstName,
		lastName : data.lastName,
		age: data.age,
		photo:data.photo
	});
	toggleDataView()
  }
  
  
  async function EditDataJSON(formData) {
	  let id = formData.id
	  formData = arrayRemove(formData, "id");
	  await fetch("https://simple-contact-crud.herokuapp.com/contact/"+id, {
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
  
  const columnFilterPhoto = (photo) => {
    if(validURL(photo)){
		return <CImg src={photo} fluid={false} className="mb-2" width={100} height={60} shape={"rounded-circle"} />
	}
	else
		return <CBadge color="primary">N/A</CBadge>
  }
  const MyfetchData = () => {
	fetch("https://simple-contact-crud.herokuapp.com/contact")
      .then(res => res.json())
      .then(
        (result) => {
		  setcontacts(result.data)
		  setLoading(false);
		 
		});	
	
}

useEffect(() => {
   MyfetchData(); 
}, []);	

  useEffect(() => {
	currentPage !== page && setPage(currentPage)
  }, [currentPage, page])
  return (
    <CRow>
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
	    size="lg" 
        show={modalDataView}
        onClose={toggleDataView}
      >
        <CModalHeader closeButton className="text-primary">{FormDataView.firstName} {FormDataView.lastName}</CModalHeader>
        <CModalBody>
		<div className="row g-3" >
		 <div className="col-md-5 ms-5">
			<CImg src={FormDataView.photo || ""} shape={"rounded"} className="m-5" alt={FormDataView.firstName+" "+FormDataView.lastName} width="280" height="280"/>
		  </div>
		  <div className="col-md-5 ms-5 m-5">
			<CLabel className="form-label text-info" color="secondary">First Name</CLabel>
			<label className="form-control mb-4">{FormDataView.firstName}</label>
			<label className="form-label text-info">Last Name</label>
			<label className="form-control mb-4">{FormDataView.lastName}</label>
			<label className="form-label text-info">Age</label>
			<label className="form-control">{FormDataView.age}</label>
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
                  <CLabel htmlFor="firstName">First Name</CLabel>
				   <CInput type="hidden" id="id" name="id" value={FormData.id || ""} />
                  <CInput type="text" id="firstName" value={FormData.firstName || ""} onChange={onFieldChange('firstName').bind(this)} name="firstName" minLength="3" placeholder="Enter First Name..." required />
                  <CValidFeedback>Good!!</CValidFeedback>
				   <CInvalidFeedback className="help-block">
                    Please Provide At least 3 characters
                  </CInvalidFeedback>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="lastName">Last Name</CLabel>
                  <CInput type="text" id="lastName" name="lastName" value={FormData.lastName || ""} minLength="3" onChange={onFieldChange('lastName').bind(this)}  placeholder="Enter Last Name..." required/>
                  <CValidFeedback>Good!!</CValidFeedback>
				  <CInvalidFeedback className="help-block">
                    Please Provide At least 3 characters
                  </CInvalidFeedback>
                </CFormGroup>
				<CFormGroup>
                  <CLabel htmlFor="name">Age</CLabel>
                  <CInput type="number" id="age" name="age" min="1" max="99" value={FormData.age || ""} onChange={onFieldChange('age').bind(this)} placeholder="Enter Age.." required/>
                  <CValidFeedback>Good!!</CValidFeedback>
				  <CInvalidFeedback className="help-block">
                    Please Provide Valid Age
                  </CInvalidFeedback>
                </CFormGroup>
				<CFormGroup>
                  <CLabel htmlFor="name">Photo URL</CLabel>
                  <CInput type="url" id="photo" name="photo" value={FormData.photo || ""} onChange={onFieldChange('photo').bind(this)} placeholder="Enter Photo URL.." required/>
                  <CValidFeedback>Good!!</CValidFeedback>
				  <CInvalidFeedback className="help-block">
                    Please Provide Valid Photo URL
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
	  
     <CCol xl={12}>
        <CCard>
          <CCardHeader>
            List Contacts
            <small className="text-muted"> Contacts </small>{" "}
<CButton size="sm" color="success" onClick={SavePage} ><svg width="14" height="22" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
  <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
</svg> Add New</CButton>
          </CCardHeader>
          <CCardBody>
		 
          <CDataTable
            items={contacts}
            fields={usersData.fields}
            hover
            striped
            itemsPerPage={5}
            activePage={page}
			loading={loading}
            //clickableRows
		    //onRowClick={(item) => history.push(`/users/${item.id}`)}
            scopedSlots = {{
				'button_td':
                (item)=>(
                  <td>
				    <CButton 
					  onClick={() => detailPage(item)}
					  type="submit" size="sm" color="info"><svg width="14" height="22" fill="currentColor" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="external-link-alt" role="img" viewBox="0 0 512 512" className="svg-inline--fa fa-external-link-alt fa-w-16 fa-5x"><path fill="currentColor" d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z" className=""></path></svg> Detail</CButton>{" "}
                    <CButton 
					  onClick={() => changeEditPage(item)}
					  type="submit" size="sm" color="success"><CIcon name="cil-pencil" /> Edit</CButton> <CButton 
					  onClick={() => {
							 toggleDelConf()
						}}
					  type="submit" size="sm" color="danger"><CIcon name="cil-trash" /> Delete</CButton>
                  </td>
                ),
               'age':
                (item)=>(
                  <td>
                    <CBadge color="primary">
                      {columnFilterAge(item.age)}
                    </CBadge>
                  </td>
                ),
				'firstName':
                (item)=>(
				   <td>
                    {primaryBadge(item.firstName)}
				   </td>	
                ),
				'lastName':
                (item)=>(
				   <td>
				   {primaryBadge(item.lastName)}
				   </td>
                ),
				'id':
                (item)=>(
                   <td>
                     {primaryBadge(item.id)}
                  </td>
                ),
				'photo':
                (item)=>(
                  <td>
				    {columnFilterPhoto(item.photo)}
                  </td>
                ),
				'index':
                (item,index)=>(
				  <td>
				   <CBadge color="info">
                      {index+1}
                   </CBadge>
				  </td>
                )
            }}
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={5}
            doubleArrows={false} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}


export default Contacts

//export default Contacts
