import React from "react";
import {BiMap, BiStar} from "react-icons/bi";

function Review({data}){
    return (
        <div
            className="bg-gray-800 bg-opacity-50 p-6 rounded-lg border border-yellow-400 hover:bg-opacity-70 transition-all">
            <div className="flex items-center mb-4">
                <img
                    src={data.icon}
                    alt="Usuario"
                    className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                    <h3 className="text-white text-xl font-bold">{data.name}</h3>
                    <div className="flex items-center text-yellow-400">
                        <BiMap className="mr-2"/>
                        <span className="text-sm">{data.state}</span>
                    </div>
                </div>
            </div>
            <div className="flex mb-3">
                {[...Array(data.rating)].map((_, i) => (
                    <BiStar key={i} className="text-yellow-400"/>
                ))}
            </div>
            <p className="text-white">
                "{data.description}"
            </p>
        </div>

    )
}

export default Review