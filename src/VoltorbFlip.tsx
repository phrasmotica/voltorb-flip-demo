import React from "react"

import { GridState, VoltorbFlipGrid } from "./VoltorbFlipGrid"

interface VoltorbFlipProps {
    grid: VoltorbFlipGrid
    flipCell: (row: number, col: number) => void
}

export const VoltorbFlip = (props: VoltorbFlipProps) => {
    const renderGrid = (grid: VoltorbFlipGrid) => {
        return (
            <div>
                {range(grid.size()).map(i => (
                    <div className="flip-grid-row">
                        {range(grid.size()).map(j => renderCell(i, j))}

                        {renderRowStats(i)}
                    </div>
                ))}

                <div className="flip-grid-row">
                    {range(grid.size()).map(j => renderColStats(j))}
                </div>
            </div>
        )
    }

    const renderCell = (row: number, col: number) => {
        let cell = props.grid.getCell(row, col)

        return (
            <div className="flip-grid-cell">
                <button onClick={() => props.flipCell(row, col)}>
                    {cell.flipped ? (cell.value === 0 ? "V" : cell.value) : "?"}
                </button>
            </div>
        )
    }

    const renderRowStats = (row: number) => (
        <div className="stats">
            {props.grid.getRowTotal(row)}, {props.grid.countVoltorbsInRow(row)}
        </div>
    )

    const renderColStats = (col: number) => (
        <div className="stats">
            {props.grid.getColTotal(col)}, {props.grid.countVoltorbsInCol(col)}
        </div>
    )

    const renderGridState = (grid: VoltorbFlipGrid) => {
        let text = "Pending..."
        switch (grid?.getState()) {
            case GridState.Won:
                text = "Won!"
                break;

            case GridState.Lost:
                text = "Lost."
                break;
        }

        return (
            <div>
                {text}
            </div>
        )
    }

    return (
        <div>
            {renderGrid(props.grid)}
            {renderGridState(props.grid)}
        </div>
    )
}

const range = (max: number) => Array.from(new Array(max), (_, i) => i)
