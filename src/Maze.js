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

class Maze {
    #setGrid;
    #visited;
    #start;
    #goal;
    #toVisit;
    #paths;
    #grid;

    constructor(rule, setGrid, start, goal, grid) {
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
    }

    show() {}

    


}