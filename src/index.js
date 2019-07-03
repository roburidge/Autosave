import React from "react";
import { render } from "react-dom";
import { useLoads } from "react-loads";
import Autosave from "./Autosave";
import MyForm from "./MyForm";
import Styles from "./Styles";
import { loadData, saveData } from "./api";

const App = () => {
  const { response, error, load, isRejected, isPending, isResolved } = useLoads(
    loadData("project-id")
  );
  return (
    <Styles>
      {isPending && <h1>Loading...</h1>}
      {isResolved && (
        <Autosave
          // onLoad={loadData("project-id")}
          onSave={saveData("project-id")} // convert to "useSave" hook?
        >
          {({ ...props }) => {
            console.log("props", props);
            return (
              <MyForm
                {...props}
                onChange={props.onChange} // useSave.onChange
                manualSave={props.manualSave} // useSave.manualSave
                initialValues={response} // from hook!!
                subscription={{
                  // from removed subscriptions file...
                  submitting: false, // was true, set to false to enable saving button
                  pristine: true
                }}
              />
            );
          }}
        </Autosave>
      )}
      {isRejected && <h1>Error: {error.message}</h1>}
    </Styles>
  );
};

render(<App />, document.getElementById("root"));
