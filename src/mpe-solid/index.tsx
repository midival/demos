import { render } from 'solid-js/web';
import { MidivalInputs } from './components/midival-inputs/midival-inputs';
import { Show, createSignal } from 'solid-js';
import { IMIDIAccess, IMIDIInput, IMIDIOutput, MIDIVal, MIDIValOutput } from '@midival/core';
import { InputDashboard } from './components/inputDashboard/input-dashboard';
import { MidivalOutputs } from './components/midival-outputs/midival-outputs';
import { OutputDashboard } from './components/outputDashboard/outputDashboard';
import "./style.module.css"

function HelloWorld() {
    const [access, setAccess] = createSignal<IMIDIAccess>()
    const [input, setInput] = createSignal<IMIDIInput>()
    const [output, setOutput] = createSignal<IMIDIOutput>()

    MIDIVal.connect()
    .then(a => setAccess(() => a))

    const inputSelected = (input: IMIDIInput) => {
        setInput(() => input)
    }

    const outputSelected = (output: IMIDIOutput) => {
        setOutput(() => output)
    }
        
    return <div>
        <Show when={access() && !input() && !output()}>
            <div>Connect to following inputs to see MPE messages being sent:</div>
            <MidivalInputs access={access} onSelect={inputSelected} />

            <div>Connect to following outputs to start sending MPE messages:</div>
            <MidivalOutputs access={access} onSelect={outputSelected} />
        </Show>
        <Show when={input()}>
            <InputDashboard input={input()} />
        </Show>
        <Show when={output()}>
            <OutputDashboard output={output()} />
        </Show>
        </div>;
    }

render(() => <HelloWorld />, document.getElementById('app'))
