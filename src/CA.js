
const neighbors = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
];

export class CA {
    grid;
    live;
    surv;
    setGrid;
    isOnRef;

    constructor(grid, live, surv, setGrid, isOnRef) {
        this.grid = grid;
        this.live = live;
        this.surv = surv;
        this.setGrid = setGrid;
        this.isOnRef = isOnRef;

        return this;
    }

    show() {
        if (this.isOnRef.current) {
            this.ca();
            this.setGrid(this.grid);
            setTimeout(() => this.show(), 10);
        }
    }

    countNeighbor(i, k) {
        var currCount = 0;

        for (let [w, h] of neighbors) {
            const x = i + w;
            const y = k + h;

            if (x >= 0 && x < this.grid.length && y >= 0 && y < this.grid[0].length){
               currCount += this.grid[x][y]; 
            }
        }

        return currCount;
    }

    ca() {
        var newGrid = this.grid.map((a) => a.slice());
        this.grid.forEach((row, i) => {
            row.forEach((col, k) => {
                var nbCount = this.countNeighbor(i, k);
               if ((this.grid[i][k] && !this.surv[nbCount]) || (!this.grid[i][k] && this.live[nbCount])) {
                newGrid[i][k] = !newGrid[i][k];
               }
            })
        })
        this.grid = newGrid;
    }


}