import React, { useState } from "react";

function useAutoSave(initialValue) {
  const [toggleValue, setToggleValue] = useState(initialValue);
  const toggler = () => setToggleValue(!toggleValue);

  return [toggleValue, toggler];
}

export default useAutoSave;
