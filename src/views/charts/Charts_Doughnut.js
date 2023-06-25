import React from 'react'
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader
} from '@coreui/react'
import {
  
  CChartDoughnut
  
} from '@coreui/react-chartjs'

const Charts_Doughnut = () => {

  return (
    <CCardGroup columns className = "card-columns card mb-1" >

      <CCard>
        <CCardHeader>
          Front End Programming Chart
        </CCardHeader>
        <CCardBody>
          <CChartDoughnut
            datasets={[
              {
                backgroundColor: [
                  '#41B883',
                  '#E46651',
                  '#00D8FF',
                  '#DD1B16'
                ],
                data: [40, 20, 80, 10]
              }
            ]}
            labels={['VueJs', 'EmberJs', 'ReactJs', 'AngularJs']}
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>

 
    </CCardGroup>
  )
}

export default Charts_Doughnut
