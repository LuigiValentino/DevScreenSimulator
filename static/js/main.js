document.getElementById('htmlCode').addEventListener('input', updateIframeContent);
document.getElementById('cssCode').addEventListener('input', updateIframeContent);
document.getElementById('jsCode').addEventListener('input', updateIframeContent);
const deviceButtons = document.querySelectorAll('.device-button');
const orientationButton = document.getElementById('orientationButton');
const zoomButton = document.getElementById('zoomButton');
let isLandscape = false;
let isZoomed = false;

function updateIframeContent() {
    const htmlCode = document.getElementById('htmlCode').value;
    const cssCode = document.getElementById('cssCode').value;
    const jsCode = document.getElementById('jsCode').value;
    const library = document.querySelector('input[name="library"]:checked').value;

    let libraryCDN = '';
    if (library === 'bootstrap') {
        libraryCDN = '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">';
    } else if (library === 'tailwind') {
        libraryCDN = '<script src="https://cdn.tailwindcss.com"></script>';
    } else if (library === 'materialize') {
        libraryCDN = '<link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" rel="stylesheet">';
    }

    const iframeContent = `
        <!DOCTYPE html>
        <html lang='en'>
        <head>
            ${libraryCDN}
            <style>
                ${cssCode}
            </style>
            <script>
                ${jsCode}
            </script>
        </head>
        <body>
            ${htmlCode}
        </body>
        </html>
    `;

    document.getElementById('deviceIframe').srcdoc = iframeContent;
}

deviceButtons.forEach(button => {
    button.addEventListener('click', function () {
        deviceButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        const width = this.getAttribute('data-width');
        const height = this.getAttribute('data-height');
        const deviceFrame = document.getElementById('deviceFrame');

        if (isLandscape) {
            deviceFrame.style.width = `${height}px`;
            deviceFrame.style.height = `${width}px`;
        } else {
            deviceFrame.style.width = `${width}px`;
            deviceFrame.style.height = `${height}px`;
        }

        deviceFrame.style.display = 'block';

        updateIframeContent();
    });
});

orientationButton.addEventListener('click', function () {
    const deviceFrame = document.getElementById('deviceFrame');
    const width = deviceFrame.style.width;
    const height = deviceFrame.style.height;
    deviceFrame.style.width = height;
    deviceFrame.style.height = width;

    isLandscape = !isLandscape;
    this.textContent = isLandscape ? 'Switch to Portrait' : 'Switch to Landscape';
});

zoomButton.addEventListener('click', function () {
    const deviceFrame = document.getElementById('deviceFrame');
    if (isZoomed) {
        deviceFrame.style.transform = 'scale(1)';
        this.textContent = 'Adjust to Screen';
    } else {
        deviceFrame.style.transform = 'scale(0.5)';
        this.textContent = 'Reset Zoom';
    }
    isZoomed = !isZoomed;
});

updateIframeContent();
