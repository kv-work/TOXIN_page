import './room-card.scss'

class RoomCard {
  constructor(node) {
    this.$node = $(node);
    this.data = this.$node.data();

  }

}

$('.js_room_card').each(function() {
  const roomCard = new RoomCard(this);
})