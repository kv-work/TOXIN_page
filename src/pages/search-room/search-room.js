import './search-room.scss';
import $ from 'jquery';

class SearchRoomContent {
  constructor(node) {
    this.$content = $(node);
    this.$toggler = this.$content.find('.search_room__filter_toggler');
    this.$filters = this.$content.find('.search_room__filters_block');
    this.$rooms = this.$content.find('.search_room__rooms_block');
    this.$roomCards = this.$rooms.find('#data-container');

    this.$datepicker = this.$filters.find('.js-form_datepicker');
    this.$dropdown = this.$filters.find('.js-form_dropdown');

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
      .replace('?','')
      .split('&')
      .reduce( (prev,elem) => {
        const arr = elem.split('=');
        prev[ decodeURIComponent(arr[0])] = decodeURIComponent(arr[1]);
        return prev;
      }, {});
  }

  _setDropdownData() {
    const { $dropdown, data } = this;
    const total = parseInt(data['item-1'], 10)+parseInt(data['item-2'], 10)+parseInt(data['item-3'], 10);

    $dropdown.data({
      "items": {
        "item-1": data['item-1'],
        "item-2": data['item-2'],
        "item-3": data['item-3']
      },
      total: total
    })

    const $dropdownOptions = $dropdown.find('.iqdropdown-menu-option')

    $dropdownOptions.each( function(idx) {
      const elemData = $(this).data()
      $(this).data('defaultcount', data[elemData.id])
    } )
  }

  _submitForm(event) {
    event.preventDefault();
  }

  _selectRoom(event) {

    const targetClasses = event.target.classList;
    
    if ( !( targetClasses.contains('room_card__control_prev') ||
            targetClasses.contains('room_card__control_next') ||
            targetClasses.contains('room_card__indicators') ||
            targetClasses.contains('room_card__control_icon') ||
            targetClasses.contains('indicator') ) ) {

      const action = './room-details.html';
      const selectedRoom = $(event.target).closest('.room_card').data();

      const formData = this._getFormData();

      formData.append('room', selectedRoom.number);

      let requestString = '?';
      formData.forEach((value, key) => {
        requestString += `${key}=${value}&`
      });

      const encodeString = encodeURI(requestString.slice(0, -1))

      document.location.href = action + encodeString
    }
  }

  _getFormData() {
    const {$filters, $dropdown} = this;

    const formData = new FormData($filters[0]);
    const dropdownData = $dropdown.data().items;

    for (let key in dropdownData) {
      formData.set(key, dropdownData[key])
    }

    return formData;
  }

  _attachEventHandlers() {
    const {$toggler, $filters, $roomCards} = this;

    $toggler.click( () => {
      $toggler.toggleClass('opened');
      $filters.toggleClass('opened');
    } )

    $filters.submit( (e) => {
      this._submitForm(e);
    } )

    $roomCards.click( (e) => this._selectRoom(e) );
  }
}

$('.search_room__content').each( function() {
  new SearchRoomContent(this);
} )