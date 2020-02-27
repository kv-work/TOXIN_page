import 'paginationjs/dist/pagination.min'
import "paginationjs/dist/pagination.css";
import './pagination.scss';

class Pagination {
  constructor(node, options) {
    this.$node = $(node);
    this.$pagination = this.$node.find('.js-pagination')
    this.options = options

    this._init()
  }

  _init() {
    const { $pagination, options } = this;

    $pagination.pagination(options)
  }
}

const pagination = $('.pagination_block').each( function() {
  const options = {
    dataSource: function(done){
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


