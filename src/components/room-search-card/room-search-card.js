import './room-search-card.scss';

class RoomSearchCard {
  constructor(node) {
    this.$form = $(node);

    this.$datepickerBlock = this.$form.find('.form_datepicker');
    this.$dropdownBlock = this.$form.find('.js_form_dropdown');

    this._init();
  };

  _init() {
    this._attachEventHandlers()
  };

  _attachEventHandlers() {
    const { $form, _submitForm } = this;

    this.$form.submit( (e) => {
      this._submitForm(e)
    } )
  };

  _submitForm(event) {
    event.preventDefault();

    const { $form, $dropdownBlock } = this;
    const action = event.target.action;

    const formData = new FormData($form[0]);
    const dropdownData = $dropdownBlock.data().items;

    for (let key in dropdownData) {
      formData.set(key, dropdownData[key])
    }

    let requestString = '?';
		formData.forEach((value, key) => {
      requestString += `${key}=${value}&`
    });

    const encodeString = encodeURI(requestString.slice(0, -1))
    
    document.location.href = action + encodeString
  };
};

$('.room_search_card').each( function() {
  new RoomSearchCard(this);
});