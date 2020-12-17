<div class="color">
    <h2>Hex</h2>
    <div class="controls">
        <button class="adjust"><i class="fas fa-sliders-h"></i></button>
        <button class="lock"><i class="fas fa-lock-open"></i></button>
    </div>
    <div class="sliders">
        <button class="close-adjustment">X</button>
        <span>Hue</span>
        <input 
            type="range" 
            min="0" 
            max="359" 
            step="1" 
            name="hue" 
            class="hue-input" 
            data-hue="<?php echo $dataNumber; ?>"
        />
        <span>Brightness</span>
        <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            name="brightness" 
            class="bright-input" 
            data-bright="<?php echo $dataNumber; ?>" 
        />
        <span>Saturation</span>
        <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            name="saturation" 
            class="sat-input" 
            data-sat="<?php echo $dataNumber; ?>"
        />
    </div>
</div>