'use strict'

let gWikiApi

let gWikiData

getFromWiki()

function getFromWiki() {
  if (loadFromStorage(`${gSearch}Wiki`)) {
    gWikiData = loadFromStorage(`${gSearch}Wiki`)
    console.log(gWikiData)
    return
  }

  gWikiApi = `https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&
srsearch=${gSearch}&format=json`

  return axios.get(gWikiApi).then((res) => {
    const data = res.data.query.search[0]
    const wikiValue = {
      title: data.title,
      description: data.snippet,
    }
    gWikiData = wikiValue
    saveToStorage(`${gSearch}Wiki`, wikiValue)
  })
}

function saveDefaultValue() {
  if (!loadFromStorage(`narutoWiki`)) {
    gWikiApi = `https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&
srsearch=naruto&format=json`

    return axios.get(gWikiApi).then((res) => {
      const data = res.data.query.search[0]
      const wikiValue = {
        title: data.title,
        description: data.snippet,
      }
      gWikiData = wikiValue
      saveToStorage(`${gSearch}Wiki`, wikiValue)
    })
  }
}
