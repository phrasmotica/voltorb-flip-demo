import { useEffect, useState } from "react"
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
    const [hintCoords, setHintCoords] = useState<[number, number][]>([])
    const [showDeadCells, setShowDeadCells] = useState(false)

    useEffect(() => {
        if (props.grid.getState() !== GridState.Pending) {
            setHintCoords([])
        }
    }, [props.grid])

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
        let showHighlighted = hintCoords.some(c => c[0] === row && c[1] === col)
        let showDead = !cell.flipped && showDeadCells && (grid.rowIsDead(row) || grid.colIsDead(col))

        const flipCell = () => props.flipCell(row, col)

        return <Cell
            cell={cell}
            gridState={gridState}
            showHighlighted={showHighlighted}
            showDead={showDead}
            flipCell={flipCell} />
    }

    const renderGridState = (grid: VoltorbFlipGrid) => (
        <div className="grid-state">
            <div>
                <div>
                    Level: {props.level}
                </div>

                <div>
                    Streak: {props.streak}
                </div>
            </div>

            <div>
                <div>
                    Total coins: {props.score}
                </div>

                <div>
                    Coins this round: {getCoinsThisRoundStr(grid)}
                </div>
            </div>
        </div>
    )

    const getCoinsThisRoundStr = (grid: VoltorbFlipGrid) => {
        let flippedMultipliers = grid.getFlippedMultipliers().filter(c => c.value > 1)

        if (flippedMultipliers.length === 0) {
            return "0"
        }

        if (flippedMultipliers.length === 1) {
            return `${flippedMultipliers[0].value}`
        }

        let calc = flippedMultipliers.map(c => c.value).join(" x ")
        return calc + " = " + grid.getScore()
    }

    const renderGridOptions = (grid: VoltorbFlipGrid) => {
        let state = grid?.getState()

        return (
            <div className="grid-options">
                <Popup
                    content="Move to the next level!"
                    position="top left"
                    mouseEnterDelay={500}
                    disabled={state === GridState.Pending}
                    trigger={
                        <PButton
                            disabled={state === GridState.Pending}
                            onClick={() => nextLevel(grid)}>
                            Next Level
                        </PButton>
                    } />

                <PButton onClick={reset}>
                    Reset
                </PButton>

                <Popup
                    content="Recommends a tile to flip."
                    position="top center"
                    mouseEnterDelay={500}
                    disabled={state !== GridState.Pending}
                    trigger={
                        <PButton
                            disabled={state !== GridState.Pending || hintCoords.length > 0}
                            onClick={() => showHints(grid)}>
                            Show Hint
                        </PButton>
                    } />

                <Popup
                    content="Highlight cells that MUST contain either 1 coin or a Voltorb, based on current information."
                    position="top right"
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

    const nextLevel = (grid: VoltorbFlipGrid) => {
        setHintCoords([])
        props.nextLevel(grid)
    }

    const reset = () => {
        setHintCoords([])
        props.reset()
    }

    const showHints = (grid: VoltorbFlipGrid) => {
        let hintCoords = grid.computeHints()
        setHintCoords(hintCoords)
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
