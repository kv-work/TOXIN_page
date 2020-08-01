import 'paginationjs/dist/pagination.min'
import "paginationjs/dist/pagination.css";
import './pagination.scss';
import RoomCard from '../room-card/room-card';

class Pagination {
  constructor(node, options) {
    this.$node = $(node);
    this.$pagination = this.$node.find('.js-pagination');
    this.$description = this.$node.find('.pagination_block__description');
    this.data = this.$node.data().rooms;
    this.numOfPages = this.$pagination.data().pages;
    this.pageSize = 12;
    this.createdData = this._createData(this.data, this.numOfPages);

    if (this.data.length === 0) {
      this.options = options
    } else {
      this.options = {
        ...options,
        dataSource: this.createdData,
        pageSize: this.pageSize,
        beforePaging: (page) => {
          this._displayDescription(page)
        },
        
        callback: (data) => this._createContent(data)
      }
    }

    this._init()
  }

  _init() {
    const { $pagination, options } = this;
    $pagination.pagination(options)
  }

  _createData(data, totalPages) {
    let newData = [...data];

    for (let i = 1; i < totalPages; i++) {
      const shuffledData = this._shuffle(data);
      shuffledData.forEach(elem => {
        newData.push(elem)
      })
    };

    return newData;
  }

  _shuffle(arr) {
    let j, temp;

    for (let i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random()*(i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }

    return arr;
  }

  _createContent(data) {
    const cards = data.map(number => {
      return RoomCard.template(number)
    })

    let html = "";

    cards.forEach( card => {
      html += card
    })

    $('#data-container').html(html);

    $('#data-container').find('.js_room_card').each(function() {
      new RoomCard(this);
    })
  }

  _displayDescription(page) {
    const {$description, pageSize, createdData} = this;

    const totalItems = createdData.length > 100 ? '100+' : createdData.length;
    const displayItemsStart = pageSize * (page - 1) + 1;
    const displayItemsEnd = (pageSize * page) > createdData.length ? totalItems.length : (pageSize * page);
    const displayItems = `${displayItemsStart} - ${displayItemsEnd}`;
    const descriptionString = `${displayItems} из ${totalItems} вариантов аренды`;

    $description.html(descriptionString);
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

