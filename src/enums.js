const CA = {
    ALIVE : 1, 
    DEAD : 0
};

const MAZE = {
    EMPTY_PATH : 0,
    WALL : 1,
    SEARCHED : 2,
    PATH_TO_BE_SEARCHED : 3,
    START : 4,
    GOAL : 5,
    PATH_FOUND : 6,
	DFS : "depth first search (DFS)",
	BFS : "breath first search (BFS)"
};

export {CA, MAZE};