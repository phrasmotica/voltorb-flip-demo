import { useState } from "react"
import { Cell } from "./Cell"
import { Stats } from "./Stats"

import { GridState, VoltorbFlipGrid } from "./VoltorbFlipGrid"

interface VoltorbFlipProps {
    level: number
    streak: number
    score: number
    grid: VoltorbFlipGrid
    flipCell: (row: number, col: number) => void
    nextLevel: (grid: VoltorbFlipGrid) => void
    reset: () => void
}

export const VoltorbFlip = (props: VoltorbFlipProps) => {
    const [showDeadZones, setShowDeadCells] = useState(false)

    const renderGrid = (grid: VoltorbFlipGrid) => {
        return (
            <div>
                {range(grid.size()).map(i => (
                    <div className="flip-grid-row">
                        {range(grid.size()).map(j => renderCell(grid, i, j))}

                        {renderRowStats(grid, i)}
                    </div>
                ))}

                <div className="flip-grid-row">
                    {range(grid.size()).map(j => renderColStats(grid, j))}
                </div>
            </div>
        )
    }

    const renderCell = (grid: VoltorbFlipGrid, row: number, col: number) => {
        let cell = grid.getCell(row, col)
        let gridState = grid.getState()
        let showDead = !cell.flipped && showDeadZones && (grid.rowIsDead(row) || grid.colIsDead(col))

        const flipCell = () => props.flipCell(row, col)

        return <Cell cell={cell} gridState={gridState} showDead={showDead} flipCell={flipCell} />
    }

    const renderRowStats = (grid: VoltorbFlipGrid, row: number) => {
        let showDeadZone = showDeadZones && grid.rowIsDead(row)

        return <Stats cells={grid.getRow(row)} showDeadZone={showDeadZone} />
    }

    const renderColStats = (grid: VoltorbFlipGrid, col: number) => {
        let showDeadZone = showDeadZones && grid.colIsDead(col)

        return <Stats cells={grid.getCol(col)} showDeadZone={showDeadZone} />
    }

    const renderGridState = (grid: VoltorbFlipGrid) => (
        <div className="grid-state">
            <div>
                Level: {props.level}
            </div>

            <div>
                Streak: {props.streak}
            </div>

            <div>
                Coins: {props.score}
            </div>

            <div>
                Coins this round: {grid?.getScore() ?? 0}
            </div>
        </div>
    )

    const renderGridOptions = (grid: VoltorbFlipGrid) => {
        let state = grid?.getState()

        return (
            <div className="grid-options">
                <div>
                    <button disabled={state === GridState.Pending} onClick={() => props.nextLevel(grid)}>
                        Next Level
                    </button>
                </div>

                <div>
                    <button onClick={props.reset}>
                        Reset
                    </button>
                </div>

                <div>
                    <label>
                        <input type="checkbox" onChange={e => setShowDeadCells(e.target.checked)}>

                        </input>
                        Show dead zones
                    </label>
                </div>
            </div>
        )
    }

    return (
        <div>
            {renderGrid(props.grid)}
            {renderGridState(props.grid)}
            {renderGridOptions(props.grid)}
        </div>
    )
}

const range = (max: number) => Array.from(new Array(max), (_, i) => i)
