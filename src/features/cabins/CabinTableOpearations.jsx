import React from 'react'
import Filter from '../../ui/Filter'
import SortBy from '../../ui/SortBy'

export default function CabinTableOpearations() {
    return (
      <>
      <Filter filterField={"discount"} options={[
          {value: "all", label: "All"},
          {value: "no-discount", label: "No Discount"},
          {value: "with-discount", label: "With Discount"},
        ]} />
      
       <SortBy options={[
           {value:"name-asc" ,label:"Sort By Name(A-Z)"},
           {value:"name-desc" ,label:"Sort By Name(Z-A)"},
           {value:"regularPrice-asc" ,label:"Sort by Price(Low-High)"},
           {value:"regularPrice-desc" ,label:"Sort by Price(High-Low)"},
           {value:"maxCapacity-asc" ,label:"Sort by Capacity(Low)"},
           {value:"maxCapacity-desc" ,label:"Sort by Capacity(High)"}
        ]}/>
        </>
  )
}
