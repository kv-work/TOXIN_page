import './room-card.scss'
import roomsData from '../../data/data.json'

class RoomCard {
  constructor(node) {
    this.$node = $(node);
    this.data = this.$node.data();

    this.$numberBlock = this.$node.find('.room_card__number_block');
    this.$imagesBlock = this.$node.find('.room_card__images_block');
    this.$priceBlock = this.$node.find('.room_card__price');
    this.$rateBlock = this.$node.find('.room_card__rate');
    this.$reviewsBlock = this.$node.find('.room_card__reviews');


    this._init()
    // console.log(this.roomData)
  }

  _init() {
    this._getData();
    this._displayPrice();
    
    if (this.roomData.isLux) {
      this._displayLuxSign();
    }
      
  }

  _getData() {
    const numOfRoom = this.data.number;

    this.roomData = roomsData.rooms[numOfRoom]
  }

  // _createRoomImageBlocks() {    
  // }

  _displayLuxSign() {
    const {$numberBlock} = this;

    $numberBlock.append('<span class="room_card__lux_flag">люкс</span>')
  }

  _displayPrice() {
    const {$priceBlock, roomData} = this;

    $priceBlock.html(`${roomData.price}₽ в сутки`)
  }

}

$('.js_room_card').each(function() {
  const roomCard = new RoomCard(this);
})