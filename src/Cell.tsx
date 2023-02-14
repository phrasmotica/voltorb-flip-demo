import { GridState, VoltorbFlipCell } from "./VoltorbFlipGrid"

interface CellProps {
    cell: VoltorbFlipCell
    gridState: GridState
    showDead: boolean
    flipCell: () => void
}

export const Cell = (props: CellProps) => {
    let cell = props.cell

    let parentClassName = "flip-grid-cell"

    let contents = <span>?</span>
    let className = "cell-button"

    if (props.showDead) {
        parentClassName += " dead"
    }

    let finished = props.gridState !== GridState.Pending

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
        <div className={parentClassName}>
            <button className={className} onClick={props.flipCell}>
                {contents}
            </button>
        </div>
    )
}
