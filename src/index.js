import React from "react";
import { render } from "react-dom";
import Autosave from "./Autosave";
import MyForm from "./MyForm";
import Styles from "./Styles";
import { loadData, saveData } from "./api";

const App = () => (
  <Styles>
    <Autosave
      onLoad={loadData("user/phil")}
      onSave={saveData("user/phil")}
      renderLoading={() => <h1>Loading...</h1>}
      renderError={e => <h1>Error: {e.message}</h1>}
      render={({ ...props }) => (
        <MyForm
          {...props}
          subscription={{
            submitting: true,
            pristine: true
          }}
        />
      )}
    />
  </Styles>
);

render(<App />, document.getElementById("root"));
