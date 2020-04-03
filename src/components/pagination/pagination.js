import 'paginationjs/dist/pagination.min'
import "paginationjs/dist/pagination.css";
import './pagination.scss';
import RoomCard from '../room-card/room-card';

class Pagination {
  constructor(node, options) {
    this.$node = $(node);
    this.$pagination = this.$node.find('.js-pagination');
    this.data = this.$node.data().rooms

    if (this.data.length === 0) {
      this.options = options
    } else {
      this.options = {
        ...options,
        dataSource: this.data,
        callback: function(data, pagination) {
          var html = RoomCard.template(data);
          $('#data-container').html(html);
        }
      }
    }

    
    

    this._init()
  }

  _init() {
    const { $pagination, options } = this;

    $pagination.pagination(options)
  }
}

const pagination = $('.pagination_block').each( function() {
  const options = {
    dataSource: function(done) {
      const numberOfPages = $('.js-pagination')[0].dataset.pages;
      let result = [];
      for (var i = 1; i <= numberOfPages; i++) {
          result.push(i);
      }
      done(result);
    },
    pageSize: 1,
    pageRange: 1,
    autoHidePrevious: true,
    autoHideNext: true
  }

  const pagination = new Pagination(this, options)
} )


