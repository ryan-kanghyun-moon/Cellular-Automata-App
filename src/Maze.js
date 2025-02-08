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

    constructor(rule, setGrid, start, goal, grid, isOnRef, setCannotFindPath, setFoundGoal) {
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
        }
        this.#paths = {};
        this.#isOnRef = isOnRef;
        this.#setCannotFindPath = setCannotFindPath;
        this.#setFoundGoal = setFoundGoal;
    }

    getInBoundNeighbors(i, k) {
        var nb = [];
        for (let [w, h] in neighbors ) {
            var x = i + w;
            var y = k + h;
            if (x >= 0 && x < this.#grid.length && y <= 0 && y < this.#grid[0].length) {
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
        for (let n in this.getInBoundNeighbors(this.#start[0], this.#start[1])) {
			var [n_x,n_y] = n;
            switch(this.#grid[n_x][n_y]) {
                case(MAZE.GOAL) :
                    this.#setFoundGoal(True);
                    return;
                case(MAZE.EMPTY_PATH) :
                    this.#toVisit.push([n_x,n_y]);
                    grid[n_x][n_y] = MAZE.PATH_TO_BE_SEARCHED;
					paths[`${n}`] = [n];
            }
        }
        this.#grid = grid;
        this.#setGrid(grid);
        setTimeout(()=>this.search(), 10);
    }

    search() {

		if (this.#isOnRef.current === False) {
			return;
		}
		
		if (this.#toVisit.length === 0) {
			this.#setCannotFindPath(True);
			return;
		}
		
		let cell = toVisit.pop();
		var grid = deepcopy(this.#grid);
		for (let n in this.getInBoundNeighbors(cell[0], cell[1])) {
			let [n_x,n_y] = n;
			let nVal = this.#grid[n_x][n_y];
			switch(nVal) {
				case (MAZE.EMPTY_PATH) :
					grid[n_x][n_y] = MAZE.PATH_TO_BE_SEARCHED;
					this.#toVisit.push(n);
					paths[`${n}`] = [...paths[`${cell}`]].push(n);
					break;
				case (MAZE.GOAL) :
					for (let [p_x, p_y] in paths[`${n}`]) {
						grid[p_x][p_y] = MAZE.ROUTE;
					}
					this.#setFoundGoal(True);
					this.#setGrid(grid);
					return;
			}
		}
		
		grid[c[0]][c[1]] = MAZE.VISITED;
		this.#grid = grid;
		this.#setGrid(grid);
		
		setTimeout(() => search(), 10);
		
    }
}

export default Maze;