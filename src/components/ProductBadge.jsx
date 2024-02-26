import React from 'react'

const ProductBadge = ({badge}) => {

    if (badge === "choice"){
    return(
        <span className="text-xs xl:text-sm bg-slate-800 text-white p-1">Amazon's<span className="text-orange-500">Choice</span></span>
    )
}
    else if (badge === "seller"){
        return(
            <span></span>
        )
    }
    else if (badge === "limited"){
        return(
            <span></span>
        )
    }
  return (
    <div>
      
    </div>
  )
}

export default ProductBadge;
