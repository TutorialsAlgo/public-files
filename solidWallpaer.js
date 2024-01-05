(() => {
  const colorPicker = document.getElementById("colorPicker");
  const colorInput = document.getElementById("colorInput");
  const widthInput = document.getElementById("widthInput");
  const heightInput = document.getElementById("heightInput");
  const generateButton = document.getElementById("generateButton");
  const colorPrev = document.querySelector(".colorPrev");

  let generateState = 0;

  function rgbToHex(r, g, b) {
    const clamp = (value) => Math.min(255, Math.max(0, value));
    r = clamp(r);
    g = clamp(g);
    b = clamp(b);
    return `#${((1 << 24) | (r << 16) | (g << 8) | b)
      .toString(16)
      .slice(1)}`;
  }

  function getColorValues(colorName) {
    const colorElement = document.getElementById("colorElement");
    colorElement.style.color = colorName;

    const computedStyle = window.getComputedStyle(colorElement);
    const rgbValues = computedStyle.color.match(/\d+/g);

    if (rgbValues) {
      const [r, g, b] = rgbValues.map(Number);
      // console.log(`RGB values for ${colorName}: ${r}, ${g}, ${b}`);
      return rgbToHex(r, g, b);
    } else {
      console.error(`Unable to retrieve RGB values for ${colorName}`);
      return null;
    }
  }

  // Example usage
  document.getElementById("colorInput").addEventListener("input", () => {
    const redHex = getColorValues(
      document.getElementById("colorInput").value
    );
    colorPicker.value = redHex;
  });

  // Event listener for changes in the color picker
  colorPicker.addEventListener("change", () => {
    console.log(colorPicker.value);
  });

  function Download() {
    const canvas = document.createElement("canvas");
    const width = parseInt(widthInput.value) || 1920;
    const height = parseInt(heightInput.value) || 1080;
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");

    context.fillStyle = colorPicker.value;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const dataURL = canvas.toDataURL("image/png");

    const randomNumber = Math.floor(Math.random() * 1000000);
    const filename = "solid_color_wallpaper_" + randomNumber + ".png";

    const downloadLink = document.createElement("a");
    downloadLink.href = dataURL;
    downloadLink.download = filename;
    downloadLink.click();
  }

  function buttonNameChange() {
    if (generateState === 0) {
      colorPrev.style.backgroundColor = colorPicker.value;
      generateButton.textContent = "Download";
      generateButton.classList.add("downloaded");
      generateState = 1;
    } else {
      Download();
      generateButton.textContent = "Generate Wallpaper";
      generateButton.classList.remove("downloaded");
      generateState = 0;
    }
  }

  generateButton.addEventListener("click", buttonNameChange);
  colorInput.addEventListener("input", () => {
    generateButton.textContent = "Generate Wallpaper";
    generateButton.classList.remove("downloaded");
    generateState = 0;
  });
  colorPicker.addEventListener("input", () => {
    colorInput.value = "";
    generateButton.textContent = "Generate Wallpaper";
    generateButton.classList.remove("downloaded");
    generateState = 0;
  });

  colorInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && colorInput.value.length > 0) {
      e.preventDefault();
      generateButton.click();
      colorInput.blur();
    }
  });
})();