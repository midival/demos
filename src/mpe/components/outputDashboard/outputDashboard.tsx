import { IMIDIInput, IMIDIOutput, MIDIValInput, MIDIValOutput, NoteMessage } from "@midival/core"
import { For, createSignal } from "solid-js"
import { ActiveNote, MPEMidivalOutput } from "@midival/core/dist/mpe"

import * as classes from "./style.module.css"

interface Props {
    output: IMIDIOutput
}

interface NoteProps {
    value: number,
    mpe: MPEMidivalOutput
}

const identity = (x) => x

const Note = ({ value, mpe }: NoteProps) => {
    const [note, setNote] = createSignal<ActiveNote>({
        x: 0,
        y: 0,
        z: 0,
    } as any, { equals: false })
    const [isXLfo, setIsXLfo] = createSignal<number>(0)
    const [isYLfo, setIsYLfo] = createSignal<number>(0)
    const [isZLfo, setIsZLfo] = createSignal<number>(0)

    const startNote = () => {
        setNote(mpe.lowerZone.sendNoteOn(value, 100))
    }

    const toggleLfoX = () => {
        if (isXLfo()) {
            setIsXLfo(0)
            return
        }
        setIsXLfo(Math.random())
        lfoX()
    }

    const lfoX = () => {
        if (!isXLfo()) {
            return
        }

        const t = Math.sin(Date.now() / (Math.PI * 500) + 200 * isXLfo())

        note().x = t * 0.5
        setNote(identity)

        setTimeout(lfoX, 50)
    }

    const toggleLfoY = () => {
        if (isYLfo()) {
            setIsYLfo(0)
            return
        }
        setIsYLfo(Math.random())
        lfoY()
    }

    const lfoY = () => {
        if (!isYLfo()) {
            return
        }
        const t = Math.sin(Date.now() / (Math.PI * 500) + 200 * isYLfo())

        note().y = Math.floor(t * 60 + 60)
        setNote(identity)

        setTimeout(lfoY, 50)
    }

    const toggleLfoZ = () => {
        if (isZLfo()) {
            setIsZLfo(0)
            return
        }
        setIsZLfo(Math.random())
        lfoZ()
    }

    const lfoZ = () => {
        if (!isZLfo()) {
            return
        }
        const t = Math.sin(Date.now() / (Math.PI * 500) + 200 * isZLfo())

        note().z = Math.floor(t * 60 + 60)
        setNote(identity)

        setTimeout(lfoZ, 50)
    }

    const toggleNote = () => {
        if (note().isActive) {
            note().noteOff()
            setNote(identity)
            setIsXLfo(0)
            setIsYLfo(0)
            setIsZLfo(0)
        } else {
            startNote()
        }
    }

    return <div class={classes.noteConfig}>
        Note: {note().note}<br/>
        Channel: {note().channel}<br/>
        X: {note().x.toFixed(2)}<br/>
        Y: {note().y}<br/>
        Z: {note().z}<br/>
        <button onClick={toggleNote}>{note().isActive ? '🟢 Stop Note' : '⚪️ Play Note'}</button><br/>
        <button onClick={toggleLfoX}>{isXLfo() ? '🟢 Stop LFO X' : '⚪️ Start LFO X'}</button>
        <button onClick={toggleLfoY}>{isYLfo() ? '🟢 Stop LFO Y' : '⚪️ Start LFO Y'}</button>
        <button onClick={toggleLfoZ}>{isZLfo() ? '🟢 Stop LFO Z' : '⚪️ Start LFO Z'}</button>
        </div>
}

export const OutputDashboard = ({ output }: Props) => {
    const mpeOutput = new MPEMidivalOutput(output, { lowerZoneSize: 7, upperZoneSize: 3 })

    const notes = [64, 68, 70]

    return <>
        <div class={classes.notesContainer}>
            <For each={notes}>{(v) => 
                <Note value={v} mpe={mpeOutput} />
            }</For>
        </div>
    </>
}