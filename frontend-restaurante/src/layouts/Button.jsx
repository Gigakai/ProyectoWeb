import React from "react"

const Button=(props) =>{
  return(
    <div>
        <button className="px-6 py-1 cursor-pointer border-2 border-brightColor text-brightColor hover:border-[#f25e53] hover:text-[#f25e53] active:border-black active:text-black transition-all rounded-full ">
            {props.title}
        </button>
    </div>
  )
}

export default Button
