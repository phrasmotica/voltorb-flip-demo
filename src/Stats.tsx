import { VoltorbFlipCell } from "./VoltorbFlipGrid"

interface StatsProps {
    cells: VoltorbFlipCell[]
}

export const Stats = (props: StatsProps) => {
    let total = props.cells.map(a => a.value).reduce((a, b) => a + b)
    let voltorbCount = props.cells.filter(a => a.value === 0).length

    let voltorbImage = process.env.PUBLIC_URL + "/voltorb.png"

    return (
        <div className="flip-grid-cell">
            <div className="stats">
                <div className="total-indicator">
                    {total}
                </div>

                <div className="voltorb-indicator">
                    <div>{voltorbCount}</div>
                    <img src={voltorbImage} alt="voltorb" />
                </div>
            </div>
        </div>
    )
}
