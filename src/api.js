export const loadData = path => async () =>
  await new Promise((resolve, reject) => {
    setTimeout(
      () =>
        Math.random() > 0
          ? resolve({ firstName: "phil" })
          : reject(new Error("No Load")),
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
