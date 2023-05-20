import { IMIDIAccess, IMIDIInput, IMIDIOutput } from "@midival/core";
import { Signal, createEffect, createSignal } from "solid-js"
import { Accessor, SignalState } from "solid-js/types/reactive/signal";

interface Props {
    access: Accessor<IMIDIAccess>
    onSelect: (selected: IMIDIOutput) => void
}

export const MidivalOutputs = ({ access, onSelect }: Props) => {
    const [outputs, setOutputs] = createSignal<IMIDIOutput[]>([])
    let ref: HTMLSelectElement;
    createEffect(() => {
        const a = access()
        if (!a) {
            return
        }
        setOutputs(() => a.outputs)
    })

    const selectInput = () => {
        console.log(ref)
        onSelect(outputs().find(inp => inp.id === ref.value))
    }

    return <>
        <select ref={ref}>
            {outputs().map(input => <option value={input.id}>{input.name}</option>)}
        </select>
        <button onClick={selectInput}>Select</button>
    </>
}