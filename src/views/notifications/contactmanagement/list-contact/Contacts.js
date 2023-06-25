import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CCard,
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

const Contacts = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(true)
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [contacts, setcontacts] = useState(usersData.usersData)

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/contactmanagement/listcontact?page=${newPage}`)
  }
  
  const columnFilterAge = (age) => {
    if(age > 20){
		return 90
	}
	else
		return age
  }
  
  const columnFilterPhoto = (photo) => {
    if(validURL(photo)){
		return <CImg src={photo} fluid={false} className="mb-2" width={100} height={60} shape={"rounded-circle"} />
	}
  }
  const validURL = (str) => {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}
  
  useEffect(() => {
  const MyfetchData = () => {
	fetch("https://simple-contact-crud.herokuapp.com/contact")
      .then(res => res.json())
      .then(
        (result) => {
			console.log(result.data)
		  setcontacts(result.data)
		  setLoading(false);
		});	
	
}

  MyfetchData();

}, []);	

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  return (
    <CRow>
     <CCol xl={12}>
        <CCard>
          <CCardHeader>
            Users
            <small className="text-muted"> example</small>
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
            clickableRows
		    //onRowClick={(item) => history.push(`/users/${item.id}`)}
            scopedSlots = {{
				'button_td':
                (item)=>(
                  <td>
                    <CButton 
					  onClick={(e) => {
							  //innerRef
						}}
					  type="submit" size="sm" color="success"><CIcon name="cil-pencil" /> Edit</CButton> <CButton 
					  onClick={(e) => {
							  history.push(`/usermanagement/listcontacts/${item.id}/`+page)
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
