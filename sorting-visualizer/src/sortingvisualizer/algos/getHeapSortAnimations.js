export function getHeapSortAnimations(array) {
  const animations = [];
  heapSort(array, animations);
  return animations;
}

function heapSort(array, animations) {
  const n = array.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i, animations);
  }

  // Extract elements from the heap
  for (let i = n - 1; i > 0; i--) {
    // Swap the root (largest) with the last element
    animations.push(["swap", 0, i]);
    [array[0], array[i]] = [array[i], array[0]];

    // Heapify the reduced heap
    heapify(array, i, 0, animations);
  }
}

function heapify(array, n, i, animations) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  // Compare left child with root
  if (left < n) {
    animations.push(["compare", i, left]);
    animations.push(["revert", i, left]);
    if (array[left] > array[largest]) {
      largest = left;
    }
  }

  // Compare right child with root
  if (right < n) {
    animations.push(["compare", largest, right]);
    animations.push(["revert", largest, right]);
    if (array[right] > array[largest]) {
      largest = right;
    }
  }

  // If the largest is not the root, swap and heapify again
  if (largest !== i) {
    animations.push(["swap", i, largest]);
    [array[i], array[largest]] = [array[largest], array[i]];
    heapify(array, n, largest, animations);
  }
}
