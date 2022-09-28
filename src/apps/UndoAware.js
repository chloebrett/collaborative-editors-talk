import { useReducer } from "react";
import { getRandomIndex, capitaliseLetterAtIndex, deleteEverySecondLetter, lowercaseLetterAtIndex, restoreDeletedLetters } from "./helpers";

const dispatchOp = (textDispatch, historyDispatch, op) => {
    historyDispatch({ type: 'push', payload: op });
    textDispatch(op.do);
}

const dispatchCapitalise = (textState, textDispatch, historyDispatch) => {
    const randomIndex = getRandomIndex(textState.text);

    dispatchOp(textDispatch, historyDispatch, {
        do: { type: 'capitalise', payload: { index: randomIndex } },
        undo: { type: 'undo_capitalise', payload: { index: randomIndex } },
    });
}

const dispatchDelete = (textState, textDispatch, historyDispatch) => {
    const deletedLetters = deleteEverySecondLetter(textState.text.substring(1));

    dispatchOp(textDispatch, historyDispatch, {
        do: { type: 'delete', },
        undo: { type: 'undo_delete', payload: { deletedLetters, } },
    });
}

const dispatchUndo = (historyState, historyDispatch, textDispatch) => {
    const { opStack, index } = historyState;

    if (index > 0) {
        textDispatch(opStack[index - 1].undo);
        historyDispatch({ type: 'undo' });
    }
}

const dispatchRedo = (historyState, historyDispatch, textDispatch) => {
    const { opStack, index } = historyState;

    if (index < opStack.length) {
        textDispatch(opStack[index].do);
        historyDispatch({ type: 'redo' });
    }
}

const textReducer = (state, action) => {
    if (action.type === 'capitalise') {
        return {
            text: capitaliseLetterAtIndex(state.text, action.payload.index),
        };
    }

    if (action.type === 'undo_capitalise') {
        return {
            text: lowercaseLetterAtIndex(state.text, action.payload.index),
        };
    }

    if (action.type === 'delete') {
        return {
            text: deleteEverySecondLetter(state.text),
        };
    }

    if (action.type === 'undo_delete') {
        return {
            text: restoreDeletedLetters(state.text, action.payload.deletedLetters),
        };
    }

    return state;
}

const historyReducer = (state, action) => {
    if (action.type === 'push') {
        const { opStack, index } = state;

        const newOpStack = opStack.slice(0, index).concat([action.payload]);

        return {
            opStack: newOpStack,
            index: newOpStack.length,
        };
    }

    if (action.type === 'undo') {
        return {
            opStack: state.opStack,
            index: Math.max(state.index - 1, 0),
        };
    }

    if (action.type === 'redo') {
        return {
            opStack: state.opStack,
            index: Math.min(state.index + 1, state.opStack.length),
        };
    }

    return state;
}

const UndoAwareApp = () => {
    const [textState, textDispatch] = useReducer(
        textReducer,
        { text: 'lorem ipsum dolor sit amet' },
    );

    const [historyState, historyDispatch] = useReducer(
        historyReducer,
        { opStack: [], index: 0, },
    );

    const doCapitalise = () => dispatchCapitalise(textState, textDispatch, historyDispatch);
    const doDelete = () => dispatchDelete(textState, textDispatch, historyDispatch);

    const undo = () => dispatchUndo(historyState, historyDispatch, textDispatch);
    const redo = () => dispatchRedo(historyState, historyDispatch, textDispatch);

    return (
        <div>
            <div>Text: {textState.text}</div>
            <div>
                <button onClick={doCapitalise}>
                    Capitalise random letter
                </button>
                <button onClick={doDelete}>
                    Delete every second letter
                </button>
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
                    {JSON.stringify(historyState, null, 4)}
                </pre></div>
        </div >
    )
}

export default UndoAwareApp;
