export function sortArrayByKey(array, key) {
  const newArray = [...array];
  return newArray.sort((a, b) => {
    const aValue = a[key].toLowerCase();
    const bValue = b[key].toLowerCase();
    return aValue > bValue ? 1 : -1;
  });
}

export function dedupeArrayByKey(array, key) {
  const dedupedIds = Array.from(new Set(array.map((item) => item[key])));
  return dedupedIds.map((id) => {
    const found = array.find((item) => {
      return item[key] === id;
    });
    return found;
  });
}
