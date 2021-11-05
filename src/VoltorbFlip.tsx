import { useState } from "react"

import { GridState, VoltorbFlipGrid } from "./VoltorbFlipGrid"

interface VoltorbFlipProps {
    level: number
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

        let contents = <span>?</span>
        let className = "cell-button"

        let finished = grid.getState() !== GridState.Pending

        if (finished) {
            contents = <span>{cell.value}</span>
            className += " shown"

            if (cell.value === 0) {
                contents = <span>V</span>
                className += " voltorb"
            }
        }

        if (cell.flipped) {
            contents = <span>{cell.value}</span>
            className += " flipped"

            if (cell.value === 0) {
                contents = <span>V</span>
                className += " voltorb"
            }
        }

        return (
            <div className="flip-grid-cell">
                <button className={className} onClick={() => props.flipCell(row, col)}>
                    {contents}
                </button>
            </div>
        )
    }

    const renderRowStats = (grid: VoltorbFlipGrid, row: number) => {
        let showDead = showDeadZones && grid.rowIsDead(row)
        let deadText = showDead ? "dead" : ""

        return (
            <div className="stats">
                <div>{grid.getRowTotal(row)}, {grid.countVoltorbsInRow(row)}</div>
                <div>{deadText}</div>
            </div>
        )
    }

    const renderColStats = (grid: VoltorbFlipGrid, col: number) => {
        let showDead = showDeadZones && grid.colIsDead(col)
        let deadText = showDead ? "dead" : ""

        return (
            <div className="stats">
                <div>{grid.getColTotal(col)}, {grid.countVoltorbsInCol(col)}</div>
                <div>{deadText}</div>
            </div>
        )
    }

    const renderGridState = (grid: VoltorbFlipGrid) => (
        <div className="grid-state">
            <div>
                Level: {props.level}
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
