import React, { useState, useEffect, useRef } from "react";
import { MPEInputZone } from "../../../../core/src/mpe/input/MPEInputZone"
import { ActiveNote } from "../../../../core/src/mpe/output/ActiveNote";
import { NoteMessage } from "@midival/core";

import "./style.css"

interface Props {
    zone: MPEInputZone
}

interface Message extends NoteMessage {

}

interface NoteEntryProps {
    note: Message
}

const NoteEntry = ({ note }: NoteEntryProps) => {
    return <div className="note">
            <div className="note-midi">Note: {note.note}</div>
            <div className="note-velocity">Velocity: {note.velocity}</div>
            <div className="note-channel">Channel: {note.channel}</div>
        </div>
}

export const ZoneVisualizer = ({ zone }: Props) => {

    const [ notes, setNotes] = useState<Message[]>([])
    const noteRef = useRef<Message[]>([])
    noteRef.current = notes

    useEffect(() => {
        const unregister = zone.onNoteOn(note => {
            setTimeout(() => {
                setNotes([...noteRef.current, note])
            })
        })
        const unregister2 = zone.onNoteOff(note => {
            setNotes(noteRef.current.filter(n => n.channel !== note.channel || n.note !== note.note))
        })

        return () => {
            unregister();
            unregister2();
        }

    }, [])

    return <div>
        {notes.map(n => (<NoteEntry note={n} />))}
    </div>
}