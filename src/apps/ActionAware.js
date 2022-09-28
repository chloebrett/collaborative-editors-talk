import { useReducer } from "react";
import { capitaliseRandomLetter, deleteEverySecondLetter } from "./helpers";

const textReducer = (state, action) => {
    if (action.type === 'capitalise') {
        return {
            text: capitaliseRandomLetter(state.text),
        };
    }

    if (action.type === 'delete') {
        return {
            text: deleteEverySecondLetter(state.text),
        };
    }

    return state;
  }
  

const ActionAwareApp = () => {
    const [state, dispatch] = useReducer(
        textReducer,
        { text: 'lorem ipsum dolor sit amet' }
    );

    const dispatchCapitalise = () => dispatch({ type: 'capitalise' });
    const dispatchDelete = () => dispatch({ type: 'delete' });

    return (
        <div>
            <div>{state.text}</div>
            <button onClick={dispatchCapitalise}>Capitalise random letter</button>
            <button onClick={dispatchDelete}>Delete every second letter</button>
        </div>
    )
}

export default ActionAwareApp;
