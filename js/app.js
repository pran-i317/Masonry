const masonryContainer = document.querySelector('#masonry');
let items = [];
for (let i=0;i<50;i++){
  const item = $('<div id="masonry-item-'+i+'" class="masonry-item invisible" style="height:'+Math.floor((Math.random() * 200) + 125)+'px"></div>');
  items.push(item);
}

function masonry(action, items){
  var heights = {};
  items.forEach( item => {
    heights[$(item).attr('id')]=$(item).appendTo(masonryContainer).outerHeight();
  });
  console.log(heights);
  var columns = Math.floor($(masonryContainer).innerWidth()/$(items[0]).outerWidth(true));

  $(masonryContainer).innerWidth(columns*$(items[0]).outerWidth(true));
  var left=0
  items.forEach( item => {
      $(item).css('position','absolute').css('left',(left%990)).removeClass('invisible');
      left+=330;
  });
}
function getHeights() {
  var heights=[];
  for(var i=0;i<columns;i++){

  }
}
masonry(null, items);
