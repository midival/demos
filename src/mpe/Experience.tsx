import React, { useEffect } from "react"
import { MPEMidivalOutput } from "@midival/core/dist/mpe"
import { IMIDIOutput } from "@midival/core"
import { ActiveNote } from "@midival/core/dist/mpe"

interface Props {
    output: IMIDIOutput
}

const modifyNote = (note: ActiveNote, slowDown: number = 5) => {
    return () => {
        
        const t = (offset: number) => Math.sin(Date.now() * slowDown + offset * Math.PI)

        note.changeTimbre(t(0) * 30 + 60)
        note.changeBend(t(50) * 0.5)
        note.changePressure(t(23) * 50 + 50)
    }
}

export const Experience = ({ output}: Props) => {

    useEffect(() => {
        console.log("INITIALIZING MPE")
        const mpeOutput = new MPEMidivalOutput(output, { lowerZoneSize: 7, upperZoneSize: 3 })
        const noteDefinitions = [64, 68, 71]
        const triggerNotes = () => {
            noteDefinitions.forEach((def, i) => {

                setTimeout(() => {
                const note = mpeOutput.lowerZone.sendNoteOn(def, 50)
                console.log('ch', note.channel)
                    setInterval(modifyNote(note, 0.001 - i*0.0003), 50)
                    setTimeout(() => note.noteOff(), 10000)
            }, i * 100)
        })
        setTimeout(triggerNotes, 10200)
        }
        setTimeout(triggerNotes, 2000)
    }, [])
    return <h1>{output.name}</h1>
}