import ActionAwareApp from "./apps/ActionAware";
import StateAwareApp from "./apps/StateAware";
import UndoAwareBasicApp from "./apps/UndoAwareBasic";
import UndoAwareApp from "./apps/UndoAware";

const App = () => {
  return <div>
    <h1>State Aware</h1>
    <StateAwareApp />
    <h1>Action Aware</h1>
    <ActionAwareApp />
    <h1>Undo Aware Basic</h1>
    <UndoAwareBasicApp />
    <h1>Undo Aware</h1>
    <UndoAwareApp />
  </div>
}

export default App;
