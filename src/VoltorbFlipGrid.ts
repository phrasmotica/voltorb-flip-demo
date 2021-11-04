const createArray = (value: number, length: number) => new Array(length).fill(value)

const levelOneParameters = {
    size: 5,
    cells: createArray(2, 3).concat(createArray(3, 1)).concat(createArray(0, 6)).concat(createArray(1, 15))
}

export class VoltorbFlipGrid {
    grid: VoltorbFlipCell[][]

    constructor(grid: VoltorbFlipCell[][]) {
        this.grid = grid
    }

    static create() {
        let newGrid = []

        let parameters = levelOneParameters

        let cells = parameters.cells
        shuffleArray(cells)

        console.log(cells)

        for (let i = 0; i < parameters.size; i++) {
            let newRow: VoltorbFlipCell[] = []

            for (let j = 0; j < parameters.size; j++) {
                let value = cells[i * parameters.size + j]
                newRow.push(new VoltorbFlipCell(value))
            }

            newGrid.push(newRow)
        }

        return new VoltorbFlipGrid(newGrid)
    }

    size() {
        return this.grid.length
    }

    getState() {
        let cells = this.grid.flatMap(row => row)
        if (cells.some(c => c.value === 0 && c.flipped)) {
            return GridState.Lost
        }

        if (cells.filter(c => c.value > 1).every(c => c.flipped)) {
            return GridState.Won
        }

        return GridState.Pending
    }

    getCell(row: number, col: number) {
        return this.grid[row][col]
    }

    getRowTotal(row: number) {
        return this.grid[row].map(c => c.value).reduce((i, j) => i + j)
    }

    getColTotal(col: number) {
        let cells = this.grid.map(row => row[col]).map(c => c.value)
        return cells.reduce((i, j) => i + j)
    }

    countVoltorbsInRow(row: number) {
        return this.grid[row].filter(c => c.value === 0).length
    }

    countVoltorbsInCol(col: number) {
        let cells = this.grid.map(row => row[col]).map(c => c.value)
        return cells.filter(i => i === 0).length
    }
}

export class VoltorbFlipCell {
    value: number
    flipped: boolean

    constructor(value: number) {
        this.value = value
        this.flipped = false
    }

    flip() {
        this.flipped = true
    }
}

export enum GridState {
    Pending,
    Won,
    Lost,
}

const randomFrom = (arr: number[]) => arr[Math.floor(Math.random() * arr.length)]

const shuffleArray = (arr: number[]) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
}
