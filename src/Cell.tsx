import { PButton } from "./PButton"
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

    if (cell.flipped) {
        contents = <span>{cell.value}</span>
        className += " flipped"

        if (cell.value === 0) {
            contents = <img src={voltorbImage} alt="voltorb" />
        }
    }
    else if (finished) {
        contents = <span>{cell.value}</span>
        className += " shown"

        if (cell.value === 0) {
            contents = <img src={voltorbImage} alt="voltorb" />
        }
    }
    else if (props.showDead) {
        parentClassName += " dead"
    }

    return (
        <div className={parentClassName}>
            <PButton
                className={className}
                frozen={finished || cell.flipped}
                onClick={props.flipCell}>
                {contents}
            </PButton>
        </div>
    )
}
