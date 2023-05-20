import React, { useRef, useEffect, useState } from "react"
import { IMIDIAccess, IMIDIInput, MIDIVal } from "@midival/core";

interface Props {
    onSelect: (output: IMIDIInput) => void
    accessObject?: IMIDIAccess
}

export const SelectInput = ({ accessObject, onSelect }: Props) => {
    const ref = useRef<HTMLSelectElement>(null)
    const [inputs, setInputs] = useState<IMIDIInput[]>([])

    useEffect(() => {
        if (!accessObject) {
            return
        }
        console.log("Loaded")
        setInputs(accessObject.inputs)
    }, [accessObject])

    return <>
        <div className="select-description">To recieve MPE messages select one of the inputs and click SELECT INPUT</div>
        <select ref={ref}>
            {inputs.map(input => <option value={input.id}>{input.name}</option>)}
        </select>
        <button onClick={() => onSelect(inputs.find(o => o.id === ref.current!.value)!)}>SELECT INPUT</button>
    </>
}