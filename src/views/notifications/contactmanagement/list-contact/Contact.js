import React, { useState, useEffect } from 'react'
import { CCard,CSpinner, CCardBody, CCardFooter,CCardHeader, CCol, CRow,CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useHistory } from 'react-router-dom'

import usersData from './UsersData'

const Contact = ({match}) => {
 const [listuser, setlistuser] = useState(usersData.usersData)
 const [spinnerShow, setspinnerShow] = useState('block')
 
useEffect(() => {
console.log(match.params.id);
//return false
  const fetchData = () => {
	fetch("https://simple-contact-crud.herokuapp.com/contact/"+match.params.id)
      .then(res => res.json())
      .then(
        (result) => {
			console.log(result.data)
		  setlistuser(result.data)
		  setspinnerShow('none')
		});	
	
}
  fetchData();

}, [match.params.id]);			


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
					history.push(`/usermanagement/listuserpage/`+match.params.page)
				
			});	
			
	e.preventDefault();		
}

const Back = ()=>{
	history.push(`/usermanagement/listuserpage/`+match.params.page)
}

  const user = listuser.find( user => user.id.toString() === match.params.id)
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
