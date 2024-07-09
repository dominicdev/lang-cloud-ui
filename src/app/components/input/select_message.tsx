import React, { useEffect, useState } from 'react'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const Select_message = () => {

    const [selected_, setselected_] = useState("human")

    return (
        <div className='w-full text-white' >
            <select
                value={selected_}
                onChange={(e) => setselected_(e.target.value)}
                className="bg-transparent border border-gray-300 rounded-md   "
            > 
                <option className='text-black' value="human">Human</option>
                <option className='text-black' value="ai">AI</option>
            </select>
        </div>
    )
}

export default Select_message