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

    this._calcDaysTotalCost()
    this._calcServices()
    this._calcAdditionalServices()
    this._renderTotalCost()
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

  _formatPrice(price) {
    return `${price.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}₽`
  }

  _displayInfoOfRoom() {
    const 
      {$infoBlock, data} = this,
      numOfRoom = data.room.number,
      $num = $infoBlock.find('.room_rate_card__number'),
      $price = $infoBlock.find('.room_rate_card__price'),      
      $luxFlag = $('<span>', {class: 'room_rate_card__lux_flag', text: 'люкс'});
      
    this.price = data.room.price;
    this.formattedPrice = this._formatPrice(this.price);

      $num.html(numOfRoom)
      $price.html(this.formattedPrice)

      if (data.room.isLux) {
        $infoBlock.find('.room_rate_card__number_block').append($luxFlag)
      }
  }

  _calcDaysTotalCost() {
    const { $calcBlock, price, formattedPrice } = this;
    const $displayCalcBlock = $calcBlock.find('.room_rate_card__cost_calc');
    const $displayTotalBlock = $calcBlock.find('.room_rate_card__days_total_cost');

    const numOfDays = this._getNumOfDays();

    this.daysTotalCost = price * numOfDays;

    $displayCalcBlock.html(`${formattedPrice} x ${numOfDays} суток`)
    $displayTotalBlock.html(this._formatPrice(this.daysTotalCost))
  }

  _calcServices() {
    const { $calcBlock, data } = this;
    const $displayServicesText = $calcBlock.find('.room_rate_card__services_text');
    const $displayServicesTotalCost = $calcBlock.find('.room_rate_card__services_total_cost');
    let servicesText = 'Сбор за услуги';

    const services = data.services;
    this.servicesCost = 0;

    if (services.length > 0) {
      services.forEach( (service) => {
        this.servicesCost += service.cost;
      } )
    } 

    if (data.discount) {
      this.discount = data.discount;
      servicesText += `: скидка ${this._formatPrice(this.discount)}`
    }

    $displayServicesText.html(servicesText);
    $displayServicesTotalCost.html(this._formatPrice(this.servicesCost))

  }

  _calcAdditionalServices() {
    const { $calcBlock, data } = this;
    const $displayAddServicesText = $calcBlock.find('.room_rate_card__additional_services_text');
    const $displayAddServicesTotalCost = $calcBlock.find('.room_rate_card__additional_services_total_cost');
    let addServicesText = 'Сбор за дополнительные услуги';

    const addServices = data.additionalServices;
    this.addServicesCost = 0;

    if (addServices.length > 0) {
      addServices.forEach( (service) => {
        this.addServicesCost += service.cost;
      } )
    }

    $displayAddServicesText.html(addServicesText);
    $displayAddServicesTotalCost.html(this._formatPrice(this.addServicesCost))
  }

  _renderTotalCost() {
    this.total = this.daysTotalCost;

    if (this.servicesCost) {
      this.total += this.servicesCost;
    }

    if (this.addServicesCost) {
      this.total += this.addServicesCost;
    }

    if (this.discount) {
      this.total -= this.discount
    }

    this.$total
      .find('.room_rate_card__total')
      .html(this._formatPrice(this.total))
  }
}

$('.js_room_rate_card').each(function() {
  new RoomRateCard(this)
})