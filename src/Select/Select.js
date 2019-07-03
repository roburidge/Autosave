import React from "react";
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

function Option({ children }) {
  return children;
}

function Select({
  children,
  onChange = () => {},
  selectedValue = "",
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
          value={selectedValue}
        >
          <TextInputIcon name="chevron-down" />
        </TextInput>
      </DropdownTarget>
      <DropdownSource>
        <DropdownContext width="100%">
          <DropdownMenu>
            {children.map(child => (
              <DropdownMenuItem
                key={child.props.value}
                onClick={() => onChange(child.props.value)}
                selected={child.props.selected}
                paddingVertical="small"
                multiSelect={multiSelect}
              >
                {child}
              </DropdownMenuItem>
            ))}
          </DropdownMenu>
        </DropdownContext>
      </DropdownSource>
    </Dropdown>
  );
}

export default Select;
export { Option };
