import { IMIDIInput, MIDIValInput, NoteMessage } from "@midival/core"
import { For, createSignal } from "solid-js"
import * as classes from './style.module.css';

interface Props {
    input: IMIDIInput
}
export const InputDashboard = ({ input }: Props) => {
    const [notes, setNotes] = createSignal<NoteMessage[]>([])
    const midiIn = new MIDIValInput(input);
    midiIn.onAllNoteOn(note => {
        setNotes(current => [...current, note])
    })

    midiIn.onAllNoteOff(note => {
        setNotes(current => current.filter(n => n.note !== note.note))
    })

    return <><h1>Dashboard {input.name}</h1>
    <div class={classes.notesContainer}>
        <For each={notes()}>{(note) => 
            <div class={classes.note}>
                <div>Note:{note.note}</div>
                <div>Velocity: {note.velocity}</div>
                <div>Channel: {note.channel}</div>
            </div>
        }</For>
    
    </div></>
}