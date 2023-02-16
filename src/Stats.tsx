import { VoltorbFlipCell } from "./VoltorbFlipGrid"

interface StatsProps {
    cells: VoltorbFlipCell[]
}

export const Stats = (props: StatsProps) => {
    let total = props.cells.map(a => a.value).reduce((a, b) => a + b)
    let voltorbCount = props.cells.filter(a => a.value === 0).length

    return (
        <div className="flip-grid-cell">
            <div className="stats">
                <div>{total}, {voltorbCount}</div>
            </div>
        </div>
    )
}
