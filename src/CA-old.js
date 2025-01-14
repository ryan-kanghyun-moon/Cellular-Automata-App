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
    // setGrid;
    // isOnRef;
    live;
    surv;
    // timeOut = 300;
    nb;
    // count;

    constructor(grid, /*setGrid, isOnRef,*/ live, surv) {
        this.grid = [... grid];
        // this.setGrid = setGrid;
        // this.inOnRef = isOnRef;
        this.live = live;
        this.surv = surv;
        // this.setGrid = setGrid.bind(this);
        this.nb = this.initScan();
        console.log(this.nb);

        // this.count = 1;

        return this;
    }

    next() {
        // this.grid[0][this.count] = 1;
        // console.log(this.grid);
        // this.count += 1;
        // return this.grid;
       this.ca();
       return this.grid;
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

    insert(nbSet, i, k) {
       
        var newNbSet = [...nbSet];
        for (let [w, h] in neighbors) {
            const x = i + w;
            const y = k + h;
            if (x >= 0 && x < this.grid.length && y >= 0 && y < this.grid[0].length) {
                newNbSet.add([x, y]);
            }
        }

        return newNbSet;
    }

    initScan() {
        var nbSet = new Set();
        this.grid.map((row, i) => {
            row.map((col, k) => {
                if (this.grid[i][k]) {
                    for (let [w, h] in neighbors) {
                        const x = i + w;
                        const y = k + h;
                        if (x >= 0 && x < this.grid.length && y >= 0 && y < this.grid[0].length) {
                            nbSet.add([x, y]);
                        }
                    // console.log(this.grid);
                    nbSet.add([i, k]);
                }
            }})
        })
        return nbSet;
    }

    renderGrid(nbSet) {
        for (let [x,y] of nbSet) {
            // const x = coords[0];
            // const y = coords[1];
            this.grid[x][y] = !this.grid[x][y];
        }
    }

    ca() {
        // if(this.isOnRef.curent) {
            var nbSet = this.nb;
            var newNbSet = new Set();
            var changed = new Set();
            // console.log(typeof(this.nbSet));
            for(let [x,y] of nbSet) {
                const nbCount = this.countNeighbor(x, y);

                if ((!this.grid[x][y] && this.live[nbCount]) || (this.grid[x][y] && !this.surv[nbCount])) {
                    changed.add([x, y]);
                    for (let [w, h] in neighbors) {
                        const i = x + w;
                        const k = y + h;
                        if (i >= 0 && i < this.grid.length && k >= 0 && k < this.grid[0].length) {
                            newNbSet.add([i, k]);
                        }
                }
            }
        }
            this.renderGrid(changed)
            // console.log(this.grid);
            this.nb = newNbSet;
            // setTimeout(this.ca(newNbSet))

        // }
    }
}

