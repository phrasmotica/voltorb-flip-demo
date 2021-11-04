import { useState } from "react"

import { VoltorbFlip } from "./VoltorbFlip"
import { VoltorbFlipGrid } from "./VoltorbFlipGrid"

import "./App.css"

const newGrid = () => VoltorbFlipGrid.create()

const App = () => {
    const [grid, setGrid] = useState(newGrid())

    const flipCell = (row: number, col: number) => {
        grid.getCell(row, col).flip()
        setGrid(new VoltorbFlipGrid(grid.grid))
    }

    return (
        <div className="App">
            <header className="App-header">
                <VoltorbFlip grid={grid} flipCell={flipCell} />
            </header>
        </div>
    )
}

export default App
