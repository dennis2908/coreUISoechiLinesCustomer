import React from 'react'

import Signin from '../views/pages/signin/Signin';
import {
  TheContent,
  TheSidebar,
  //TheFooter,
  TheHeader
} from './index'

const TheLayout = () => {
   if(localStorage.getItem("myData")==null)
	  return (
			<Signin />
      ); 
  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent/>
        </div>
      </div>
    </div>
  )
}

export default TheLayout
