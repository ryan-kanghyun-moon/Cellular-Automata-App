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
    #setFoundGoal;
	#setIsOn;

    constructor(rule, setGrid, start, goal, grid, isOnRef, setIsOn) {
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
		this.#setIsOn = setIsOn;
    }

    getInBoundNeighbors(i, k) {
        var nb = [];
        for (let [w, h] of neighbors) {
            const x = i + w;
            const y = k + h;
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
        for (let n of this.getInBoundNeighbors(this.#start[0], this.#start[1])) {
			var [n_x,n_y] = n;
            switch(this.#grid[n_x][n_y]) {
                case(MAZE.GOAL) :
					this.#setIsOn(false);
					this.#isOnRef.current = false;
					return;
                case(MAZE.EMPTY_PATH) :
                    this.#toVisit.push([n_x,n_y]);
                    grid[n_x][n_y] = MAZE.PATH_TO_BE_SEARCHED;
					this.#paths[`${n}`] = [n];
					break;
				default :
					break;
            }
			
        }
        this.#grid = grid;
        this.#setGrid(grid);
        setTimeout(()=>this.search(), 10);
    }

    search() {

		if (this.#isOnRef.current === false) {
			return;
		}
		
		if (this.#toVisit.length === 0) {
			alert("could not find path to goal");
			this.#setIsOn(false);
			this.#isOnRef.current = false;
		}
		
		let cell = this.#toVisit.pop();
		if (!cell) return;
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
					this.#setIsOn(false);
					this.#isOnRef.current = false;
					return;
				default :
					break;
			}
		}
		
		grid[cell[0]][cell[1]] = MAZE.SEARCHED;
		this.#grid = grid;
		this.#setGrid(grid);
		
		setTimeout(() => this.search(), 10);
		
    }
}

export default Maze;