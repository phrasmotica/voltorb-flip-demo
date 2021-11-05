import { useState } from "react"

import { VoltorbFlip } from "./VoltorbFlip"
import { GridState, VoltorbFlipGrid } from "./VoltorbFlipGrid"

import "./App.css"

const newGrid = (level: number) => VoltorbFlipGrid.create(level)

const App = () => {
    const [level, setLevel] = useState(1)
    const [grid, setGrid] = useState(newGrid(level))

    const flipCell = (row: number, col: number) => {
        grid.getCell(row, col).flip()
        setGrid(new VoltorbFlipGrid(grid.grid))
    }

    // https://bulbapedia.bulbagarden.net/wiki/Voltorb_Flip
    const nextLevel = (grid: VoltorbFlipGrid) => {
        let newLevel = level

        let state = grid.getState()
        if (state === GridState.Won) {
            newLevel = Math.min(8, level + 1)
        }

        if (state === GridState.Lost) {
            let numFlippedMultipliers = grid.getNumberOfFlippedMultipliers()
            if (numFlippedMultipliers < level) {
                newLevel = Math.max(1, Math.min(8, level, numFlippedMultipliers))
            }
        }

        setLevel(newLevel)
        setGrid(newGrid(newLevel))
    }

    const reset = () => {
        setLevel(1)
        setGrid(newGrid(1))
    }

    return (
        <div className="App">
            <header className="App-header">
                <VoltorbFlip
                    level={level}
                    grid={grid}
                    flipCell={flipCell}
                    nextLevel={nextLevel}
                    reset={reset} />
            </header>
        </div>
    )
}

export default App
