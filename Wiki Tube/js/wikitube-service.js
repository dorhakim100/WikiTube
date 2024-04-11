'use strict'

const apiUrl = 'AIzaSyD6_dPEXi9GqT4WJ4FDa0Qme3uUzYOIwfU'

let gUrl

let url = 'https://www.googleapis.com/youtube/v3/channels'
let gSearch = 'naruto'

let gVideos
let gVideoUrl = 'https://www.youtube.com/embed/'
let gVideo = 'WBzshiqH1t8'

// getVideos(gSearch)

// createList(gSearch)

function getVideos(search) {
  if (loadFromStorage(search)) {
    console.log('works')

    return createList(search)
  }
  gUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet
    &videoEmbeddable=true&type=video&key=${apiUrl}&q=${search}`

  return axios.get(gUrl).then((res) => {
    console.log('res:', res.data)
    saveToStorage(`${search}`, res.data)
  })
}

function createList(search) {
  let videos
  const list = []
  if (!loadFromStorage(search)) {
    getVideos(search).then(() => {
      for (var i = 0; i < videos.length; i++) {
        list[i] = createVideo(videos[i])
      }

      gVideos = list
      console.log(list)
      return list
    })
  }
  videos = loadFromStorage(search).items
  console.log(videos)
  for (var i = 0; i < videos.length; i++) {
    list[i] = createVideo(videos[i])
  }

  gVideos = list
  //   console.log(list)
  return list
  //   console.log(videos)
}

function createVideo(video) {
  const videoItem = {
    img: video.snippet.thumbnails.default.url,
    title: video.snippet.title,
    description: video.snippet.description,
    urlCode: video.id.videoId,
  }
  //   console.log(videoItem)
  return videoItem
}

function findVideo(url) {
  return gVideos.find((video) => video.urlCode === url)
}
