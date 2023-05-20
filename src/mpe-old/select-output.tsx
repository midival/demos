import React, { useRef, useEffect, useState } from "react"
import { IMIDIOutput, MIDIVal, IMIDIAccess } from "@midival/core";

interface Props {
    onSelect: (output: IMIDIOutput) => void,

    accessObject?: IMIDIAccess
}

export const SelectOutput = ({ onSelect, accessObject }: Props) => {
    const ref = useRef<HTMLSelectElement>(null)
    const [outputs, setOutputs] = useState<IMIDIOutput[]>([])

    useEffect(() => {
        if (!accessObject) {
            return;
        }
        console.log("Loaded")
        setOutputs(accessObject.outputs)
    }, [accessObject])

    return <>
        <div className="select-description">To send MPE messages select one of the outputs and click SELECT OUTPUT</div>
        <select ref={ref}>
            {outputs.map(output => <option value={output.id}>{output.name}</option>)}
        </select>
        <button onClick={() => onSelect(outputs.find(o => o.id === ref.current!.value)!)}>SELECT OUTPUT</button>
    </>
}