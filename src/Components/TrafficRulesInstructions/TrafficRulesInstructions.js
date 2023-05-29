import React from 'react'

import './TrafficRulesInstructions.css'

const TrafficRulesInstructions = () => {
  return (
    <div className="offset_traffic_rules_inst">
        <h1 className='header_text mt-3 size_title_page text-center mb-3'>Инструкция ПДД</h1>
        <div className='d-flex align-items-center justify-content-center w-100 mt-2'>
            <button className='btn btn-info text-white mx-1'>Скачать на КАЗ</button>
            <button className='btn btn-info text-white mx-1'>Скачать на РУС</button>
        </div>
    </div>
  )
}
export default TrafficRulesInstructions;
