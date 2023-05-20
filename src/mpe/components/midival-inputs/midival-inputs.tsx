import { IMIDIAccess, IMIDIInput } from "@midival/core";
import { Signal, createEffect, createSignal } from "solid-js"
import { Accessor, SignalState } from "solid-js/types/reactive/signal";

interface Props {
    access: Accessor<IMIDIAccess>
    onSelect: (selected: IMIDIInput) => void
}

export const MidivalInputs = ({ access, onSelect }: Props) => {
    const [inputs, setInputs] = createSignal<IMIDIInput[]>([])
    let ref: HTMLSelectElement;
    createEffect(() => {
        const a = access()
        if (!a) {
            return
        }
        setInputs(() => a.inputs)
    })

    const selectInput = () => {
        console.log(ref)
        onSelect(inputs().find(inp => inp.id === ref.value))
    }

    return <>
        <select ref={ref}>
            {inputs().map(input => <option value={input.id}>{input.name}</option>)}
        </select>
        <button onClick={selectInput}>Select</button>
    </>
}