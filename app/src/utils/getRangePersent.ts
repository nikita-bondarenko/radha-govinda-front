export  function getRangePercent(element: HTMLInputElement) {
    const percent =
      ((Number(element.value) - Number(element.min)) /
        (Number(element.max) - Number(element.min))) *
      100;
    return percent;
  }