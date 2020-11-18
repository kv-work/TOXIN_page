import $ from 'jquery';

class RoomSearchCard {
  constructor(node) {
    this.$form = $(node);

    this.$datepickerBlock = this.$form.find('.datepicker-block');
    this.$dropdownBlock = this.$form.find('.js-form_dropdown');

    this._init();
  }

  _init() {
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    const { $form, _submitForm } = this;

    $form.on('submit', _submitForm.bind(this));
  }

  _submitForm(event) {
    event.preventDefault();

    const { $form, $dropdownBlock } = this;
    const { action } = event.target;

    const formData = new FormData($form[0]);
    const dropdownData = $dropdownBlock.data().items;

    const keysArr = Object.keys(dropdownData);
    keysArr.forEach((key) => {
      formData.set(key, dropdownData[key]);
    });

    let requestString = '?';
    formData.forEach((value, key) => {
      requestString += `${key}=${value}&`;
    });

    const encodeString = encodeURI(requestString.slice(0, -1));

    document.location.href = action + encodeString;
  }
}

$('.js-room_search_card').each(function addRoomSearchCard() {
  const roomSearchCard = new RoomSearchCard(this);

  return roomSearchCard;
});
