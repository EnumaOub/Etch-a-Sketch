
let old_size = 16;
let g_size = 16;
let g_width = 40;
let g_height = 40;
let hover_v = 1;

function ChangeSize() {
    while (1) {
        let new_size = parseInt(prompt("Which size < 100 do you want the grid ('16'=>16x16 grid)", 20), 10);
        if (!(isNaN(new_size)) && new_size<=100) {
            g_size = new_size;
            UpdateGrid();
            old_size = new_size;
            break;
        }
        if (new_size>100) {
            alert(`${new_size} > 100... \nTry Again!`)
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
    g_width = Math.round(960/g_size)
    g_height = Math.round(960/g_size)
    let grid_elem;
    for (let i=0; i<g_size; i++) {
        for (let i=0; i<g_size; i++) {
            grid_elem = document.createElement("div");
            grid_elem.style.border = "1px solid white";
            grid_elem.style.width = `${g_width}px`;
            grid_elem.style.height = `${g_height}px`;
            grid_elem.addEventListener("mouseover", (event) => {
                event.target.style["background-color"] = GetColor()
            });
            container.appendChild(grid_elem);
        }
    }
}



window.addEventListener('load', GetGrid);