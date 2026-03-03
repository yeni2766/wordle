// Default grid size (will get recalculated dynamically)
let columns = 10;
let rows = 10;

// This is the container where all the animated tiles live
let wrapper = document.querySelector('#tile-container');


// Creates ONE tile element
const createTile = index => {

    // Create a new div
    const tile = document.createElement('div');

    // Add a class so it can be styled + animated
    tile.classList.add('tile');

    // Return it so it can be appended to the grid
    return tile;
}


// Creates multiple tiles
const createTiles = quantity => {

    // Create an array of "quantity" length
    // Loop through it and append tiles to the wrapper
    Array.from(Array(quantity)).map((tile, index) => {
        wrapper.appendChild(createTile(index));
    });
}


// Builds the grid dynamically
const createGrid = () => {

    // Clear existing tiles before rebuilding
    wrapper.innerHTML = '';

    /*
      Calculate how many columns and rows we can fit
      based on screen size.

      Each tile is roughly 50px,
      so divide screen width/height by 50.
    */
    columns = Math.floor(document.body.clientWidth / 50);
    rows = Math.floor(document.body.clientHeight / 50);

    /*
      Set CSS variables so the grid layout
      can use --columns and --rows in CSS
    */
    wrapper.style.setProperty('--columns', columns);
    wrapper.style.setProperty('--rows', rows);

    // Total tiles = rows × columns
    createTiles(rows * columns);
}


// Handles animation using anime.js
const animate = () => {

    anime({

        // Target all elements with class "tile"
        targets: ".tile",

        // Slight vertical movement
        translateY: function (el, i) {
            return 10;
        },

        // Keep scale at 1 (no shrink/grow)
        scale: 1,

        // Random rotation for each tile
        rotate: function () {
            return anime.random(-360, 360);
        },

        // Random border radius so shapes morph
        borderRadius: function () {
            return ["50%", anime.random(10, 35) + "%"];
        },

        // Random animation duration per tile
        duration: function () {
            return anime.random(1200, 1800);
        },

        // Random delay per tile for staggered effect
        delay: function () {
            return anime.random(0, 400);
        },

        // Animate forward and backward
        direction: "alternate",

        // Loop forever
        loop: true,

        // Random subtle background colour
        backgroundColor: function() {
            return `rgba(
                ${anime.random(0, 10)},
                ${anime.random(100, 255)},
                ${anime.random(50, 175)},
                0.1
            )`;
        }
    });
};


// When the window resizes, rebuild the grid
window.onresize = () => createGrid();

// Create grid on initial load
createGrid();
