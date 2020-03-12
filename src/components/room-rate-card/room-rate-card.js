import './room-rate-card.scss'

class RoomRateCard {
  constructor(node) {
    this.$node = $(node);
    this.$infoBlock = this.$node.find('.room_rate_card__room_info_block');
    this.datepicker = this.$node.find('.js_datepicker_separated').datepicker().data('datepicker');
    this.$dropdown = this.$node.find('.js_form_dropdown');
    this.$calcBlock = this.$node.find('.room_rate_card__calculations_block');
    this.$total = this.$node.find('.room_rate_card__total_cost');

    this._init()
  }

  _init() {
    this._displayInfoOfRoom()
  }

  _displayInfoOfRoom() {
    const 
      {$infoBlock} = this,
      $numBlock = $('<span>', {class: 'room_rate_card__number_block'}),
      $numSign = $('<span>', {class: 'room_rate_card__number_sign', text: '№'}),
      $num = $('<span>', {class: 'room_rate_card__number', text: 888}),
      $luxFlag = $('<span>', {class: 'room_rate_card__lux_flag', text: 'люкс'}),
      $priceBlock = $('<span>', {class: 'room_rate_card__price_block'}),
      price = '9990',
      formattedPrice = `${price.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}₽`,
      $price = $('<span>', {class: 'room_rate_card__price', text: formattedPrice}),
      $priceText = $('<span>', {class: 'room_rate_card__price_text', text: 'в сутки'});

    $numBlock
      .append($numSign)
      .append($num)
      .append($luxFlag)

    $priceBlock
      .append($price)
      .append($priceText)

    $infoBlock
      .append($numBlock)
      .append($priceBlock)
  }
}

$('.js_room_rate_card').each(function() {
  new RoomRateCard(this)
})