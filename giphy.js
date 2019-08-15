console.log('hello world')

var searchBtn = document.querySelector('.search-form button')
var searchItem = document.querySelector('.search-form input')
var searchResults = document.querySelector('.search-results')
var loadMoreBtn = document.querySelector('.load-more')
var offset = 0
var getMoreGifs = false
var scrollCounter = 0
var nearToBottom = 100

var partyMode = function(event) {
  event.target.previousElementSibling.classList.toggle('party')
}

var loadGifs = function(){
  var options = {
    url: `https://api.giphy.com/v1/gifs/search?api_key=b4YYiIXo0orHoVhNYw6af3ObVZJ7w0WQ&q=${searchItem.value}&limit=10&offset=${offset}&rating=PG-13&lang=en`
  }

  $.ajax(options).done(function(resp){
    var results = resp.data
    results.forEach(function(result){
      var gifResult = document.createElement('img')
      var partyBtn = document.createElement('button')
      partyBtn.textContent = 'PARTY MODE'
      partyBtn.classList.add('party-button')
      gifResult.src = result.images.original.url
      searchResults.appendChild(gifResult)
      searchResults.appendChild(partyBtn)
      partyBtn.addEventListener('click', partyMode)
    })
    offset += 10
    getMoreGifs = false
  })
}

var searchGiphy = function(event){
  event.preventDefault()
  searchResults.textContent = ""
  scrollCounter = 0
  loadGifs()
}

var checkScroll = function() {
  if ($(window).scrollTop() + $(window).height() >
    $(document).height() - nearToBottom && getMoreGifs === false){
      if (scrollCounter < 5) {
        getMoreGifs = true
        scrollCounter += 1
        loadGifs()
      } else {
        window.removeEventListener('scroll', checkScroll)
        loadMoreBtn.style.display = 'block'
      }
  }
}

searchBtn.addEventListener('click', searchGiphy)

window.addEventListener('scroll', checkScroll)

loadMoreBtn.addEventListener('click', loadGifs)
