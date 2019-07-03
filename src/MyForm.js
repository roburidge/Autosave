import React, { useState, useEffect } from "react";
import { TextInput } from "@brandwatch/axiom-components";
import Select, { Option } from "./Select/Select";
import AutoSaveStatus from "./AutoSaveStatus";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = event => {
  event.preventDefault();
  return async values => {
    await sleep(300);
    window.alert(JSON.stringify(values, 0, 2));
  };
};

function MyForm({
  subscription,
  onChange,
  manualSave,
  initialValues,
  options = new Map([["day", "Day"], ["week", "Week"], ["month", "Month"]])
}) {
  const [scheduleName, setScheduleName] = useState(initialValues.scheduleName);
  const [interval, setInterval] = useState(initialValues.interval);
  const { submitting } = subscription;

  const handleScheduleNameChange = event => {
    setScheduleName(event.target.value);
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    const values = { scheduleName, interval };
    onChange(values);
  });

  return (
    <form onSubmit={onSubmit}>
      <TextInput
        inlineLabel
        label="Schedule Name"
        value={scheduleName}
        name="name"
        onChange={handleScheduleNameChange}
      />

      <Select
        id="my-select"
        label="Deliver every"
        selectedValue={options.get(interval)}
        onChange={setInterval}
      >
        {Array.from(options).map(([key, value]) => (
          <Option value={key} selected={interval === key} key={key}>
            {value}
          </Option>
        ))}
      </Select>

      <div className="buttons">
        <button type="submit" disabled={submitting}>
          Submit
        </button>
        <button
          type="button"
          onClick={() => {
            console.log("reset");
          }}
          disabled={submitting}
        >
          Reset
        </button>
      </div>
      <AutoSaveStatus
        render={({ saved, sinceSave }) => (
          <div>
            <span
              style={{
                color: "black",
                fontWeight: "bold",
                opacity: saved ? 1 : 0.25
              }}
            >
              Saved
            </span>
            {` (${sinceSave} sec ago)`}
          </div>
        )}
      />
      <button type="button" onClick={manualSave}>
        Force Save
      </button>
      <pre>
        scheduleName: {scheduleName}
        <br />
        interval: {interval}
      </pre>
    </form>
  );
}

export default MyForm;
