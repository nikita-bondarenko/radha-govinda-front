export const searchFilteringCondition = (itemName: string | undefined, searchInput: string) => {
  return (
    !!itemName?.toLowerCase().includes(searchInput.toLowerCase()) ||
    searchInput
      .toLowerCase()
      .split(" ")
      .every((word) => itemName?.toLowerCase().includes(word))
  );
};