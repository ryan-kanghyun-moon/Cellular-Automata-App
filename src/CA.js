// import { isNumberTypeAnnotation, tsParenthesizedType } from '@babel/types';
// import React, { useState, useRef } from 'react';

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
    setGrid;
    isOnRef;
    live;
    surv;
    timeOut = 300;

    constructor(grid, setGrid, isOnRef, live, surv) {
        this.grid = [... grid];
        this.setGrid = setGrid;
        this.inOnRef = isOnRef;
        this.live = live;
        this.surv = surv;
        this.setGrid = setGrid.bind(this);

        return this;
    }

    show() {
       var nbSet = this.initScan();
       if (this.isOnRef) this.ca(nbSet);
    }

    countNeighbor(i, k) {
        var currCount = 0;

        for (let [w, h] in neighbors) {
            const x = i + w;
            const y = k + h;

            if (x >= 0 && x < this.grid.length && y >= 0 && y < this.grid[0].length){
               currCount += this.grid[x][y]; 
            }
        }

        return currCount;
    }

    insert(nbSet, i, k) {
       
        var newNbSet = [...nbSet];
        for (let [w, h] in neighbors) {
            const x = i + w;
            const y = k + h;
            if (x >= 0 && x < this.grid.length && y >= 0 && y < this.grid[0].length) {
                newNbSet.add(x, y);
            }
        }

        return newNbSet;
    }

    initScan() {
        var nbSet = new Set();
        this.grid.map((row, i) => {
            row.map((col, k) => {
                if (this.grid[i][k]) {
                    this.insert(nbSet, i, k);
                    console.log(this.grid);
                    nbSet.add([i, k]);
                }
            })
        })
    }

    renderGrid(nbSet) {
        for (let coords in nbSet.values()) {
            const x = coords[0];
            const y = coords[1];
            this.grid[x][y] = !this.grid[x][y];
        }
        this.setGrid(this.grid);
    }

    ca(nb) {
        
        if(this.isOnRef.curent) {
            var nbSet = nb;
            var newNbSet = new Set();
            var changed = new Set();

            for(let [x,y] in nbSet.values()) {
                const nbCount = this.countNeighbor(x, y);

                if ((!this.grid[x][y] && this.live[nbCount]) || (this.grid[x][y] && !this.surv[nbCount])) {
                    changed.add([x, y]);
                    this.insert(newNbSet, x, y);
                }
            }

            this.renderGrid(changed)
            setTimeout(this.ca(newNbSet))

        }
    }
}

