const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const vinyl = document.getElementById("vinyl");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");

const playlist = [
    {
        title: "Blue",
        artist: "Yung Kai",
        file: "blue.mp3.mp3"
    },
    {
        title: "Shape Of My Heart",
        artist: "Backstreet Boys",
        file: "shape.mp3.mp3"
    },
    {
        title: "Glue Song",
        artist: "beabadoobee",
        file: "glue.mp3.mp3"
    },
    {
        title: "My Love",
        artist: "Westlife",
        file: "mylove.mp3.mp3"
    }
];
let currentSong = 0;

function formatTime(seconds) {
    if (isNaN(seconds)) return "00:00";

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function loadSong(index) {
    const song = playlist[index];

    audio.src = song.file;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;

    audio.load();
}

function updatePlayButton(isPlaying) {
    playBtn.innerHTML = isPlaying
        ? '<i class="fa-solid fa-pause"></i>'
        : '<i class="fa-solid fa-play"></i>';
}

function nextSong() {
    currentSong = (currentSong + 1) % playlist.length;

    loadSong(currentSong);
    audio.play();
}

function prevSong() {

    currentSong--;

    if (currentSong < 0) {
        currentSong = playlist.length - 1;
    }

    loadSong(currentSong);
    audio.play();
}

loadSong(currentSong);

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

playBtn.addEventListener("click", () => {
    audio.paused ? audio.play() : audio.pause();
});

audio.addEventListener("loadedmetadata", () => {
    progress.max = audio.duration;
    duration.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    progress.value = audio.currentTime;
    currentTime.textContent = formatTime(audio.currentTime);
});

progress.addEventListener("input", () => {
    audio.currentTime = progress.value;
});

audio.addEventListener("play", () => {
    vinyl.classList.add("spin");
    updatePlayButton(true);
});

audio.addEventListener("pause", () => {
    vinyl.classList.remove("spin");
    updatePlayButton(false);
});

audio.addEventListener("ended", nextSong);