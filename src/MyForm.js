import React from "react";
import { Form, Field, FormSpy } from "react-final-form";
import {
  Dropdown,
  DropdownTarget,
  TextInput,
  TextInputIcon,
  DropdownSource,
  DropdownContext,
  DropdownMenu,
  DropdownMenuItem
} from "@brandwatch/axiom-components";
import RenderCount from "./RenderCount";
import AutoSaveStatus from "./AutoSaveStatus";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};
const required = value => (value ? undefined : "Required");

function Option({ children }) {
  return children;
}

function Select({
  children,
  onChange = () => {},
  timePeriod = "Day",
  timePeriods = [],
  label = "Dropdown Test",
  multiSelect = false
}) {
  return (
    <Dropdown flip="mirror" width="50px">
      <DropdownTarget>
        <TextInput
          label={label}
          isTarget
          readOnly
          inlineLabel
          value={timePeriod}
        >
          <TextInputIcon name="chevron-down" />
        </TextInput>
      </DropdownTarget>
      <DropdownSource>
        <DropdownContext width="100%">
          <DropdownMenu>
            {children.map(time => (
              <DropdownMenuItem
                key={time}
                onClick={() => onChange(time)}
                selected={timePeriod === time}
                paddingVertical="small"
                multiSelect={multiSelect}
              >
                {time}
              </DropdownMenuItem>
            ))}
          </DropdownMenu>
        </DropdownContext>
      </DropdownSource>
    </Dropdown>
  );
}

export default ({ subscription, onChange, initialValues, manualSave }) => (
  <Form
    onSubmit={onSubmit}
    subscription={subscription}
    initialValues={initialValues}
    render={({ handleSubmit, reset, submitting, pristine, values }) => (
      <form onSubmit={handleSubmit}>
        <RenderCount />
        <Field name="scheduleName" validate={required}>
          {({ input, meta }) => (
            <div>
              <RenderCount />
              <label>Schedule Name</label>
              <input {...input} placeholder="Schedule Name" />
              {meta.touched && meta.error && <span>{meta.error}</span>}
            </div>
          )}
        </Field>

        <Select id="my-select" label="Deliver every">
          options.map((o)=><Option>o</Option>)
        </Select>

        <div className="buttons">
          <button type="submit" disabled={submitting}>
            Submit
          </button>
          <button
            type="button"
            onClick={reset}
            disabled={submitting || pristine}
          >
            Reset
          </button>
        </div>
        <FormSpy
          subscription={{ values: true }}
          onChange={({ values }) => onChange(values)}
        />
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
        {values ? (
          <pre>{JSON.stringify(values, 0, 2)}</pre>
        ) : (
          <FormSpy subscription={{ values: true }}>
            {({ values }) => (
              <pre>
                <RenderCount key="count" />
                {JSON.stringify(values, 0, 2)}
              </pre>
            )}
          </FormSpy>
        )}
      </form>
    )}
  />
);
