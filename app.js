//Global selections and variables
const colorPanels = document.querySelectorAll('.color');
const generateBtn = document.querySelector('.generate');
const sliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll('.color h2');
const copyPopup = document.querySelector('.copy-container');
const adjustButtons = document.querySelectorAll('.adjust');
const closeAdjustButtons = document.querySelectorAll('.close-adjustment');
const lockButtons = document.querySelectorAll('.lock');
const sliderContainers = document.querySelectorAll('.sliders');
let initialColors;
// Event Listeners
sliders.forEach(slider => {
    slider.addEventListener('input', hslControls);
})

colorPanels.forEach((div, index) => {
    div.addEventListener('change', () => {
        updateTextUI(index);
    })
})

currentHexes.forEach(hex => {
    hex.addEventListener('click', () => {
        copyToClipboard(hex);
    })
})

generateBtn.addEventListener('click', randomColors);

copyPopup.children[0].addEventListener('transitionend', () => {
    copyPopup.classList.remove('active');
    copyPopup.children[0].classList.remove('active');
})

adjustButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        toggleAdjustmentPanel(index);
    });
})

closeAdjustButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        toggleAdjustmentPanel(index);
    });
})

lockButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        console.log('clicked');
        colorPanels[index].classList.toggle('locked');
        button.innerHTML = colorPanels[index].classList.contains('locked') ? '<i class="fas fa-lock"></i>' : '<i class="fas fa-lock-open"></i>';
        updateTextUI(index);
    })
})


// Functions
function randomColors() {
    initialColors = []
    colorPanels.forEach((colorPanel, index) => {
        const hexText = colorPanel.children[0];

        const randomColor = chroma.random();
        if (colorPanel.classList.contains('locked')) {
            initialColors.push(hexText.innerText);
            return;
        } else {
            initialColors.push(chroma(randomColor).hex());
        }
        colorPanel.style.backgroundColor = randomColor;
        hexText.innerText = randomColor;
        adjustTextIconContrast(randomColor, hexText);
        adjustTextIconContrast(randomColor, adjustButtons[index].children[0]);
        adjustTextIconContrast(randomColor, lockButtons[index].children[0]);

        const color = chroma(randomColor);
        const sliders = colorPanel.querySelectorAll('.sliders input');
        const [ hue, brightness, saturation ] = sliders;

        coloriseSliders(color, hue, brightness, saturation);

        [ hue.value, brightness.value, saturation.value ] = [ Math.floor(color.get('hsl.h')), Math.floor(color.get('hsl.l') * 100) / 100, Math.floor(color.get('hsl.s') * 100) / 100 ]
    });
}

function adjustTextIconContrast(color, item) {
    const luminance = chroma(color).luminance();
    item.style.color = luminance > 0.5? "black": "white";
}

function coloriseSliders(color, hue, brightness, saturation) {
    const minSaturation = color.set('hsl.s', 0);
    const midSaturation = color.set('hsl.s', 0.5);
    const maxSaturation = color.set('hsl.s', 1);
    const scaleSat = chroma.scale([minSaturation, midSaturation, maxSaturation]);
    
    saturation.style.backgroundImage = `linear-gradient(to right, ${scaleSat(0)}, ${scaleSat(0.5)}, ${scaleSat(1)})`;

    const midBrightness = color.set('hsl.l', 0.5);
    const scaleBright = chroma.scale(["black", midBrightness, "white"]);
    brightness.style.backgroundImage = `linear-gradient(to right, ${scaleBright(0)}, ${scaleBright(0.5)}, ${scaleBright(1)}`;

    hue.style.backgroundImage = `linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)`;
    
}

function hslControls(e) {
    const index = e.target.getAttribute('data-hue') 
                  || e.target.getAttribute('data-sat') 
                  || e.target.getAttribute('data-bright');
    const sliders = e.target.parentElement.querySelectorAll('input[type="range"]');
    const [ hue, brightness, saturation ] = sliders;

    const bgColor = initialColors[index];
    
    // Get new color
    let color = chroma(bgColor)
                .set('hsl.s', saturation.value)
                .set('hsl.l', brightness.value)
                .set('hsl.h', hue.value);

    // Update interface
    colorPanels[index].style.backgroundColor = color;
    coloriseSliders(color, hue, brightness, saturation);

}

function updateTextUI(index) {
    const activeDiv = colorPanels[index];
    const color = chroma(activeDiv.style.backgroundColor);
    const textHex = activeDiv.querySelector('h2');
    const controlButtons = activeDiv.querySelectorAll('.controls button')
    const [ adjustIcon, lockIcon ] = Array.from(controlButtons).map((item) => item.children[0]);
    textHex.innerText = color.hex();
    adjustTextIconContrast(color, textHex);
    adjustTextIconContrast(color, adjustIcon);
    adjustTextIconContrast(color, lockIcon);
}

function copyToClipboard(hex) {
    const el = document.createElement('textarea');
    el.value = hex.innerText;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);

    copyPopup.classList.add('active');
    copyPopup.children[0].classList.add('active');
}

function toggleAdjustmentPanel(index) {
    sliderContainers[index].classList.toggle('active');
}

// Saving palette to local storage

const saveContainer = document.querySelector('.save-container');
const saveButton = document.querySelector('.save');
const saveInput = document.querySelector('.save-container input');
const submitSave = document.querySelector('.submit-save');
const closeSave = document.querySelector('.close-save');
const libraryContainer = document.querySelector('.library-container');
const libraryButton = document.querySelector('.library')
const closeLibrary = document.querySelector('.close-library');

let savedPalettesRaw = localStorage.getItem('palettes');
let savedPalettes = savedPalettesRaw? JSON.parse(savedPalettesRaw): [];
savedPalettes.forEach( palette => { addPaletteToLibrary(palette); });

[ saveButton, closeSave ].forEach(button => {
    button.addEventListener('click', () => {
        togglePopup(saveContainer);
    });
});

[ libraryButton, closeLibrary ].forEach(button => {
    button.addEventListener('click', () => {
        togglePopup(libraryContainer);
    });
});

submitSave.addEventListener('click', savePalette);

function togglePopup(container) {
    const popup = container.children[0];
    container.classList.toggle('active');
    popup.classList.toggle('active');
}

function savePalette(e) {
    saveContainer.classList.remove('active');
    saveContainer.children[0].classList.remove('active');

    const name = saveInput.value;
    const colors = [];

    currentHexes.forEach(hex => {
        colors.push(hex.innerText);
    })

    let nr = savedPalettes.length;
    const paletteObj = { name, colors, nr };
    savedPalettes.push(paletteObj);

    saveToLocal(paletteObj);
    addPaletteToLibrary(paletteObj);
    saveInput.value = "";
    
}

function addPaletteToLibrary(paletteObj) {

    const palette = document.createElement('div');
    palette.classList.add('custom-palette');

    const title = document.createElement('h4');
    title.innerText = paletteObj.name;

    const preview = document.createElement('div');
    preview.classList.add('small-preview');
    
    paletteObj.colors.forEach(color => {
        const colorPreview = document.createElement('div');
        colorPreview.style.backgroundColor = color;
        preview.appendChild(colorPreview);
    })

    const paletteBtn = document.createElement('button');
    paletteBtn.classList.add('pick-palette-btn');
    paletteBtn.classList.add(paletteObj.nr);
    paletteBtn.innerText = 'Select';

    paletteBtn.addEventListener('click', (e) => {
        togglePopup(libraryContainer);
        paletteObj.colors.forEach((color, index) => {
            initialColors.push(color);
            colorPanels[index].style.backgroundColor = color;
            updateTextUI(index);

            const colorChroma = chroma(color);
            const sliders = colorPanels[index].querySelectorAll('.sliders input');
            const [ hue, brightness, saturation ] = sliders;
    
            coloriseSliders(colorChroma, hue, brightness, saturation);
    
            [ hue.value, brightness.value, saturation.value ] = [ Math.floor(colorChroma.get('hsl.h')), 
                                                                  Math.floor(colorChroma.get('hsl.l') * 100) / 100, 
                                                                  Math.floor(colorChroma.get('hsl.s') * 100) / 100 ]
        });
    });

    palette.appendChild(title);
    palette.appendChild(preview);
    palette.appendChild(paletteBtn);
    console.log(libraryContainer.children[0]);
    libraryContainer.children[0].appendChild(palette);
}

function saveToLocal(paletteObj) {
    let localPalettesRaw = localStorage.getItem('palettes');
    localPalettes = localPalettesRaw? JSON.parse(localPalettesRaw): [];
    localPalettes.push(paletteObj);
    localStorage.setItem('palettes', JSON.stringify(localPalettes));
}

randomColors();
