class Masonry {
  constructor(container, items){
    this.container = container;
    this.masonryItems = [];
    this.columns = 0;
    this.colHeights = [];
    this.itemHeights = {};
    this.colWidth = 0;
    this.masonryWidth = 0;
    this.layoutPositions = {};
    $(window).resize(this.redoMasonry.bind(this));
    this.appendItems(items);
  }
  appendItems(items) {
    items.forEach( item => {
      const masonryItem = $('<div id="masonry-item-'+this.masonryItems.length+'" class="masonry-item invisible"></div>');
      $(item).appendTo(masonryItem);
      this.masonryItems.push(masonryItem);
      this.itemHeights[$(masonryItem).attr('id')]=$(masonryItem).appendTo(this.container).outerHeight();
    });
    this.colWidth = $(this.masonryItems[0]).outerWidth(true);
    this.masonry()
  }
  masonry() {
    $(this.container).innerWidth('100%');
    this.columns = Math.floor($(this.container).innerWidth()/this.colWidth) || 1;

    $(this.container).innerWidth(this.columns*this.colWidth);
    this.colHeights = [];
    for(let i=0;i<this.columns;i++){
      this.colHeights[i] = 0;
    }
    this.masonryItems.forEach( item => {
      const colIndex = this.colHeights.indexOf(Math.min.apply(this, this.colHeights));
      const absLeft = colIndex * this.colWidth;
      this.layoutPositions[$(item).attr('id')] = {
        left: absLeft,
        top: this.colHeights[colIndex]
      }
      this.colHeights[colIndex] += this.itemHeights[$(item).attr('id')];
    });
    this.redoLayout();
  }
  redoLayout() {
    for(const id in this.layoutPositions) {
      $('#'+id)
        .css('position','absolute')
        .css('left',this.layoutPositions[id].left)
        .css('top', this.layoutPositions[id].top)
        .removeClass('invisible');
    }
  }
  redoMasonry() {
    const masonryContainerOW = $(this.container).outerWidth(true);
    const columns = Math.floor(masonryContainerOW/this.colWidth);
    if(this.columns !== columns) this.masonry();
  }
}
