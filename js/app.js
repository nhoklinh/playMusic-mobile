const carousel = [...document.querySelectorAll('.carousel img')]
let carouselLImageIndex = 0
const changeCarousel = () => {
    carousel[carouselLImageIndex].classList.toggle('active')
    if(carouselLImageIndex >= carousel.length - 1){
        carouselLImageIndex = 0
    }else{
        carouselLImageIndex++
    }
    carousel[carouselLImageIndex].classList.toggle('active')
}

setInterval(() => {
    changeCarousel();
}, 3000);

const musicPlayer = document.querySelector('.music-play')
let clickCount = 1
musicPlayer.addEventListener('click', () => {
    if(clickCount >= 2){
        musicPlayer.classList.add('active')
        clickCount = 1
        return
    }
    clickCount++
    setTimeout(() => {
        clickCount = 1
    }, 250)
})

const backToHomeBtn = document.querySelector('.music-play .back-btn')
backToHomeBtn.addEventListener('click', () => {
    musicPlayer.classList.remove('active')
})

const playList = document.querySelector('.playlist')
const navBtn = document.querySelector('.music-play .nav-btn')
navBtn.addEventListener('click', () => {
    playList.classList.add('active')
})

const backTomusic = document.querySelector('.playlist .back-btn')
backTomusic.addEventListener('click', () => {
    playList.classList.remove('active')
})

///////////// MUSIC

let currentMusic = 0
const music = document.querySelector('#audio-source')
const seekBar = document.querySelector('.music-seek-bar')
const songName = document.querySelector('.current-song-name')
const artistName = document.querySelector('.artist-name')
const coverImage = document.querySelector('.cover')
const currentMusicTime = document.querySelector('.current-time')
const musicDuration = document.querySelector('.duration')

const queue = [...document.querySelectorAll('.queue')]

const forwardBtn = document.querySelector('i.fa-step-forward')
const backwardBtn = document.querySelector('i.fa-step-backward')
const playBtn = document.querySelector('i.fa-play-circle')
const pauseBtn = document.querySelector('i.fa-pause-circle')
const repeatBtn = document.querySelector('span.fa-redo')
const volumeBtn = document.querySelector('span.fa-volume-up')
const volumeSlider = document.querySelector('.volume-slider')

playBtn.addEventListener('click', () => {
    music.play()
    playBtn.classList.remove('active')
    pauseBtn.classList.add('active')
})

pauseBtn.addEventListener('click', () => {
    music.pause()
    pauseBtn.classList.remove('active')
    playBtn.classList.add('active')
})

const setMusic = (i) => {
    seekBar.value = 0
    let song = songs[i]
    currentMusic = i
    music.src = song.path
    songName.innerHTML = song.name
    artistName.innerHTML = song.artist
    coverImage.src = song.cover

    setTimeout(() => {
        seekBar.max = music.duration
        musicDuration.innerHTML = formatTime(music.duration)
    }, 300);
    currentMusicTime.innerHTML = '00 : 00'
    queue.forEach(iteam => iteam.classList.remove('active'))
    queue[currentMusic].classList.add('active')
}

setMusic(0);


const formatTime = (time) => {
    let min = Math.floor(time / 60)
    if(min < 10){
        min = `0` + min
    }
    let sec = Math.floor(time % 60)
    if(sec < 10){
        sec = `0` + sec
    }
    return `${min} : ${sec}`
}

setInterval(() => {
    seekBar.value = music.currentTime
    currentMusicTime.innerHTML = formatTime(music.currentTime)
    if(Math.floor(music.currentTime) == Math.floor(seekBar.max)){
        if(repeatBtn.className.includes('active')){
            setMusic(currentMusic)
            playBtn.click()
        }else{
            forwardBtn.click()
        }
    }
}, 500)

seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value
})

forwardBtn.addEventListener('click', () => {
    if(currentMusic >= songs.length - 1){
        currentMusic = 0
    }else{
        currentMusic++
    }
    setMusic(currentMusic)
    playBtn.click()
})

backwardBtn.addEventListener('click', () => {
    if(currentMusic <= 0){
        currentMusic = songs.length - 1
    }else{
        currentMusic--
    }
    setMusic(currentMusic)
    playBtn.click()
})

repeatBtn.addEventListener('click', () => {
    repeatBtn.classList.toggle('active')
})

volumeBtn.addEventListener('click', () => {
    volumeBtn.classList.toggle('active')
    volumeSlider.classList.toggle('active')
})

volumeSlider.addEventListener('input', () => {
    music.volume = volumeSlider.value
})

queue.forEach((iteam, i) => {
    iteam.addEventListener('click', () => {
        setMusic(i)
        playBtn.click()
    })
})