
let old_size = 16;
let g_size = 16;
let g_width = 40;
let g_height = 40;
let hover_v = 1;

function ChangeSize() {
    while (1) {
        let new_size = parseInt(prompt("Which size < 50 do you want the grid ('16'=>16x16 grid)", 20), 10);
        if (!(isNaN(new_size)) && new_size<=50) {
            g_size = new_size;
            UpdateGrid();
            old_size = new_size;
            break;
        }
        if (new_size>50) {
            alert(`${new_size} > 50... \nTry Again!`)
        }
        else {
            alert(`Wrong Entry... \nTry Again!`)
        }
    }
    
}

function UpdateGrid() {
    if (old_size > 0) {
        const container = document.getElementsByClassName("container")[0];
        container.innerHTML = '';
    }
    GetGrid();
}

function GetColor() {
    let r = Math.round(Math.random()*255);
    let g = Math.round(Math.random()*255);
    let b = Math.round(Math.random()*255);
    if (hover_v > 0.4) {
        hover_v -=0.01
    }
    return `rgba(${r}, ${g}, ${b}, ${hover_v})`
}

function  GetGrid() {
    hover_v = 1;
    const container = document.getElementsByClassName("container")[0];
    const c_width = Math.round(g_size * g_width);
    container.style["max-width"] = `${c_width}px`;
    let grid_elem;
    for (let i=0; i<g_size; i++) {
        for (let i=0; i<g_size; i++) {
            grid_elem = document.createElement("div");
            grid_elem.style["border-width"] = "thinner";
            grid_elem.style.border = "solid white";
            grid_elem.style.width = `${g_width}px`;
            grid_elem.style.height = `${g_width}px`;
            grid_elem.addEventListener("mouseover", (event) => {
                event.target.style["background-color"] = GetColor()
            });
            container.appendChild(grid_elem);
        }
    }
}



window.addEventListener('load', GetGrid);