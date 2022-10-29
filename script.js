const uploadDiv = document.querySelector(".upload-pic");
const uploadImg = document.querySelector(".upload-pic img");
const uploadFile = document.querySelector("input[type=file]");

// Controll inputs
const widthInput = document.querySelector("#width");
const heightInput = document.querySelector("#height");

// ratio & Quality
const ratioInput = document.querySelector(".aspect input");
const qualityInput = document.querySelector(".quality input");

let ogRatioAspect;

// Download Image Button
const downloadBtn = document.querySelector(".download-btn");
// Function for Load File

const loadFile = (e) => {
  const file = e.target.files[0]; // get file value of input
  uploadImg.addEventListener("load", () => { // after image is loaded
    console.log(uploadImg);
    widthInput.value = uploadImg.naturalWidth; // get naturalWidth and put it in width input, and as well like height input
    heightInput.value = uploadImg.naturalHeight;
    ogRatioAspect = widthInput.value / heightInput.value; // get the relation between (height, width) "radtio aspect of image"
    uploadDiv.classList.add("active"); // make uploadDiv "active" to remove some structure which was for "upload" not for "preview"
    document.querySelector(".wrapper").classList.add("active"); // make parent "wrapper" active as well, to change height
  });
  uploadImg.src = `images/${file.name}`;
};

uploadDiv.addEventListener("click", () => uploadFile.click()); // when i click on "div", i do clicking on "file input"
uploadFile.addEventListener("change", loadFile); // when i choose file(change value of input) do event "loadFile"

// Function for Resize Image

const resizeImg = (e) => {
  // see if upload is active (which means there is image is previewed already) so do resize, otherwise Don't Resize anything.
  if (!uploadDiv.classList.contains("active")) return;
  console.log(e.target);
  const { id, value } = e.target;

  // Control Ratio

  // if 'ratio input' is checked do relate between width and height to be consistent
  if (ratioInput.checked) {
    if (id === "width") heightInput.value = widthInput.value / ogRatioAspect;
    else widthInput.value = heightInput.value * ogRatioAspect;
  }
  
  // otherwise (no checked) so only change current input only, no another
};
widthInput.addEventListener("keyup", resizeImg);
heightInput.addEventListener("keyup", resizeImg);

downloadBtn.addEventListener("click", resizeAndDownload);

function resizeAndDownload() {
  //   console.log(uploadDiv.classList.contains("active"));
  
  // if there is image already ok download is allowed, if there is not? not allowed
  if (!uploadDiv.classList.contains("active")) return;
  
  // see if there is "canvas" element or not(null), i have to use '?' to avoid using method for nothing(null) which will throw an error(TypeError)
  document.querySelector("canvas")?.remove();
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const a = document.createElement("a");
  const quality = qualityInput.checked ? 0.5 : 1.0;

  canvas.width = widthInput.value;
  canvas.height = heightInput.value;

  ctx.drawImage(uploadImg, 0, 0, canvas.width, canvas.height);
  a.href = canvas.toDataURL("image/jpeg", quality);
  //   canvas.href = a.href;
  console.log(a.href);
  // name of download file
  a.download = new Date().getTime();
  //   a.download = uploadImg.src;
  a.click();

  document.body.append(canvas);
}
