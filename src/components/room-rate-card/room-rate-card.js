import $ from 'jquery';
import data from './data.json';

class RoomRateCard {
  constructor(node, roomData) {
    this.$node = $(node);
    this.roomData = roomData;
    this.$infoBlock = this.$node.find('.room_rate_card__room_info_block');
    this.$datepicker = this.$node.find('.room_rate_card__datepicker_is_separated');
    this.datepickerData = this.$node.find('.js-datepicker_separated').data('datepicker');
    this.$dropdown = this.$node.find('.js-form_dropdown');
    this.$calcBlock = this.$node.find('.room_rate_card__calculations_block');
    this.$total = this.$node.find('.room_rate_card__total_cost');

    this._init();
  }

  _init() {
    this._displayInfoOfRoom();
    this._setDates();
    this._attachEventHandlers();

    this._calcDaysTotalCost();
    this._calcServices();
    this._calcAdditionalServices();
    this._renderTotalCost();
  }

  _attachEventHandlers() {
    const { $node, $datepicker } = this;

    $datepicker.on('updateDates', this._updateTotal.bind(this));

    $node.on('submit', this._submitForm.bind(this));
  }

  _setDates() {
    const { dates } = this.roomData;

    const datesArr = dates.map((date) => new Date(date.split('.').reverse().join('-')));
    this.datepickerData.selectDate(datesArr);
  }

  _getNumOfDays() {
    const { selectedDates } = this.datepickerData;

    if (selectedDates[0] && selectedDates[1]) {
      const firstDate = selectedDates[0];
      const firstTime = firstDate.getTime();
      const secondDate = selectedDates[1];
      const secondTime = secondDate.getTime();

      const numOfDays = Math.ceil(Math.abs(secondTime - firstTime) / (1000 * 3600 * 24));

      return numOfDays;
    }

    return 0;
  }

  _displayInfoOfRoom() {
    const { $infoBlock, roomData } = this;
    const numOfRoom = roomData.room.number;
    const $num = $infoBlock.find('.room_rate_card__number');
    const $price = $infoBlock.find('.room_rate_card__price');
    const $luxFlag = $('<span>', { class: 'room_rate_card__lux_flag', text: 'люкс' });

    this.price = roomData.room.price;
    this.formattedPrice = RoomRateCard.formatPrice(this.price);

    $num.html(numOfRoom);
    $price.html(this.formattedPrice);

    if (roomData.room.isLux) {
      $infoBlock.find('.room_rate_card__number_block').append($luxFlag);
    }
  }

  _calcDaysTotalCost() {
    const { $calcBlock, price, formattedPrice } = this;
    const $displayCalcBlock = $calcBlock.find('.room_rate_card__cost_calc');
    const $displayTotalBlock = $calcBlock.find('.room_rate_card__days_total_cost');

    const numOfDays = this._getNumOfDays();

    this.daysTotalCost = price * numOfDays;

    $displayCalcBlock.html(`${formattedPrice} x ${numOfDays} суток`);
    $displayTotalBlock.html(RoomRateCard.formatPrice(this.daysTotalCost));
  }

  _calcServices() {
    const { $calcBlock, roomData } = this;
    const $displayServicesText = $calcBlock.find('.room_rate_card__services_text');
    const $servicesList = $calcBlock.find('.room_rate_card__services_info > .room_rate_card__services_list');
    const $displayServicesTotalCost = $calcBlock.find('.room_rate_card__services_total_cost');
    let servicesText = 'Сбор за услуги';

    const { services } = roomData;
    this.servicesCost = RoomRateCard.renderServices(services, $servicesList);

    if (roomData.discount) {
      this.discount = roomData.discount;
      servicesText += `: скидка ${RoomRateCard.formatPrice(this.discount)}`;
    }

    $displayServicesText.html(servicesText);
    $displayServicesTotalCost.html(RoomRateCard.formatPrice(this.servicesCost));
  }

  _calcAdditionalServices() {
    const { $calcBlock, roomData } = this;
    const $displayAddServicesText = $calcBlock.find('.room_rate_card__additional_services_text');
    const $servicesList = $calcBlock.find('.room_rate_card__additional_services_info > .room_rate_card__services_list');
    const $displayAddServicesTotalCost = $calcBlock.find('.room_rate_card__additional_services_total_cost');
    const addServicesText = 'Сбор за дополнительные услуги';

    const addServices = roomData.additionalServices;
    this.addServicesCost = RoomRateCard.renderServices(addServices, $servicesList);

    $displayAddServicesText.html(addServicesText);
    $displayAddServicesTotalCost.html(RoomRateCard.formatPrice(this.addServicesCost));
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
      this.total = (this.total > this.discount) ? this.total - this.discount : 0;
    }

    this.$total
      .find('.room_rate_card__total')
      .html(RoomRateCard.formatPrice(this.total));
  }

  _updateTotal() {
    this._calcDaysTotalCost();
    this._renderTotalCost();
  }

  async _submitForm(event) {
    event.preventDefault();

    const form = this.$node[0];

    const formData = new FormData(form);
    const url = form.action;
    const { method } = form;

    const obj = {};
    formData.forEach((value, key) => {
      obj[key] = value;
    });

    obj.guests = this.$dropdown.data().items;
    obj.services = this.roomData.services;
    obj.additionalServices = this.roomData.additionalServices;

    const formDataJson = JSON.stringify(obj);

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: formDataJson,
    });

    if (!response.ok) {
      throw new Error(`Не удалость отправить данные по адресу ${url}. Статус: ${response.status}`);
    } else {
      // const json = await response.json();
    }
  }

  static formatPrice(price) {
    return `${price.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}₽`;
  }

  // return sum of services cost
  static renderServices(servicesData, $servicesDisplay) {
    let servicesCost = 0;

    if (servicesData.length > 0) {
      servicesData.forEach((service) => {
        servicesCost += service.cost;

        const $serviceListItem = $('<li>', { class: 'room_rate_card__services_list_item' });
        const $serviceName = $('<span>', {
          class: 'room_rate_card__service_name',
          text: service.name,
        });
        const $serviceCost = $('<span>', {
          class: 'room_rate_card__service_cost',
          text: RoomRateCard.formatPrice(service.cost),
        });

        $serviceListItem
          .append($serviceName)
          .append($serviceCost);

        $servicesDisplay.append($serviceListItem);
      });
    } else {
      const $serviceListItem = $('<li>', {
        class: 'room_rate_card__services_list_item',
        text: 'Не выбрано никаких услуг',
      });
      $servicesDisplay.append($serviceListItem);
    }

    return servicesCost;
  }
}

$('.js-room_rate_card').each(function addRoomRateCard() {
  const roomRateCard = new RoomRateCard(this, data);

  return roomRateCard;
});
