import { MAZE } from "./enums";

class Queue {
    #q;
    #front;
    #back;
    #size;
    constructor() {
        this.#q = [];
        this.#front = 0;
        this.#back = 0;
        this.#size = 0;
    }
    push(obj) {
        this.#q.push(obj);
        this.#size++;
        this.#back++;
    }
    pop() {
        if (this.isEmpty()) return undefined;
        var ret = this.#q[this.#front];
        this.#front++;
        this.#size--;
        if (this.isEmpty()) {
            this.#front = 0;
            this.#back = 0;
        }
        return ret;
    }
    isEmpty() {
        return this.#size === 0;
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

    #getInBoundNeighbors(i, k) {
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

    #deepcopy(grid) {
        return grid.map((a) => a.slice());
    }

    show() {
        var grid = this.#deepcopy(this.#grid);
        for (let [n_x,n_y] in this.#getInBoundNeighbors(this.#start[0], this.#start[1])) {
            switch(this.#grid[n_x][n_y]) {
                case(MAZE.GOAL) :
                    this.#setFoundGoal(True);
                    return;
                case(MAZE.EMPTY_PATH) :
                    this.#toVisit.push([n_x,n_y]);
                    grid[n_x][n_y] = MAZE.PATH_TO_BE_SEARCHED;
            }
        }
        this.#grid = grid;
        this.#setGrid(grid);
        setTimeout(()=>this.search(), 50);
    }

    search() {

        // basecase, setCannotFindPath(True) and exit if toVisit is empty OR isOnRef is False
        /*
            if toVisit.isEmpty() :
                setCannotFindPath(True);
                return
            else if isOnRef.current === False :
                return 
        */

        /*
        c <- toVisit.pop()
        for neighbors n of c:
            if n is emptyPath:
                grid[n.x][n.y] = MAZE.TO_VISIT
                toVisit.push(n)
                paths[n] = paths[c].push(n)
            if n is Goal:
                for p in paths[c]:
                    grid[p.x][p.y] = MAZE.ROUTE
                endfor
                setFoundGoal(True);
        endfor  
        
        grid[c.x][c.y] = MAZE.VISITED;
        delete paths[c]
        setGrid(grid)

        setTimeout(()=>search(), 50)
        
        */
    }



}