export function getInsertionSortAnimations(array) {
  const animations = [];
  insertionSort(array, animations);
  return animations;
}

function insertionSort(array, animations) {
  const n = array.length;
  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;

    // Highlight the current element being inserted
    animations.push(["select-key", i]);

    while (j >= 0 && array[j] > key) {
      // Highlight comparison
      animations.push(["compare", j, j + 1]);

      // Shift the larger element one step to the right
      animations.push(["shift", j, j + 1, array[j]]);

      array[j + 1] = array[j];
      j--;
    }

    // Insert the key at the correct position
    animations.push(["insert", j + 1, key]);
    array[j + 1] = key;
  }
}
