const temperatureInput = document.querySelector('#temperature');
const output = document.querySelector('output[for="temperature"]');
const imageInput = document.getElementById('imageInput');
const previewDiv = document.querySelector('#preview');
const canvasPreview = document.getElementById('canvasPreview');

// setting the output number
temperatureInput.addEventListener('input', () => {
    output.textContent = temperatureInput.value;
});

// loading the image on the preview
imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            previewDiv.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    }
    enableElements();

});

// changing the image hue on temperatureInput change
temperatureInput.addEventListener('change', (e) => {
    updatePreviewImage();
});

// downloading the file
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const img = previewDiv.querySelector('img');
    const ctx = canvasPreview.getContext('2d');
    canvasPreview.width = img.naturalWidth;
    canvasPreview.height = img.naturalHeight;
    ctx.filter = img.style.filter;
    ctx.drawImage(img, 0, 0);

    const link = document.createElement('a');
    link.download = 'filtered_image.jpeg';
    link.href = canvasPreview.toDataURL('image/jpeg');
    link.click();
});

// function of update preview image
function updatePreviewImage() {
    const img = previewDiv.querySelector('img');
    const temperature = parseFloat(temperatureInput.value) || 0;
    
    img.style.filter = `hue-rotate(${temperature}deg)`;
}

// Function of enable button and input
function enableElements() {
    temperatureInput.disabled = false;
    submitBtn.disabled = false;
}




