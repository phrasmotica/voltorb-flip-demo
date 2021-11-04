const createArray = (value: number, length: number) => new Array(length).fill(value)

const createGrid = (size: number, numVoltorbs: number, numTwos: number, numThrees: number) => {
    let numOnes = size * size - (numVoltorbs + numTwos + numThrees)

    return [
        ...createArray(0, numVoltorbs),
        ...createArray(1, numOnes),
        ...createArray(2, numTwos),
        ...createArray(3, numThrees),
    ]
}

// https://bulbapedia.bulbagarden.net/wiki/Voltorb_Flip
const levelParameters = [
    {
        size: 5,
        cellsOptions: [
            createGrid(5, 6, 3, 1),
            createGrid(5, 6, 0, 3),
            createGrid(5, 6, 5, 0),
            createGrid(5, 6, 2, 2),
            createGrid(5, 6, 4, 1),
        ],
    },
    {
        size: 5,
        cellsOptions: [
            createGrid(5, 7, 1, 3),
            createGrid(5, 7, 6, 0),
            createGrid(5, 7, 3, 2),
            createGrid(5, 7, 0, 4),
            createGrid(5, 7, 5, 1),
        ],
    },
    {
        size: 5,
        cellsOptions: [
            createGrid(5, 8, 2, 3),
            createGrid(5, 8, 7, 0),
            createGrid(5, 8, 4, 2),
            createGrid(5, 8, 1, 4),
            createGrid(5, 8, 6, 1),
        ],
    },
    {
        size: 5,
        cellsOptions: [
            createGrid(5, 8, 3, 3),
            createGrid(5, 8, 0, 5),
            createGrid(5, 10, 8, 0),
            createGrid(5, 10, 5, 2),
            createGrid(5, 10, 2, 4),
        ],
    },
    {
        size: 5,
        cellsOptions: [
            createGrid(5, 10, 7, 1),
            createGrid(5, 10, 4, 3),
            createGrid(5, 10, 1, 5),
            createGrid(5, 10, 9, 0),
            createGrid(5, 10, 6, 2),
        ],
    },
    {
        size: 5,
        cellsOptions: [
            createGrid(5, 10, 3, 4),
            createGrid(5, 10, 0, 6),
            createGrid(5, 10, 8, 1),
            createGrid(5, 10, 5, 3),
            createGrid(5, 10, 2, 5),
        ],
    },
    {
        size: 5,
        cellsOptions: [
            createGrid(5, 10, 7, 2),
            createGrid(5, 10, 4, 4),
            createGrid(5, 13, 1, 6),
            createGrid(5, 13, 9, 1),
            createGrid(5, 10, 6, 3),
        ],
    },
    {
        size: 5,
        cellsOptions: [
            createGrid(5, 10, 0, 7),
            createGrid(5, 10, 8, 2),
            createGrid(5, 10, 5, 4),
            createGrid(5, 10, 2, 6),
            createGrid(5, 10, 7, 3),
        ],
    },
]

export enum GridState {
    Pending,
    Won,
    Lost,
}

export class VoltorbFlipGrid {
    grid: VoltorbFlipCell[][]

    constructor(grid: VoltorbFlipCell[][]) {
        this.grid = grid
    }

    static create(level: number) {
        let newGrid = []

        let parameters = levelParameters[level]

        let cells = randomFrom(parameters.cellsOptions)

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
        let cellValues = this.grid.map(row => row[col]).map(c => c.value)
        return cellValues.reduce((i, j) => i + j)
    }

    countVoltorbsInRow(row: number) {
        return this.grid[row].filter(c => c.value === 0).length
    }

    countVoltorbsInCol(col: number) {
        let cellValues = this.grid.map(row => row[col]).map(c => c.value)
        return cellValues.filter(i => i === 0).length
    }

    getScore() {
        let flippedCells = this.grid.flatMap(row => row).filter(c => c.flipped)
        if (flippedCells.length <= 0) {
            return 0
        }

        return flippedCells.map(c => c.value).reduce((i, j) => i * j)
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

const randomFrom = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]

// https://stackoverflow.com/a/12646864
const shuffleArray = (arr: number[]) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
}
