import React, { useState, useEffect } from 'react'
import {validURL} from '../../genFunctions/genFunctions'
import { CCard,CSpinner, CImg, CCardBody, CCardFooter,CCardHeader, CCol, CRow,CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useHistory } from 'react-router-dom'

//import usersData from './UsersData'

 const Contact = ({match}) => {
 const [listuser, setlistuser] = useState([])
 const [spinnerShow, setspinnerShow] = useState('block')

useEffect(() => {
 
  const fetchData = () => {
	  fetch("https://simple-contact-crud.herokuapp.com/contact/"+match.params.id)
      .then(res => res.json())
      .then(
        (result) => {
		//	   console.log(result.data[0])
		  setlistuser(Array(result.data))
		
		  setspinnerShow('none')
		}).catch((error) => {
  console.log(error)
    setspinnerShow('none')
});	
	
}
  fetchData();

}, [match.params.id]);			

const fetchUser = (listuser) => {
	//console.log(listuser)
	//console.log(Object.keys(listuser).length)
	if(Object.keys(listuser).length > 0){
		//console.log(listuser)
		return listuser.find( user => (user.id.toString()) === (match.params.id.toString()))
	}
		
	
}
const columnFilterPhoto = (photo) => {
    if(validURL(photo)){
		return <CImg src={photo} fluid={false} className="mb-2" width={100} height={60} shape={"rounded-circle"} />
	}
	else
		return "N/A"
  }
const history = useHistory()
const Deletedata = (e)=>{
	e.preventDefault();
	fetch("https://sharingvision-backend.herokuapp.com/user/"+match.params.id, {
		  method: "delete",
		  headers: {
			  'Content-Type': 'application/json'
			}
		}).then(res => res.json())
			  .then(
				(result) => {
					history.push(`/contactmanagement/listcontact?page=`+match.params.page)
				
			});	
			
	e.preventDefault();		
}

const Back = ()=>{
	history.push(`/contactmanagement/listcontact?page=`+match.params.page)
}

  const user = fetchUser(listuser)
  
  const userDetails = user ? Object.entries(user) : 
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
            Delete id: {match.params.id}
          </CCardHeader>
          <CCardBody>
		  	<CSpinner
        style={{width:'4rem', height:'4rem',display:spinnerShow}}
        color="danger"
        variant="grow"
      />
              <table className="table table-striped table-hover">
                <tbody>
                  {
                    userDetails.map(([key, value], index) => {
						if(key==="photo"){
							value = columnFilterPhoto(value)
						}
                      return (
                        <tr key={index.toString()}>
                          <td>{`${key}:`}</td>
                          <td><strong>{value}</strong></td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
          </CCardBody>
		   <CCardFooter>
              <CButton 
			  onClick={(e) => {
                     Deletedata(e)
				}}
			  type="submit" size="sm" color="danger"><CIcon name="cil-trash" /> Delete</CButton> <CButton 
			  onClick={(e) => {
                     Back()
				}}
			  type="submit" size="sm" color="success"><CIcon name="cil-x" /> Close</CButton>			  
			</CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Contact