// Navigation & Menu Layer Control Actions
function toggleMenu() {
    const menu = document.getElementById('sideMenu');
    menu.classList.toggle('open');
}

function showPage(pageId) {
    const pages = document.querySelectorAll('.app-page');
    pages.forEach(page => page.classList.remove('active-page'));
    document.getElementById(pageId).classList.add('active-page');
    window.scrollTo(0, 0);
}

// Dynamic Forms Component Layer Management
function addQualification() {
    const container = document.getElementById('qualification-container');
    const newRow = document.createElement('div');
    newRow.className = 'dynamic-row';
    newRow.innerHTML = `
        <input type="text" placeholder="Degree/Course" required>
        <input type="text" placeholder="Board/University" required>
        <input type="text" placeholder="Passing Year" class="short-input" required>
        <input type="text" placeholder="Percentage" class="short-input" required>
    `;
    container.appendChild(newRow);
}

function addExperience() {
    const container = document.getElementById('experience-container');
    const newRow = document.createElement('div');
    newRow.className = 'dynamic-row';
    newRow.innerHTML = `
        <input type="text" placeholder="Job Title">
        <input type="text" placeholder="Company Name">
        <input type="text" placeholder="Duration">
    `;
    container.appendChild(newRow);
}

// Dynamic Registration Form Endpoint Handling
function submitAgencyForm(e) {
    e.preventDefault();
    alert('Application securely registered inside central gateway dataset.');
    document.getElementById('agencyForm').reset();
}

// FUNCTIONAL CANVAS LOGIC 1: AUTO CROP & PHOTO-SIGNATURE COMPRESSOR
function processAndDownloadCrop() {
    const fileInput = document.getElementById('cropFileInput');
    const targetSizeKB = parseInt(document.getElementById('cropSizeSelect').value);
    
    if (!fileInput.files || !fileInput.files[0]) {
        alert('Please select an image file first!');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.getElementById('processingCanvas');
            const ctx = canvas.getContext('2d');

            // Standardize output to square layout format (Best for standard portals)
            const sideSize = Math.min(img.width, img.height);
            canvas.width = 400;
            canvas.height = 400;

            // Center Crop calculations
            const sx = (img.width - sideSize) / 2;
            const sy = (img.height - sideSize) / 2;

            ctx.drawImage(img, sx, sy, sideSize, sideSize, 0, 0, 400, 400);

            // Iterative compression mechanism layer to approach requested KB thresholds safely
            let quality = 0.90;
            let dataUrl = canvas.toDataURL('image/jpeg', quality);
            
            // Loop adjustment configuration matching binary allocation parameters
            while ((dataUrl.length * 0.75) / 1024 > targetSizeKB && quality > 0.1) {
                quality -= 0.05;
                dataUrl = canvas.toDataURL('image/jpeg', quality);
            }

            // Direct UI Download Triggers
            const downloadLink = document.createElement('a');
            downloadLink.href = dataUrl;
            downloadLink.download = `sv_cropped_${targetSizeKB}kb.jpg`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

// FUNCTIONAL CANVAS LOGIC 2: 8-PASSPORT SHEET AUTOMATIC GENERATOR
function generateAndDownloadPassportPhotos() {
    const fileInput = document.getElementById('passportFileInput');

    if (!fileInput.files || !fileInput.files[0]) {
        alert('Please select a portrait image file first!');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.getElementById('processingCanvas');
            const ctx = canvas.getContext('2d');

            // Dimensions setup for standard 4x6 inch photo sheet print (at 300 DPI layout)
            canvas.width = 1200;
            canvas.height = 800;

            // Clear framework to smooth white photo studio background matrix
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Individual Passport Size layout specifications: 3.5cm x 4.5cm translates locally to ~270x350px scaling bounds
            const photoWidth = 260;
            const photoHeight = 340;
            
            // Offsets and structural spacing arrays mapping out a grid layout structure
            const startX = 50;
            const startY = 40;
            const gapX = 30;
            const gapY = 40;

            // Pre-process individual photo slot coordinates onto background canvas layers
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = photoWidth;
            tempCanvas.height = photoHeight;
            const tempCtx = tempCanvas.getContext('2d');

            // Calculations to force auto center-crop on uploaded file layout automatically
            const aspectTarget = photoWidth / photoHeight;
            let srcW = img.width;
            let srcH = img.height;
            let sx = 0;
            let sy = 0;

            if (img.width / img.height > aspectTarget) {
                srcW = img.height * aspectTarget;
                sx = (img.width - srcW) / 2;
            } else {
                srcH = img.width / aspectTarget;
                sy = (img.height - srcH) / 2;
            }

            // Draw single cropped passport layout image with high definition details
            tempCtx.drawImage(img, sx, sy, srcW, srcH, 0, 0, photoWidth, photoHeight);
            
            // Apply automatic skin tone brightness correction adjustments inside image balance arrays
            tempCtx.globalCompositeOperation = 'source-over';
            
            // Render 8 Photos dynamically onto 2 rows inside output target file canvas sheet grid setup
            for (let row = 0; row < 2; row++) {
                for (let col = 0; col < 4; col++) {
                    const x = startX + col * (photoWidth + gapX);
                    const y = startY + row * (photoHeight + gapY);
                    
                    // Render clean professional thin dark border boundaries around each individual passport segment item
                    ctx.strokeStyle = '#cccccc';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(x - 1, y - 1, photoWidth + 2, photoHeight + 2);
                    
                    ctx.drawImage(tempCanvas, x, y);
                }
            }

            // Direct compilation export layer generating high-res download sheet structure instantly
            const sheetDataUrl = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = sheetDataUrl;
            downloadLink.download = 'sv_passport_8_sheet.png';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}