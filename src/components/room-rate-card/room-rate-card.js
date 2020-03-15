import './room-rate-card.scss'
import data from './data.json'

class RoomRateCard {
  constructor(node) {
    this.$node = $(node);
    this.data = data;
    this.$infoBlock = this.$node.find('.room_rate_card__room_info_block');
    this.datepickerData = this.$node.find('.js_datepicker_separated').datepicker().data('datepicker');
    this.$dropdown = this.$node.find('.js_form_dropdown');
    this.$calcBlock = this.$node.find('.room_rate_card__calculations_block');
    this.$total = this.$node.find('.room_rate_card__total_cost');

    this._init()
  }

  _init() {
    this._displayInfoOfRoom()

    this._setDates()
  }

  _setDates() {
    const {dates} = this.data

    const datesArr = dates.map( (date) => new Date(date.split('.').reverse().join('-')) )
    this.datepickerData.selectDate(datesArr)
  }

  _getNumOfDays() {
    const {selectedDates} = this.datepickerData;

    if (selectedDates.length > 0) {
      const firstDate = selectedDates[0];
      const secondDate = selectedDates[1];

      const numOfDays = Math.ceil(Math.abs(secondDate.getTime() - firstDate.getTime()) / (1000 * 3600 * 24));

      return numOfDays
    }

    alert('выберите даты')
    
    return 0
  }

  _displayInfoOfRoom() {
    const 
      {$infoBlock, data} = this,
      numOfRoom = data.room.number,
      $num = $infoBlock.find('.room_rate_card__number'),
      $price = $infoBlock.find('.room_rate_card__price'),      
      $luxFlag = $('<span>', {class: 'room_rate_card__lux_flag', text: 'люкс'}),
      price = data.room.price,
      formattedPrice = `${price.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}₽`;

      $num.html(numOfRoom)
      $price.html(formattedPrice)

      if (data.room.isLux) {
        $infoBlock.find('.room_rate_card__number_block').append($luxFlag)
      }
  }
}

$('.js_room_rate_card').each(function() {
  new RoomRateCard(this)
})