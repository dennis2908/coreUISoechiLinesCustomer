import React, { useState, useEffect } from 'react'
import { primaryBadge,arrayRemove } from '../../genFunctions/genFunctions'
import { store } from '../../redux/store'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
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
  //CValidFeedback,
  //CInvalidFeedback,
  //CTextarea,
  CInput,
  CSelect,
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

const Delivery = ({match}) => {
  //const history = useHistory()
  const [modalDelConf, setModalDelConf] = useState(false);
  const [IdDel, setIdDel] = useState();
  const [modalData, setModalData] = useState(false);
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [FormData, setFormData] = useState({});
//  const [loading, setLoading] = useState(true)
  const history = useHistory()

  const myData = localStorage.getItem("myData")
  const idData = localStorage.getItem("id")
  const [userlist, setuserlist] = useState(usersData.usersData)
  
  const [item, setItem] = useState([]);
  
  const SavePage = (data)=>{
	store.dispatch({ type: 'CHANGE_STATE', payload: { modulState:"Save Data",HeadModal:"Add New Delivery",ShowHideAl:"d-none"} })
    setFormData({
	});
	toggleData()
  }	
    
  const toggleData = ()=>{
	store.dispatch({ type: 'CHANGE_STATE', payload: { Spinner: " " } })  
    setModalData(!modalData);
	//console.log(store.getState())
  }	
  
	
  async function SaveDataJSON() {
	  setFormData(arrayRemove(FormData, "id")); 
	  await fetch("http://localhost:9333/Driver/AddShipment/"+idData, {
		  method: "post",
		  headers: {"Authorization" : "Bearer "+myData},
			body: JSON.stringify(FormData)
				}).then(res => res.json())
			  .then(
				(result) => {
					//setShowHideAl('d-block')
					store.dispatch({ type: 'CHANGE_STATE', payload: { ShowHideAl:"d-block",Spinner:" ",AlertMsg:"Succeed Save Data"} })
					MyfetchData();
					
				
			});	
	}
	
	async function DeleteShipment() {
	  fetch("http://localhost:9333/Driver/DeleteShipment/"+IdDel, {
		  method: "delete",
		  headers: {"Authorization" : "Bearer "+myData},
			body: JSON.stringify(FormData)
				}).then(res => res.json())
			  .then(
				(result) => {
					//setShowHideAl('d-block')
					MyfetchData();
					toggleDelConf();
					
				
			});	
	}

 const SubmitForm = (e)=>{
	e.preventDefault();	 
	store.dispatch({ type: 'CHANGE_STATE', payload: { Spinner:<CSpinner size="sm"/> } })
	e.preventDefault();	 
	store.dispatch({ type: 'CHANGE_STATE', payload: { Spinner:<CSpinner size="sm"/> } })
	SaveDataJSON()
	
	e.preventDefault();		
 }
  
 const onFieldChange = (fieldName)=>{
	  //console.log(fieldName);
        return function (event) {
            setFormData({
				id:FormData.id,
			    item_id:FormData.item_id,
				qty:FormData.qty,
				[fieldName]: event.target.value
		  });
        }
 }
  
 const GetPage = (index,thePage)=>{
    if(parseInt(thePage) > 1){
		index -= 5*(thePage-1) 
	}
	return index
  }
	
	
async function MyfetchData() {
	await fetch("http://localhost:9333/Driver/Item", {
	headers: {"Authorization" : "Bearer "+myData}}) 
      .then(res => res.json())
      .then(
        (result) => {
		  setItem(result);
		});		
	await fetch("http://localhost:9333/Driver/GetShipmentCustomerWithLimitOffset/"+idData+"/5/0",{
	headers: {"Authorization" : "Bearer "+myData}})
      .then(res => res.json())
      .then(
        (result) => {
		  let Datalist = []
		  let j=0
		  for(var i = 0;i<5;i++){ 
		     if(result[j])
				Datalist[i] = result[j]
			 j++
		  }
		  setuserlist(Datalist)
		  setPage(1)
		  setLoading(false)
		  //return
		}).catch((error) => {
		  history.push('/logout')
	});	
		
	
}

const toggleDelConf = ()=>{
	
    setModalDelConf(!modalDelConf);
  }
  
const FormtoggleDelConf = (data)=>{
	setIdDel(data.Shipment_id)
	toggleDelConf()
  }  
 
useEffect(() => {
  async function MyfetchData() {
	await fetch("http://localhost:9333/Driver/Item", {
	headers: {"Authorization" : "Bearer "+myData}}) 
      .then(res => res.json())
      .then(
        (result) => {
		  setItem(result);
		});		
	await fetch("http://localhost:9333/Driver/GetShipmentCustomerWithLimitOffset/"+idData+"/5/0",{
	headers: {"Authorization" : "Bearer "+myData}})
      .then(res => res.json())
      .then(
        (result) => {
		  let Datalist = []
		  let j=0
		  for(var i = 0;i<5;i++){ 
		     if(result[j])
				Datalist[i] = result[j]
			 j++
		  }
		  setuserlist(Datalist)
		  setPage(1)
		  setLoading(false)
		  //return
		}).catch((error) => {
		  history.push('/logout')
	});	
		
	
}
MyfetchData()
  

}, [myData,history,idData]);		
  async function pageChange(newPage) {
    setLoading(true)
	await fetch("http://localhost:9333/Driver/GetShipmentCustomerWithLimitOffset/"+idData+"/5/"+(5*(parseInt(newPage)-1)),{
	headers: {"Authorization" : "Bearer "+myData}})
      .then(res => res.json())
      .then(
        (result) => {
		  let numb = 10*(parseInt(newPage)-1)
		  let Datalist = []
		  let j=0
		  for(var i = numb;i<(numb+5);i++){ 
		     if(result[j])
				Datalist[i] = result[j]
			 j++
		  }
		  setuserlist(Datalist)
		  setPage(newPage)
		  setLoading(false)
		});	
  }
  
  
let dataItem =   [<option value='' key={String(0) + String(0)}>== Pilih Item==</option>];
  if(item){
	  item.forEach((k, v) => {
		   dataItem.push(<option value={k.Id} key={String(k.Id) + String(k.Id)}>{k.Name}</option>);	
	  })
 }
 else
  dataItem.push(<option>Pilih Data</option>)
  return (
  
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            Delivery
            <small className="text-muted"> List Delivery</small> <CButton size="sm" color="success" onClick={SavePage} ><svg width="14" height="22" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
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
            <CIcon name="cil-x" />
			Cancel
          </CButton>
          <CButton color="danger" 
		  onClick={() => DeleteShipment()}
		  ><CIcon name="cil-check" /> Proceed</CButton>
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
                  <CLabel htmlFor="item_id">Item</CLabel>
				   <CInput type="hidden" name="id"  value={FormData.id || ""} onChange={onFieldChange('id').bind(this)}/>
				   <CSelect name="item_id" value={FormData.item_id || ""} onChange={onFieldChange('item_id').bind(this)} required>
				   {dataItem}
                    </CSelect>
                </CFormGroup>
				<CFormGroup>
                  <CLabel htmlFor="name">Quantity</CLabel>
                  <CInput type="text" name="qty" min="1" max="99" value={FormData.qty || ""} onChange={onFieldChange('qty').bind(this)} required/>
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
          ><CIcon name="cil-x" /> Cancel</CButton>
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
					  onClick={() => {
							 FormtoggleDelConf(item)
						}}
					  type="submit" size="sm" color="danger"><CIcon name="cil-trash" /> Delete</CButton>
                  </td>
                ),
				'index':
                (item,index)=>(
				  <td>
				   <CBadge color="info">
                      {GetPage(index+1,page)}
                   </CBadge>
				  </td>
                ),
				'item_name':
                (item)=>(
				  <td>
				  {primaryBadge(item.item_name)}
				  </td>
                ),
				'name':
                (item)=>(
				  <td>
				  {primaryBadge(item.name)}
				  </td>
                ),
				'qty':
                (item)=>(
				  <td>
				  {primaryBadge(item.qty)}
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
  return { state: action.history.location.pathname };
};

export default connect(mapStateToProps,{ store: store })(Delivery)
