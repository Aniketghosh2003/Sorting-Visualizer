import "./Sv.css";
import React from "react";
import { getMergeSortAnimations } from "./algos/getMergeSortAnimations.js";
import { getQuickSortAnimations } from "./algos/getQuickSortAnimations.js";
import { getHeapSortAnimations } from "./algos/getHeapSortAnimations.js";
import { getBubbleSortAnimations } from "./algos/getBubbleSortAnimations.js";
import { getSelectionSortAnimations } from "./algos/getSelectionSortAnimations.js";
import { getInsertionSortAnimations } from "./algos/getInsertionSortAnimations.js";

const MIN_ARRAY_SIZE = 10;
const MAX_ARRAY_SIZE = 100;
const MIN_VALUE = 5;
const MAX_VALUE = 500;
const MIN_SPEED = 1; // 1ms
const MAX_SPEED = 10; // 10ms

const COLORS = {
  default: "turquoise",
  comparing: "red",
};

export default class SortingVisualizer extends React.Component {
  state = {
    array: [],
    arraySize: MAX_ARRAY_SIZE,
    animationSpeed: 1, // Default to 1 = 5ms
  };

  componentDidMount() {
    this.resetArray();
  }

  resetArray = () => {
    const array = Array.from({ length: this.state.arraySize }, () =>
      Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1) + MIN_VALUE)
    );
    this.setState({ array });
  };

  handleArraySizeChange = (event) => {
    this.setState({ arraySize: Number(event.target.value) }, this.resetArray);
  };

  handleSpeedChange = (event) => {
    this.setState({ animationSpeed: Number(event.target.value) });
  };

  getArrayBars = () => {
    return document.getElementsByClassName("array-bar") || [];
  };

  mergeSort = () => {
    const animations = getMergeSortAnimations(this.state.array);
    const arrayBars = this.getArrayBars();
    const speed = 5*this.state.animationSpeed; 

    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const color = i % 3 === 0 ? COLORS.comparing : COLORS.default;
        setTimeout(() => {
          if (arrayBars[barOneIdx] && arrayBars[barTwoIdx]) {
            arrayBars[barOneIdx].style.backgroundColor = color;
            arrayBars[barTwoIdx].style.backgroundColor = color;
          }
        }, i * speed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          if (arrayBars[barOneIdx]) {
            arrayBars[barOneIdx].style.height = `${newHeight}px`;
          }
        }, i * speed);
      }
    }
  };

  handleBasicSort = (getAnimations, sortName) => {
    const animations = getAnimations(this.state.array);
    const arrayBars = this.getArrayBars();
    const speed = 5* this.state.animationSpeed; 

    for (let i = 0; i < animations.length; i++) {
      const [type, barOneIdx, barTwoIdx] = animations[i];

      setTimeout(() => {
        if (!arrayBars[barOneIdx] || !arrayBars[barTwoIdx]) return;

        if (type === "compare") {
          arrayBars[barOneIdx].style.backgroundColor = COLORS.comparing;
          arrayBars[barTwoIdx].style.backgroundColor = COLORS.comparing;
        } else if (type === "revert") {
          arrayBars[barOneIdx].style.backgroundColor = COLORS.default;
          arrayBars[barTwoIdx].style.backgroundColor = COLORS.default;
        } else if (type === "swap") {
          const tempHeight = arrayBars[barOneIdx].style.height;
          arrayBars[barOneIdx].style.height = arrayBars[barTwoIdx].style.height;
          arrayBars[barTwoIdx].style.height = tempHeight;
        }
      }, i * speed);
    }
  };

  insertionSort = () => {
    const animations = getInsertionSortAnimations(this.state.array);
    const arrayBars = this.getArrayBars();
    const speed = 5*this.state.animationSpeed; 

    for (let i = 0; i < animations.length; i++) {
      const [type, barOneIdx, barTwoIdx, newValue] = animations[i];

      setTimeout(() => {
        if (!arrayBars[barOneIdx]) {
          console.warn(`Skipping invalid bar index: ${barOneIdx}`);
          return;
        }

        if (type === "compare" && arrayBars[barTwoIdx]) {
          arrayBars[barOneIdx].style.backgroundColor = COLORS.comparing;
          arrayBars[barTwoIdx].style.backgroundColor = COLORS.comparing;

          setTimeout(() => {
            arrayBars[barOneIdx].style.backgroundColor = COLORS.default;
            arrayBars[barTwoIdx].style.backgroundColor = COLORS.default;
          }, speed);
        } else if (type === "shift") {
          const targetIdx = barTwoIdx !== undefined ? barTwoIdx : barOneIdx;
          if (arrayBars[targetIdx]) {
            arrayBars[targetIdx].style.height = `${newValue}px`;
          }
        } else if (type === "insert") {
          if (arrayBars[barOneIdx]) {
            arrayBars[barOneIdx].style.height = `${newValue}px`;
          }
        }
      }, i * speed);
    }
  };

  render() {
    const { array } = this.state;
    const sortButtons = [
      { name: "Merge Sort", handler: this.mergeSort },
      {
        name: "Quick Sort",
        handler: () => this.handleBasicSort(getQuickSortAnimations, "quick"),
      },
      {
        name: "Heap Sort",
        handler: () => this.handleBasicSort(getHeapSortAnimations, "heap"),
      },
      {
        name: "Bubble Sort",
        handler: () => this.handleBasicSort(getBubbleSortAnimations, "bubble"),
      },
      {
        name: "Selection Sort",
        handler: () =>
          this.handleBasicSort(getSelectionSortAnimations, "selection"),
      },
      { name: "Insertion Sort", handler: this.insertionSort },
    ];

    return (
      <div className="main-container">
        <div className="visualizer-section">
          <div className="array-container">
            {array.map((value, idx) => (
              <div
                className="array-bar"
                key={idx}
                style={{
                  height: `${value}px`,
                  backgroundColor: COLORS.default,
                }}
              />
            ))}
          </div>
        </div>
        <div className="controls-section">
          <div className="controls-left">
            <button className="Generate" onClick={this.resetArray}>
              Generate New Array !
            </button>
            <div className="sliders-container">
              <div className="slider-wrapper">
                <span className="slider-label">
                  Size: {this.state.arraySize}
                </span>
                <div className="range-container">
                  <input
                    type="range"
                    min={MIN_ARRAY_SIZE}
                    max={MAX_ARRAY_SIZE}
                    value={this.state.arraySize}
                    onChange={this.handleArraySizeChange}
                    className="slider"
                  />
                  <div
                    className="range-fill"
                    style={{
                      width: `${
                        ((this.state.arraySize - MIN_ARRAY_SIZE) /
                          (MAX_ARRAY_SIZE - MIN_ARRAY_SIZE)) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="slider-wrapper">
                <span className="slider-label">
                  Speed: {this.state.animationSpeed}
                </span>
                <div className="range-container">
                  <input
                    type="range"
                    min={MIN_SPEED}
                    max={MAX_SPEED}
                    value={this.state.animationSpeed}
                    onChange={this.handleSpeedChange}
                    className="slider"
                  />
                  <div
                    className="range-fill"
                    style={{
                      width: `${
                        ((this.state.animationSpeed - MIN_SPEED) /
                          (MAX_SPEED - MIN_SPEED)) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="controls-content">
            <div className="sorting-buttons">
              {sortButtons.map((button) => (
                <button key={button.name} onClick={button.handler}>
                  {button.name}
                </button>
              ))}
            </div>
            <div className="name">
              <h1>Sorting Visualizer</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
