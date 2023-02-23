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

    let voltorbImage = process.env.PUBLIC_URL + "/voltorb.png"

    let finished = props.gridState !== GridState.Pending

    if (finished) {
        contents = <span>{cell.value}</span>
        className += " shown"

        if (cell.value === 0) {
            contents = <img src={voltorbImage} alt="voltorb" />
            className += " voltorb"
        }
    }
    else if (props.showDead) {
        parentClassName += " dead"
    }

    if (cell.flipped) {
        contents = <span>{cell.value}</span>
        className += " flipped"

        if (cell.value === 0) {
            contents = <img src={voltorbImage} alt="voltorb" />
            className += " voltorb"
        }
    }

    return (
        <div className={parentClassName}>
            <div className={className} onClick={props.flipCell}>
                {contents}
            </div>
        </div>
    )
}
