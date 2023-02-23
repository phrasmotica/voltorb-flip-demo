import { useState } from "react"
import { Popup } from "semantic-ui-react"
import Checkbox from "semantic-ui-react/dist/commonjs/modules/Checkbox"

import { Cell } from "./Cell"
import { PButton } from "./PButton"
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
    const [showDeadCells, setShowDeadCells] = useState(false)

    const renderGrid = (grid: VoltorbFlipGrid) => {
        return (
            <div>
                {range(grid.size()).map(i => (
                    <div className="flip-grid-row">
                        {range(grid.size()).map(j => renderCell(grid, i, j))}

                        <Stats cells={grid.getRow(i)} />
                    </div>
                ))}

                <div className="flip-grid-row">
                    {range(grid.size()).map(j => <Stats cells={grid.getCol(j)} />)}
                </div>
            </div>
        )
    }

    const renderCell = (grid: VoltorbFlipGrid, row: number, col: number) => {
        let cell = grid.getCell(row, col)
        let gridState = grid.getState()
        let showDead = !cell.flipped && showDeadCells && (grid.rowIsDead(row) || grid.colIsDead(col))

        const flipCell = () => props.flipCell(row, col)

        return <Cell cell={cell} gridState={gridState} showDead={showDead} flipCell={flipCell} />
    }

    const renderGridState = (grid: VoltorbFlipGrid) => (
        <div className="grid-state">
            <div style={{ textAlign: "start" }}>
                <div>
                    Level: {props.level}
                </div>

                <div>
                    Streak: {props.streak}
                </div>
            </div>

            <div style={{ textAlign: "end" }}>
                <div>
                    Coins: {props.score}
                </div>

                <div>
                    Coins this round: {grid?.getScore() ?? 0}
                </div>
            </div>
        </div>
    )

    const renderGridOptions = (grid: VoltorbFlipGrid) => {
        let state = grid?.getState()

        return (
            <div className="grid-options">
                <Popup
                    content="Move to the next level!"
                    position="bottom left"
                    mouseEnterDelay={500}
                    disabled={state === GridState.Pending}
                    trigger={
                    <PButton
                        disabled={state === GridState.Pending}
                        onClick={() => props.nextLevel(grid)}>
                        Next Level
                    </PButton>
                } />

                <Popup
                    content="Start a new game from level 1."
                    position="bottom center"
                    mouseEnterDelay={500}
                    trigger={
                    <PButton
                        onClick={props.reset}>
                        Reset
                    </PButton>
                } />

                <Popup
                    content="Highlight cells that MUST contain either 1 coin or a Voltorb, based on current information."
                    position="bottom right"
                    mouseEnterDelay={500}
                    disabled={state !== GridState.Pending}
                    trigger={
                    <Checkbox
                        className="option-checkbox"
                        label="Show dead cells"
                        disabled={state !== GridState.Pending}
                        checked={showDeadCells}
                        onChange={(e, data) => setShowDeadCells(data.checked ?? false)} />
                } />
            </div>
        )
    }

    return (
        <div className="container">
            {renderGrid(props.grid)}
            {renderGridState(props.grid)}
            {renderGridOptions(props.grid)}
        </div>
    )
}

const range = (max: number) => Array.from(new Array(max), (_, i) => i)
