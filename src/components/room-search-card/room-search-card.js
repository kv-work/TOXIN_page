import './room-search-card.scss';

class RoomSearchCard {
  constructor(node) {
    this.$node = $(node);

    this._init();
  };

  _init() {
    this._attachEventHandlers()
  };

  _attachEventHandlers() {
    const { $node, _submitForm } = this;

    $node.submit( (e) => {
      _submitForm(e);
    } )
  };

  _submitForm(event) {
    event.preventDefault();

    console.log('room-search-card form submit');
  };
};

$('.room_search_card').each( function() {
  new RoomSearchCard(this);
});