export function getSelectionSortAnimations(array) {
  const animations = [];
  selectionSort(array, animations);
  return animations;
}

function selectionSort(array, animations) {
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    // Highlight the starting index as the current minimum
    animations.push(["min-select", minIdx]);

    for (let j = i + 1; j < n; j++) {
      // Compare elements
      animations.push(["compare", j, minIdx]);
      animations.push(["revert", j, minIdx]);

      if (array[j] < array[minIdx]) {
        minIdx = j;
        animations.push(["new-min", minIdx]); // Highlight the new min
      }
    }

    if (minIdx !== i) {
      // Swap elements
      animations.push(["swap", i, minIdx]);
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
    }
  }
}
