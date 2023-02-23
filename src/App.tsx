import { useState } from "react"

import { VoltorbFlip } from "./VoltorbFlip"
import { GridState, VoltorbFlipGrid } from "./VoltorbFlipGrid"

import "./App.css"

const newGrid = (level: number) => VoltorbFlipGrid.create(level)

const App = () => {
    const [level, setLevel] = useState(1)
    const [score, setScore] = useState(0)
    const [streak, setStreak] = useState(0)
    const [grid, setGrid] = useState(newGrid(level))

    const flipCell = (row: number, col: number) => {
        grid.getCell(row, col).flip()
        setGrid(new VoltorbFlipGrid(grid.grid))
    }

    // https://bulbapedia.bulbagarden.net/wiki/Voltorb_Flip
    const nextLevel = (grid: VoltorbFlipGrid) => {
        let newLevel = level
        let newStreak = 0

        let state = grid.getState()
        if (state === GridState.Won) {
            newStreak = streak + 1

            if (newStreak >= 5) {
                newLevel = 8
            }
            else {
                newLevel = Math.min(8, level + 1)
            }

            setScore(score + grid.getScore())
        }

        if (state === GridState.Lost) {
            let numFlippedMultipliers = grid.getNumberOfFlippedMultipliers()
            if (numFlippedMultipliers < level) {
                newLevel = Math.max(1, Math.min(8, level, numFlippedMultipliers))
            }
        }

        setLevel(newLevel)
        setStreak(newStreak)
        setGrid(newGrid(newLevel))
    }

    const reset = () => {
        setLevel(1)
        setStreak(0)
        setGrid(newGrid(1))
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Voltorb Flip</h1>

                <h4>A clone of the beloved mini-game from Pok&eacute;mon HeartGold and SoulSilver.</h4>

                <VoltorbFlip
                    level={level}
                    streak={streak}
                    score={score}
                    grid={grid}
                    flipCell={flipCell}
                    nextLevel={nextLevel}
                    reset={reset} />
            </header>

            <footer>
                <a href="https://www.icons101.com/icon/id_60093/setid_928/Pokemon_by_HEKTakun/100_Voltorb" title="voltorb icon">Voltorb icon created by HEKTakun - Icons101</a>
            </footer>
        </div>
    )
}

export default App
