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

    const renderRowStats = (grid: VoltorbFlipGrid, row: number) => (
        <div className="stats">
            {grid.getRowTotal(row)}, {grid.countVoltorbsInRow(row)}
        </div>
    )

    const renderColStats = (grid: VoltorbFlipGrid, col: number) => (
        <div className="stats">
            {grid.getColTotal(col)}, {grid.countVoltorbsInCol(col)}
        </div>
    )

    const renderGridState = (grid: VoltorbFlipGrid) => {
        let state = grid?.getState()

        let coinCount = `Coins: ${props.score + (grid?.getScore() ?? 0)}`
        let levelText = `Level: ${props.level}`

        return (
            <div className="grid-state">
                <div>
                    {levelText}
                </div>

                <div>
                    {coinCount}
                </div>

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
