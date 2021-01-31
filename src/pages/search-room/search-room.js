import $ from 'jquery';

class SearchRoomContent {
  constructor(node) {
    this.$content = $(node);
    this.$toggler = this.$content.find('.js-search-room__filter-toggler');
    this.$filters = this.$content.find('.js-search-room__filters-block');
    this.$rooms = this.$content.find('.js-search-room__rooms-block');
    this.$roomCards = this.$rooms.find('.js-pagination-block__data-container');

    this.$datepicker = this.$filters.find('.js-datepicker-block');
    this.$dropdown = this.$filters.find('.js-dropdown');

    this._init();
  }

  _init() {
    this._attachEventHandlers();
    this._getData();
    this._setDropdownData();
  }

  _getData() {
    this.data = window
      .location
      .search
      .replace('?', '')
      .split('&')
      .reduce((prev, elem) => {
        const arr = elem.split('=');
        const acc = { ...prev };
        acc[decodeURIComponent(arr[0])] = decodeURIComponent(arr[1]);
        return acc;
      }, {});
  }

  _setDropdownData() {
    const { $dropdown, data } = this;
    const total = parseInt(data['item-1'], 10) + parseInt(data['item-2'], 10) + parseInt(data['item-3'], 10);

    $dropdown.data({
      items: {
        'item-1': data['item-1'],
        'item-2': data['item-2'],
        'item-3': data['item-3'],
      },
      total,
    });

    const $dropdownOptions = $dropdown.find('.iqdropdown-menu-option');

    $dropdownOptions.each(function setDefaultCount() {
      const elemData = $(this).data();
      $(this).data('defaultcount', data[elemData.id]);
    });
  }

  _handleRoomCardsClick(event) {
    const targetClasses = event.target.classList;

    if (!(targetClasses.contains('room-card__control-prev')
          || targetClasses.contains('room-card__control-next')
          || targetClasses.contains('room-card__indicators')
          || targetClasses.contains('room-card__control-icon')
          || targetClasses.contains('room-card__indicator'))) {
      const action = './room-details.html';
      const selectedRoom = $(event.target).closest('.room-card').data();

      const formData = this._getFormData();

      formData.append('room', selectedRoom.number);

      let requestString = '?';
      formData.forEach((value, key) => {
        requestString += `${key}=${value}&`;
      });

      const encodeString = encodeURI(requestString.slice(0, -1));

      document.location.href = action + encodeString;
    }
  }

  _getFormData() {
    const { $filters, $dropdown } = this;

    const formData = new FormData($filters[0]);
    const dropdownData = $dropdown.data().items;

    const keysArr = Object.keys(dropdownData);
    keysArr.forEach((key) => {
      formData.set(key, dropdownData[key]);
    });

    return formData;
  }

  _attachEventHandlers() {
    const { $toggler, $filters, $roomCards } = this;

    $toggler.on('click.searchRoom', this._handleTogglerClick.bind(this));

    $filters.on('submit.searchRoom', this._handleSearchRoomSubmit);

    $roomCards.on('click.searchRoom', this._handleRoomCardsClick.bind(this));
  }

  _handleTogglerClick() {
    this.$toggler.toggleClass('opened');
    this.$filters.toggleClass('opened');
  }

  _handleSearchRoomSubmit(event) {
    event.preventDefault();
  }
}

$('.js-search-room__content').each(function addSearchRoomContent() {
  const searchRoomContent = new SearchRoomContent(this);

  return searchRoomContent;
});
