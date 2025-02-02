export function getQuickSortAnimations(array) {
  const animations = [];
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function quickSortHelper(array, startIdx, endIdx, animations) {
  if (startIdx >= endIdx) return;

  const pivotIdx = partition(array, startIdx, endIdx, animations);
  quickSortHelper(array, startIdx, pivotIdx - 1, animations);
  quickSortHelper(array, pivotIdx + 1, endIdx, animations);
}

function partition(array, startIdx, endIdx, animations) {
  const pivotValue = array[endIdx];
  let pivotIdx = startIdx;

  for (let i = startIdx; i < endIdx; i++) {
    // Highlight the current comparison
    animations.push(["compare", i, endIdx]); // Compare with pivot
    animations.push(["revert", i, endIdx]); // Revert color after comparison

    if (array[i] <= pivotValue) {
      // Swap elements if condition is met
      animations.push(["swap", i, pivotIdx]);
      [array[i], array[pivotIdx]] = [array[pivotIdx], array[i]];
      pivotIdx++;
    }
  }

  // Swap pivot element to the correct position
  animations.push(["swap", pivotIdx, endIdx]);
  [array[pivotIdx], array[endIdx]] = [array[endIdx], array[pivotIdx]];

  return pivotIdx;
}
