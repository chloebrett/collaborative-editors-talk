import { useState } from 'react';
import { capitaliseRandomLetter, deleteEverySecondLetter } from './helpers';

const UndoAwareBasicApp = () => {
    const [text, setText] = useState("lorem ipsum dolor sit amet");
    const [textHistory, setTextHistory] = useState({ stack: [text], index: 0 });

    const doAction = (newState) => {
        setText(newState);

        setTextHistory(prev => {
            const { stack, index } = prev;

            const newStack = stack.slice(0, index + 1).concat([newState]);

            return { stack: newStack, index: index + 1 };
        })
    }

    const doCapitalise = () => doAction(capitaliseRandomLetter(text));
    const doDelete = () => doAction(deleteEverySecondLetter(text));

    const undo = () => {
        const { stack, index } = textHistory;

        if (index > 0) {
            setText(stack[index - 1]);

            setTextHistory(prev => {
                return { ...prev, index: prev.index - 1 };
            });
        }
    }

    const redo = () => {
        const { stack, index } = textHistory;

        if (index < stack.length - 1) {
            setText(stack[index + 1]);

            setTextHistory(prev => {
                return { ...prev, index: prev.index + 1 };
            });
        }
    }

    return (
        <div>
            <div>Text: {text}</div>
            <div>
                <button onClick={doCapitalise}>Capitalise random letter</button>
                <button onClick={doDelete}>Delete every second letter</button>
            </div>
            <div>
                <button onClick={undo}>
                    Undo
                </button>
                <button onClick={redo}>
                    Redo
                </button>
            </div>
            <div>Undo stack:
                <pre>
                    {JSON.stringify(textHistory, null, 4)}
                </pre></div>
        </div >
    )
}

export default UndoAwareBasicApp;
