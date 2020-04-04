import './room-search-card.scss';

class RoomSearchCard {
  constructor(node) {
    this.$node = $(node);

    this.$datepickerBlock = this.$node.find('.form_datepicker');

    this._init();
  };

  _init() {
    this._attachEventHandlers()
  };

  _attachEventHandlers() {
    const { $node, _submitForm } = this;

    $node.submit( (e) => {
      console.log(this.$datepickerBlock.find('input.js_datepicker_separated').data())
      console.log(this.$datepickerBlock.find('input.form_datepicker__end_date_input').data())
      _submitForm(e);
    } )
  };

  _submitForm(event) {
    event.preventDefault();
    console.log('room-search-card form submit');
    
    // document.location.href = '/search-room';
  };
};

$('.room_search_card').each( function() {
  new RoomSearchCard(this);
});