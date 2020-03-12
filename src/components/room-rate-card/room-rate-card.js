import './room-rate-card.scss'

class RoomRateCard {
  constructor(node) {
    this.$node = $(node);
  }
}

$('.js_room_rate_card').each(function() {
  new RoomRateCard(this)
})