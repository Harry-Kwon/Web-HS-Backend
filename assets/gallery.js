var cardRenderQueue = [];
var cardRequest = null;

function clearRenderQueue() {
  window.stop();
  /*
  cardRenderQueue.forEach((id)=>{
    clearTimeout(id);
  });
  cardRenderQueue=[];
  console.log(cardRequest);
  try {
    cardRequest.abort();
    console.log('aborted request');
  } catch (err) {}
  */
}

function renderCard(image) {
  $('#card-container').append('<img class="lazy" src="debug.png" data-src=\"'+image+'\">');
}

function reloadCards(data) {
  $('#card-container').empty('#');
  var cardData = data.cards;
  cardData.forEach((c)=>{
    renderCard(c.image);
//    setTimeout(()=>{renderCard(c.image)},0);
  });
  lazyLoadImages();
}

function resetCards() {
  var datastring = $('form').serialize();
  cardRequest = $.ajax({
    type: "GET",
    url: "/card",
    data: datastring,
    success: function(data) {
      console.log(data);
      history.pushState({}, '', '/gallery?'+datastring);
      reloadCards(data);
    }
  });
  return false;
}

var loaded=0;


function lazyLoadImages() {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if(entry.isIntersecting) {
          let lazyImage = entry.target;
          console.log(lazyImage.src);
          console.log(lazyImage.dataset);
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove("lazy");
          console.log(++loaded);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    console.log("no IntersectionObserver");
  }
}

document.addEventListener("DOMContentLoaded", function() {
  $('form').on('submit', resetCards);

  let changeTimer = false;
  $('.card-search-input').on('keyup', (e) => {
    if(changeTimer !== false) { clearTimeout(changeTimer);}
    changeTimer = setTimeout(() => {
      resetCards();
      changeTimer=false;
    }, 0);
  });

});
