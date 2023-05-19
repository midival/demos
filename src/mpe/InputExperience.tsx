import { IMIDIInput } from "@midival/core";
import React, { createRef, useEffect, useState } from "react";
import { MPEMidivalInput } from "../../../core/src/mpe/input/MPEMidivalInput"
import { MIDIValInput } from "../../../core/src/MIDIValInput"
import { ChannelVisualizer } from "./ChannelVisualizer/ChannelsVisualizer";
import { MPEInputZone } from "../../../core/src/mpe/input/MPEInputZone";
import { ZoneVisualizer } from "./ZoneVisualizer/ZoneVisualizer";

interface Props {
    input: IMIDIInput
}

export const InputExperience = ({ input }: Props) => {

    const [lowerZone, setLowerZone] = useState<MPEInputZone>()
    const [upperZone, setUpperZone] = useState<MPEInputZone>()

    useEffect(() => {
        const inp = new MIDIValInput(input)
        const mpe = new MPEMidivalInput(inp, {})
        mpe.onLowerZoneUpdate(lowerZone => {
            console.log("LOWER ZONE", lowerZone)
            setLowerZone(lowerZone)
        })

        mpe.onUpperZoneUpdate(upperZone => {
            console.log("UPPER ZONE", upperZone)
            setUpperZone(upperZone)
        })

    }, [])

    if (!lowerZone && upperZone) {
        return <h2>Waiting for MPE configuration message</h2>
    }

    return <>
    <h1>{input.name}</h1>
    <ChannelVisualizer lowerZone={lowerZone} upperZone={upperZone} />
    {lowerZone && <><h2>Lower Zone</h2><ZoneVisualizer zone={lowerZone} /></>}
    {upperZone && <><h2>Upper Zone</h2><ZoneVisualizer zone={upperZone} /></>}
    </>
}