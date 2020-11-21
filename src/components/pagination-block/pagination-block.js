import $ from 'jquery';
import 'paginationjs/dist/pagination.min';
import RoomCard from '../room-card/room-card';

class Pagination {
  constructor(node, options) {
    this.$node = $(node);
    this.$pagination = this.$node.find('.js-pagination');
    this.$description = this.$node.find('.pagination-block__description');
    this.data = this.$node.data().rooms;
    this.numOfPages = this.$pagination.data().pages;
    this.pageSize = 12;
    this.createdData = Pagination._createData(this.data, this.numOfPages);

    if (this.data.length === 0) {
      this.options = options;
    } else {
      this.options = {
        ...options,
        dataSource: this.createdData,
        pageSize: this.pageSize,
        beforePaging: (page) => this._displayDescription(page),
        callback: (data) => Pagination._createContent(data),
      };
    }

    this._init();
  }

  _init() {
    const { $pagination, options } = this;
    $pagination.pagination(options);
  }

  static _createData(data, totalPages) {
    const newData = [...data];

    for (let i = 1; i < totalPages; i += 1) {
      const shuffledData = Pagination._shuffle(data);
      shuffledData.forEach((elem) => newData.push(elem));
    }

    return newData;
  }

  _displayDescription(page) {
    const { $description, pageSize, createdData } = this;

    const totalItems = createdData.length > 100 ? '100+' : createdData.length;
    const displayItemsStart = pageSize * (page - 1) + 1;

    let displayItemsEnd;
    if ((pageSize * page) > createdData.length) {
      displayItemsEnd = totalItems.length;
    } else {
      displayItemsEnd = pageSize * page;
    }

    const displayItems = `${displayItemsStart} - ${displayItemsEnd}`;
    const descriptionString = `${displayItems} из ${totalItems} вариантов аренды`;

    $description.html(descriptionString);
  }

  static _shuffle(arr) {
    let j;
    let temp;
    const tempArr = arr;

    for (let i = arr.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      tempArr[j] = arr[i];
      tempArr[i] = temp;
    }

    return tempArr;
  }

  static _createContent(data) {
    const cards = data.map((number) => RoomCard.template(number));

    let html = '';

    cards.forEach((card) => {
      html += card;
    });

    // eslint-disable-next-line fsd/jq-cache-dom-elements
    $('#data-container').html(html);

    $('#data-container').find('.js-room_card').each(function createNewRommCard() {
      const roomCard = new RoomCard(this);

      return roomCard;
    });
  }
}

$('.js-pagination-block').each(function createPagination() {
  const options = {
    dataSource: (done) => {
      const numberOfPages = $('.js-pagination')[0].dataset.pages;
      const result = [];
      for (let i = 1; i <= numberOfPages; i += 1) {
        result.push(i);
      }
      done(result);
    },
    pageSize: 1,
    pageRange: 1,
    autoHidePrevious: true,
    autoHideNext: true,
  };

  const pagination = new Pagination(this, options);

  return pagination;
});
