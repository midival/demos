import React, { useEffect, useState } from "react";
import { SelectOutput } from "./select-output";
import { IMIDIAccess, IMIDIOutput, MIDIVal } from "@midival/core";
import { Experience } from "./Experience";
import { SelectInput } from "./select-input";
import { IMIDIInput } from "../../../core/src";
import { InputExperience } from "./InputExperience";

export function App() {
    const [output, setOutput] = useState<IMIDIOutput>()
    const [input, setInput] = useState<IMIDIInput>()
    const [access, setAccess] = useState<IMIDIAccess>()

    useEffect(() => {
        MIDIVal.connect()
        .then(access => setAccess(access))
    })

    if (output) {
        return <Experience output={output} />
    }

    if (input) {
        return <InputExperience input={input} />
    }

    return <>
    <div>
    <SelectOutput accessObject={access} onSelect={(v) => {
        setOutput(v)
    }} /></div>
    <SelectInput accessObject={access} onSelect={(v) => {
        setInput(v)
    }} />
    
    </>
  }