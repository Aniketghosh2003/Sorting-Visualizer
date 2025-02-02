export function getBubbleSortAnimations(array) {
  const animations = [];
  bubbleSort(array, animations);
  return animations;
}

function bubbleSort(array, animations) {
  const n = array.length;
  let swapped;

  for (let i = 0; i < n - 1; i++) {
    swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      animations.push(["compare", j, j + 1]);
      animations.push(["revert", j, j + 1]);

      if (array[j] > array[j + 1]) {
        // Swap elements
        animations.push(["swap", j, j + 1]);
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;
      }
    }
    // If no elements were swapped, break the loop (optimization)
    if (!swapped) break;
  }
}
