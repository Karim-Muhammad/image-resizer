const uploadDiv = document.querySelector(".upload-pic");
const uploadFile = document.querySelector("input[type=file]");
const previewImg = document.querySelector(".preview-img img");

// Controll inputs
const widthInput = document.querySelector("#width");
const heightInput = document.querySelector("#height");

uploadDiv.addEventListener("click", () => uploadFile.click());
previewImg.addEventListener("click", () => uploadFile.click());
// console.log(uploadFile.files);
const loadFile = (e) => {
  const file = e.target.files[0];
  console.log(file);
  uploadDiv.remove();
  previewImg.src = `images/${file.name}`;
};

uploadFile.addEventListener("change", loadFile);

// control resize
const resizeImg = (e) => {
  previewImg[e.target.id] = e.target.value;
};
widthInput.addEventListener("change", resizeImg);
heightInput.addEventListener("change", resizeImg);
