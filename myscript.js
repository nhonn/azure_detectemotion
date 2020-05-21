const { dialog } = require("electron").remote;
const getEmotion = require("./facedetection");

const emotions = {
  HAPPINESS: "./assets/audio/Happy.mp3",
  SAD: "./assets/audio/Rick And Morty - Evil Morty Theme Song Trap Remix.mp3",
  NEUTRAL: "./assets/audio/Dream Away.mp3",
  ANGER: "./assets/audio/Max Brhon - Cyberpunk [NCS Release].mp3",
  FEAR: "./assets/audio/The_Ghost - Niviro.mp3",
};

async function openDialog() {
  clear();
  const res = await dialog.showOpenDialog({
    properties: ["openFile", "multiSelections"],
    filters: [{ name: "Images", extensions: ["jpg", "png"] }],
  });
  const element = document.getElementsByTagName("img")[0];
  element.setAttribute("src", res.filePaths);
  element.removeAttribute("hidden");
  const emotion = await getEmotion(res.filePaths[0]);
  const p = document.getElementsByTagName("p")[0];
  p.innerHTML = emotion;
  playMusic(emotion);
}

function clear() {
  const element = document.getElementsByTagName("audio")[0];
  element.setAttribute("src", "");
  element.removeAttribute("autoplay");
  const p = document.getElementsByTagName("p")[0];
  p.innerHTML = "";
}

function playMusic(emotion) {
  const element = document.getElementsByTagName("audio")[0];
  switch (emotion) {
    case "happiness":
      element.setAttribute("src", emotions.HAPPINESS);
      break;
    case "anger":
      element.setAttribute("src", emotions.ANGER);
      break;
    case "sadness":
      element.setAttribute("src", emotions.SAD);
      break;
    case "fear":
      element.setAttribute("src", emotions.FEAR);
      break;
    default:
      element.setAttribute("src", emotions.NEUTRAL);
      break;
  }
  element.setAttribute("autoplay", "");
}
