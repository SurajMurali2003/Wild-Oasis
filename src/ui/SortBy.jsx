import React from 'react'
import Select from './Select'
import { useSearchParams } from 'react-router-dom'

export default function SortBy({ options }) {

    const [searchParams, setSearchParams] = useSearchParams();
     
   const sortBy = searchParams.get("SortBy")
    
    console.log("sortBy", sortBy);
    
    function handleChange(e) {
        searchParams.set("SortBy", e.target.value);
        setSearchParams(searchParams)
    }

  return (
   <Select options={options} value={sortBy}  onChange={handleChange}/>
  )
}
