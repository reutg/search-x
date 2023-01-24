export const getStorage = (): { [key: string]: boolean } => {
  const storage = localStorage.getItem("history");
  return storage && JSON.parse(storage);
};

export const saveToStorage = (value: string) => {
  if (!value.length) {
    return;
  }
  const currentStorage = getStorage();
  const data = { ...currentStorage, [value.toLowerCase()]: true };
  localStorage.setItem("history", JSON.stringify(data));
};

export const removeFromStorage = (item: string) => {
  const currentStorage = getStorage();
  delete currentStorage[item.toLowerCase()];
  localStorage.setItem("history", JSON.stringify(currentStorage));
};
