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
  const file = e.target.files[0];
  uploadImg.addEventListener("load", () => {
    console.log(uploadImg);
    widthInput.value = uploadImg.naturalWidth;
    heightInput.value = uploadImg.naturalHeight;
    ogRatioAspect = widthInput.value / heightInput.value;
    uploadDiv.classList.add("active");
    document.querySelector(".wrapper").classList.add("active");
  });
  uploadImg.src = `images/${file.name}`;
};

uploadDiv.addEventListener("click", () => uploadFile.click());
uploadFile.addEventListener("change", loadFile);

// Function for Resize Image

const resizeImg = (e) => {
  if (!uploadDiv.classList.contains("active")) return;
  console.log(e.target);
  const { id, value } = e.target;

  // Control Ratio

  if (ratioInput.checked) {
    if (id === "width") heightInput.value = widthInput.value / ogRatioAspect;
    else widthInput.value = heightInput.value * ogRatioAspect;
  }
};
widthInput.addEventListener("keyup", resizeImg);
heightInput.addEventListener("keyup", resizeImg);

downloadBtn.addEventListener("click", resizeAndDownload);

function resizeAndDownload() {
  //   console.log(uploadDiv.classList.contains("active"));
  if (!uploadDiv.classList.contains("active")) return;
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
