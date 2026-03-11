import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react'

import usersData from './UsersData'

const UsersPage = ({match}) => {
  const history = useHistory()
  const [page, setPage] = useState(parseInt(match.params.page))
  const [loading, setLoading] = useState(true)
  const [userlist, setuserlist] = useState(usersData.usersData)
    



useEffect(() => {
  const MyfetchData = () => {
	fetch("https://sharingvision-backend.herokuapp.com/user/5/"+parseInt(match.params.page))
      .then(res => res.json())
      .then(
        (result) => {
		  let numb = 5*(parseInt(match.params.page)-1)
		  let Datalist = []
		  let j=0
		  for(var i = numb;i<(numb+5);i++){ 
		     if(result.data[j])
				Datalist[i] = result.data[j]
			 j++
		  }
		  setuserlist(Datalist)
		  setLoading(false);
		});	
	
}
  MyfetchData();

}, [match.params.page]);		
  const pageChange = newPage => {
   console.log(newPage)
	setLoading(true);
	fetch("https://sharingvision-backend.herokuapp.com/user/5/"+parseInt(newPage))
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
		  console.log(Datalist)
		  setuserlist(Datalist)
		  setPage(newPage)
		  setLoading(false)
		  console.log(page)
		  history.push(`/usermanagement/listuserpage/`+newPage)
		});	
  }

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            Users
            <small className="text-muted"> List User</small>
          </CCardHeader>
          <CCardBody >
          <CDataTable
            items={userlist}	
            fields={usersData.fields}
            hover
            striped
			activePage = {page}
            itemsPerPage={5}
            clickableRows
			loading={loading}
            onRowClick={(item) => history.push(`/usermanagement/listusers/${item.id}/`+page)}
            scopedSlots = {{
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

export default UsersPage
