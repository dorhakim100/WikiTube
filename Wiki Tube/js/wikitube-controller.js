'use strict'

function init() {
  //   setLoader()
  renderDefault()
  saveDefaultValue()
  renderWiki()
}

function renderList() {
  const elVideosContainer = document.querySelector('.videos-container')

  let strHTMLs = gVideos
    .map(
      (video) => `
<li class="video-card">
<img class="list-img" onclick="onRenderVideo(this)" data-url="${video.urlCode}" src="${video.img}" alt="">
<h2 class="list-title" onclick="onRenderVideo(this)" data-url="${video.urlCode}">${video.title}</h2>

</li>

`
    )
    .join('')

  elVideosContainer.innerHTML = strHTMLs
}

function onSearch() {
  const elSearchBox = document.querySelector('.search-input')

  gSearch = elSearchBox.value
  setLoader()

  if (!loadFromStorage(gSearch)) {
    getVideos(gSearch).then(() => {
      createList(gSearch)
      renderList()
    })
    return
  }
  createList(gSearch)
  renderList()
  renderWiki()
}

function renderDefault() {
  createList(gSearch)
  renderList()
  setDefaultVideo()
}

function setDefaultVideo() {
  const elVideo = document.querySelector('.video')
  elVideo.src = gVideoUrl + gVideo

  const video = findVideo(gVideo)

  const elTextContainer = document.querySelector('.video-description')

  elTextContainer.innerHTML = `
    <div class="video-description">
        <h2>${video.title}</h2>
        <p>${video.description}</p>
   `
}

function renderPlayer(el) {
  console.log('el:', el.dataset.url)
  const elVideo = document.querySelector('.video')
  gVideo = el.dataset.url
  elVideo.src = gVideoUrl + gVideo
}

function onRenderVideo(elVideo) {
  setLoader()
  window.scrollTo(0, 0)
  const url = elVideo.dataset.url
  const video = findVideo(url)
  renderPlayer(elVideo)
  const elTextContainer = document.querySelector('.video-description')

  elTextContainer.innerHTML = `
    <div class="video-description">
        <h2>${video.title}</h2>
        <p>${video.description}</p>
   `
}

function setLoader() {
  const elLoader = document.querySelector('.loader')
  const elScreen = document.querySelector('.backdrop')

  elLoader.classList.remove('hidden')
  elScreen.classList.remove('hidden')
  setTimeout(() => {
    elLoader.classList.add('hidden')
    elScreen.classList.add('hidden')
  }, 500)
}

function renderWiki() {
  if (!loadFromStorage(`${gSearch}Wiki`)) {
    getFromWiki().then(() => {
      setWikiHTMLs()
      return
    })
  }
  getFromWiki()
  setWikiHTMLs()
}

function setWikiHTMLs() {
  const elWikiValue = document.querySelector('.wiki-value')
  elWikiValue.querySelector(
    'h2'
  ).innerHTML = `<i class="fa-brands fa-wikipedia-w" style="padding: 5px;"></i>${gWikiData.title}`

  elWikiValue.querySelector('p').innerHTML = gWikiData.description
}
