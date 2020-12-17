<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Coloors</title>
        <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Muli:400,700&display"
        />
        <link
            rel="stylesheet"
            href="style.css"
        />
    </head>
    <body>
        <div class="colors">
            <?php 
                for ($dataNumber = 0; $dataNumber < 5; $dataNumber++) {
                    include 'color.php';
                }
            ?>
        </div>
        <div class="panels">
            <div class="library-panel">
                <button class="library"><i class="fas fa-book-open"></i></button>
                <p>Library</p>
            </div>
            <div class="generate-panel">
                <button class="generate"><i class="fas fa-sync"></i></button>
                <p>Generate</p>
            </div>
            <div class="save-panel">
                <button class="save"><i class="fas fa-save"></i></button>
                <p>Save</p>
            </div>
        </div>
        <div class="copy-container">
            <div class="copy-popup">
                <h3>Copied to clipboard</h3>
                <h4>&#128077;</h4>
            </div>
        </div>
        <div class="save-container">
            <div class="save-popup">
                <button class="close-save">X</button>
                <h4>Give a name to your palette</h4>
                <input type="text" max-length="35" class="save-name" />
                <button class="submit-save">Save</button>
            </div>
        </div>
        <div class="library-container">
            <div class="library-popup">
                <button class="close-library">X</button>
                <h4>Pick your palette</h4>
            </div>
        </div>
        <script 
            src="https://cdnjs.cloudflare.com/ajax/libs/chroma-js/2.1.0/chroma.min.js" 
            integrity="sha512-yocoLferfPbcwpCMr8v/B0AB4SWpJlouBwgE0D3ZHaiP1nuu5djZclFEIj9znuqghaZ3tdCMRrreLoM8km+jIQ==" 
            crossorigin="anonymous"
        ></script>
        <script 
            src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/js/all.min.js" 
            integrity="sha512-F5QTlBqZlvuBEs9LQPqc1iZv2UMxcVXezbHzomzS6Df4MZMClge/8+gXrKw2fl5ysdk4rWjR0vKS7NNkfymaBQ==" 
            crossorigin="anonymous"
        ></script>
        <script 
            src="app.js"
        ></script>
    </body>
</html>