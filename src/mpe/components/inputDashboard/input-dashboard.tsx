import { IMIDIInput, MIDIValInput, NoteMessage } from "@midival/core"
import { MPEMidivalInput } from "@midival/core/dist/mpe"
import { For, createSignal } from "solid-js"
import * as classes from './style.module.css';

interface Props {
    input: IMIDIInput
}

type Note = NoteMessage & {
    x: number,
    y: number,
    z: number
}

export const InputDashboard = ({ input }: Props) => {
    const [notes, setNotes] = createSignal<Note[]>([], { equals: false })
    const midiIn = new MPEMidivalInput(new MIDIValInput(input));

    console.log("MIDI IN????")

    midiIn.onLowerZoneUpdate(lowerZone => {
        console.log("ON LOWER ZONE???", lowerZone)
        lowerZone.onNoteOn(note => {
            setNotes(current => [...current, {
                ...note,
                x: 0,
                y: 0,
                z: 0
            }])
        })

        lowerZone.onNoteOff(note => {
            setNotes(current => current.filter(n => n.note !== note.note))
        })

        lowerZone.onMemberPitchBend(bend => {
            setNotes(c => c.map(n => n.channel === bend.channel ? {...n, x: bend.memberPitchBend } : n))
        })

        lowerZone.onMemberTimbre(tim => {
            setNotes(c => c.map(n => n.channel === tim.channel ? { ...n, y: tim.memberTimbre } : n))
        })

        lowerZone.onMemberPressure(pres => {
            console.log(pres)
            setNotes(c => c.map(n => n.channel === pres.channel ? { ...n, z: pres.memberPressure} : n))
        })
    })

    // midiIn.onAllNoteOn(note => {
    //     setNotes(current => [...current, note])
    // })

    // midiIn.onAllNoteOff(note => {
    //     setNotes(current => current.filter(n => n.note !== note.note))
    // })

    return <><h1>Dashboard {input.name}</h1>
    <div class={classes.notesContainer}>
        <For each={notes()}>{(note) => 
            <div class={classes.note}>
                <div>Note:{note.note}</div>
                <div>Velocity: {note.velocity}</div>
                <div>Channel: {note.channel}</div>
                <div>X: {note.x}</div>
                <div>Y: {note.y}</div>
                <div>Z: {note.z}</div>
            </div>
        }</For>
    
    </div></>
}