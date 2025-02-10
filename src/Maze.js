import { MAZE } from "./enums";

class Queue {
    #q;
    #front;
    #back;
    length;
    constructor() {
        this.#q = [];
        this.#front = 0;
        this.#back = 0;
        this.length = 0;
    }
    push(obj) {
        this.#q.push(obj);
        this.length++;
        this.#back++;
    }
    pop() {
        if (this.isEmpty()) return undefined;
        var ret = this.#q[this.#front];
        this.#front++;
        this.length--;
        if (this.isEmpty()) {
            this.#front = 0;
            this.#back = 0;
        }
        return ret;
    }
    isEmpty() {
        return this.length === 0;
    }
}

const neighbors = [[-1, 0], [0, -1], [0, 1], [1, 0]];

class Maze {
    #setGrid;
    #visited;
    #start;
    #goal;
    #toVisit;
    #paths;
    #grid;
    #isOnRef;
    #setCannotFindPath;
    #setFoundGoal

    constructor(rule, setGrid, start, goal, grid, isOnRef) {
        this.#setGrid = setGrid;
        this.#grid = grid;
        this.#goal = goal;
        this.#start = start;
        switch(rule) {
            case(MAZE.BFS) :
                this.#toVisit = new Queue();
                break;
            case(MAZE.DFS) :
                this.#toVisit = [];
                break;
			default :
				throw new Error("wrong rule");
        }
        this.#paths = {};
        this.#isOnRef = isOnRef;
    }

    getInBoundNeighbors(i, k) {
        var nb = [];
		// console.log(neighbors);
        for (let [w, h] of neighbors) {
            const x = i + w;
            const y = k + h;
			// console.log(x);
			// console.log(y);
            if (x >= 0 && x < this.#grid.length && y >= 0 && y < this.#grid[0].length) {
                nb.push([x, y]);
            }
        }
        return nb;
    }

    deepcopy(grid) {
        return grid.map((a) => a.slice());
    }

    show() {
        var grid = this.deepcopy(this.#grid);
		// console.log("asdf");
		// console.log(this.#start);
		// console.log(this.getInBoundNeighbors(this.#start[0], this.#start[1]));
        for (let n of this.getInBoundNeighbors(this.#start[0], this.#start[1])) {
			var [n_x,n_y] = n;
			console.log(n);
			console.log(this.#grid[n_x][n_y]);
            switch(this.#grid[n_x][n_y]) {
                case(MAZE.GOAL) :
					return MAZE.PATH_FOUND;
                case(MAZE.EMPTY_PATH) :
                    this.#toVisit.push([n_x,n_y]);
                    grid[n_x][n_y] = MAZE.PATH_TO_BE_SEARCHED;
					this.#paths[`${n}`] = [n];
					// console.log(this.#toVisit.length);
            }
			
        }
        this.#grid = grid;
        this.#setGrid(grid);
        setTimeout(()=>this.search(), 10);
    }

    search() {

		if (this.#isOnRef.current === false) {
			return undefined;
		}
		
		if (this.#toVisit.length === 0) {
			return MAZE.WALL;
		}
		
		
		let cell = this.#toVisit.pop();
		var grid = this.deepcopy(this.#grid);
		for (let n of this.getInBoundNeighbors(cell[0], cell[1])) {
			let [n_x,n_y] = n;
			let nVal = this.#grid[n_x][n_y];
			switch(nVal) {
				case (MAZE.EMPTY_PATH) :
					grid[n_x][n_y] = MAZE.PATH_TO_BE_SEARCHED;
					this.#toVisit.push(n);
					var pathsToN = [...this.#paths[`${cell}`]];
					pathsToN.push(n);
					this.#paths[`${n}`] = pathsToN;
					break;
				case (MAZE.GOAL) :
					for (let [p_x, p_y] of this.#paths[`${cell}`]) {
						grid[p_x][p_y] = MAZE.PATH_FOUND;
					}
					this.#setGrid(grid);
					return MAZE.PATH_FOUND;
			}
		}
		
		grid[cell[0]][cell[1]] = MAZE.VISITED;
		this.#grid = grid;
		this.#setGrid(grid);
		
		setTimeout(() => this.search(), 1);
		
    }
}

export default Maze;