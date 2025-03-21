import React from "react";


function ItemProduct() {
    return (
        <>
            <div className="flex flex-row w-full items-center justify-start">
                <div className="p-2">
                    <img className="w-12 h-12 rounded-[50%] object-cover" src="https://res.cloudinary.com/amecar/image/upload/f_auto,w_849/v1591307573/ALAPARRILLA-DoubleWesternBaconCheeseburger-min_l4q26i.jpg" alt=""/>
                </div>
                <div className="flex flex-row justify-between w-[85%]">
                    <div className="flex flex-col items-start w-[80%] px-1">
                        <p className="text-lg text-black font-medium text-start">Western Bacon</p>
                        <span className="text-base text-black">Hamburguesa con triple salsa</span>
                    </div>
                    <div className="flex flex-col items-end w-[20%] px-1">
                        <p className="text-lg text-black font-medium">$120.00</p>
                        <div className="flex flex-row items-center justify-center gap-1">

                            <span className="text-base text-black">Cantidad: 1</span>
                        </div>

                    </div>
                </div>

            </div>
            <div className="flex items-center w-full justify-center">
                <hr className="text-[#f25e53] my-2 bg-[#f25e53] w-[90%] shadow-lg shadow-[#f25e53]"/>
            </div>
        </>
    )
}

export default ItemProduct