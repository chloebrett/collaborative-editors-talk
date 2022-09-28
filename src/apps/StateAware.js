import { useState } from 'react';
import { capitaliseRandomLetter, deleteEverySecondLetter } from './helpers';

const StateAwareApp = () => {
    const [text, setText] = useState("lorem ipsum dolor sit amet");

    return (
        <div>
            <div>{text}</div>
            <button onClick={() => setText(prev => capitaliseRandomLetter(prev))}>
                Capitalise random letter
            </button>
            <button onClick={() => setText(prev => deleteEverySecondLetter(prev))}>
                Delete every second letter
            </button>
        </div>
    )
}

export default StateAwareApp;
