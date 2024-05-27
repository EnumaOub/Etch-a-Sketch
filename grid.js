// Set global variables of the grid
let g_size = 16; // initial size of the grid 16x16
const width_grid = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--size-grid')); // width and height of the grid
let hover_v = 1; // Initial value of hover opacity

let picker = false; // Initialise color picker
let random = true; // Initialise random color
let shade = false; // Initialise shading color

// Can change the number of square using the slider
const slider = document.getElementById("nbgrid");
const slider_value = document.getElementsByClassName("slider_text")[0];
slider.value = g_size
slider.oninput = function() {
    g_size = parseInt(this.value);
    slider_value.textContent = `${g_size}x${g_size} squares`
    UpdateGrid();
}

// function called when clicked on button changeSize
function ChangeSize() {
    while (1) {
        let new_size = parseInt(prompt("Which size < 60 do you want the grid ('16'=>16x16 grid)", 20), 10);
        if (!(isNaN(new_size)) && new_size<=60) {
            g_size = new_size;
            slider.value = g_size;
            UpdateGrid();
            break;
        }
        if (new_size>60) {
            alert(`${new_size} > 60... \nTry Again!`)
        }
        else {
            alert(`Wrong Entry... \nTry Again!`)
        }
    }
}

 

// Reset the grid with current value of the grid
function UpdateGrid() {
    const container = document.getElementsByClassName("container")[0];
    container.innerHTML = '';
    
    GetGrid();
}

// Function to create the random color when hovering over the square
function GetRandColor() {
    let r = Math.round(Math.random()*255);
    let g = Math.round(Math.random()*255);
    let b = Math.round(Math.random()*255);
    if (hover_v > 0.1) {
        hover_v -=0.01
    }
    return `rgba(${r}, ${g}, ${b}, ${hover_v})`
}

// Function to take color from color picker
function GetPickerColor() {
    const color = document.getElementById('colorpicker').value;
    let opacity;
    if (hover_v == 1) {
        opacity = ""
    }
    else {
        opacity = String(Math.round(hover_v*100));
    }
    
    if (hover_v > 0.1) {
        hover_v -=0.01
    }
    return color + opacity
}

// Apply to an element the style in object
function ApplyObjStyle(elem, obj) {
    for (let style_k of Object.keys(obj)) {
        elem.style[style_k] = obj[style_k];
    }
}

// Function to choose the mode of color using the button
function ChooseButton(btn_name) {
    const color_picker = document.getElementById('picker');
    const color_rand = document.getElementById('random');
    const color_shade = document.getElementById('shade');
    const activate = {
        "background-color": "#872bf7",
        "border": "2px solid black",
        "font-weight": "500",
        "color": "white"
    };
    const deactivate = {
        "background-color": "#efe2ff",
        "border": "none",
        "font-weight": "0",
        "color": "black"
    };

    if (btn_name == "picker"){
        if (!(picker)) {
            ApplyObjStyle(color_picker, activate);
            ApplyObjStyle(color_rand, deactivate);
            picker = true;
            random = false;
        }
    }
    else if (btn_name == "random"){
        if (!(random)) {
            ApplyObjStyle(color_rand, activate);
            ApplyObjStyle(color_picker, deactivate);
            random = true;
            picker = false;
        }
    }
    else if (btn_name == "shade"){
        if (!(shade)) {
            ApplyObjStyle(color_shade, activate);
            shade = true;
        }
        else {
            ApplyObjStyle(color_shade, deactivate);
            shade = false;
        }
    }
}

// Function which generate the grid
function  GetGrid() {
    hover_v = 1;
    const container = document.getElementsByClassName("container")[0];
    let g_width = Math.round(width_grid/g_size)
    let g_height = Math.round(width_grid/g_size)
    g_size = Math.floor(width_grid/g_height)
    let grid_elem;
    for (let i=0; i<g_size; i++) {
        for (let i=0; i<g_size; i++) {
            grid_elem = document.createElement("div");
            grid_elem.style.width = `${g_width}px`;
            grid_elem.style.height = `${g_height}px`;
            grid_elem.addEventListener("mousemove", (event) => {
                if (!(shade)) {
                    hover_v = 1;
                }
                if (random) {
                    event.target.style["background-color"] = GetRandColor();
                }
                else if (picker) {
                    event.target.style["background-color"] = GetPickerColor();
                }
            });
            container.appendChild(grid_elem);
        }
    }
}



window.addEventListener('load', GetGrid);