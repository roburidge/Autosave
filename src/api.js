export const loadData = path => async () =>
  await new Promise((resolve, reject) => {
    setTimeout(
      () =>
        Math.random() > 0.2
          ? resolve({ scheduleName: "Schedule 1", interval: "day" })
          : reject(new Error("Failed to load data")),
      1000
    );
  });

export const saveData = path => async value =>
  await new Promise((resolve, reject) => {
    console.log(value);
    resolve();
  });

export const saveData2 = path => async value => {
  return await new Promise((resolve, reject) => {
    setTimeout(
      () => (Math.random() > 0 ? resolve(value) : reject(new Error("No Save"))),
      Math.random() * 1000
    );
  });
};
