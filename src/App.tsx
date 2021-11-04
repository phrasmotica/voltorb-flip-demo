import { useState } from "react"

import { VoltorbFlip } from "./VoltorbFlip"
import { VoltorbFlipGrid } from "./VoltorbFlipGrid"

import "./App.css"

const newGrid = (level: number) => VoltorbFlipGrid.create(level)

const App = () => {
    const [level, setLevel] = useState(0)
    const [grid, setGrid] = useState(newGrid(level))

    const flipCell = (row: number, col: number) => {
        grid.getCell(row, col).flip()
        setGrid(new VoltorbFlipGrid(grid.grid))
    }

    const nextLevel = () => {
        let newLevel = Math.min(7, level + 1)
        setLevel(newLevel)
        setGrid(newGrid(newLevel))
    }

    const reset = () => {
        setLevel(0)
        setGrid(newGrid(0))
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
