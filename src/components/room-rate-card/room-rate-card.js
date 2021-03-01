import $ from 'jquery';

class RoomRateCard {
  constructor(node) {
    this.$node = $(node);
    this.roomData = this.$node.data().data;
    this.$infoBlock = this.$node.find('.js-room-rate-card__room-info-block');
    this.$datepicker = this.$node.find('.js-room-rate-card__datepicker');
    this.datepicker = this.$node.find('.js-datepicker-block__input').data('datepicker');
    this.$dropdown = this.$node.find('.js-dropdown');
    this.$calcBlock = this.$node.find('.js-room-rate-card__calculations-block');
    this.$total = this.$node.find('.js-room-rate-card__total');

    this._init();
  }

  _init() {
    this._displayInfoOfRoom();
    this._attachEventHandlers();

    this._calcDaysTotalCost();
    this._calcServices();
    this._calcAdditionalServices();
    this._renderTotalCost();
  }

  _attachEventHandlers() {
    const { $node, $datepicker } = this;

    $datepicker.on('updateDates.roomRateCard', this._handleDatepickerUpdateDates.bind(this));

    $node.on('submit.roomRateCard', this._handleRoomRateCardSubmit.bind(this));
  }

  _getNumOfDays() {
    const { selectedDates } = this.datepicker;

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
    const $num = $infoBlock.find('.js-room-rate-card__number');
    const $price = $infoBlock.find('.js-room-rate-card__price');
    const $luxFlag = $('<span>', { class: 'room-rate-card__lux-flag', text: 'люкс' });

    this.price = roomData.room.price;
    this.formattedPrice = RoomRateCard.formatPrice(this.price);

    $num.html(numOfRoom);
    $price.html(this.formattedPrice);

    if (roomData.room.isLux) {
      $infoBlock.find('.js-room-rate-card__number-block').append($luxFlag);
    }
  }

  _calcDaysTotalCost() {
    const { $calcBlock, price, formattedPrice } = this;
    const $displayCalcBlock = $calcBlock.find('.js-room-rate-card__cost-calc');
    const $displayTotalBlock = $calcBlock.find('.js-room-rate-card__days-total-cost');

    const numOfDays = this._getNumOfDays();

    this.daysTotalCost = price * numOfDays;

    $displayCalcBlock.html(`${formattedPrice} x ${numOfDays} суток`);
    $displayTotalBlock.html(RoomRateCard.formatPrice(this.daysTotalCost));
  }

  _calcServices() {
    const { $calcBlock, roomData } = this;
    const $displayServicesText = $calcBlock.find('.js-room-rate-card__services-text');
    const $servicesList = $calcBlock.find('.js-room-rate-card__services-info > .room-rate-card__services-list');
    const $displayServicesTotalCost = $calcBlock.find('.js-room-rate-card__services-total-cost');
    let servicesText = $displayServicesText.html();

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
    const $servicesList = $calcBlock.find('.js-room-rate-card__additional-services-info > .room-rate-card__services-list');
    const $displayAddServicesTotalCost = $calcBlock.find('.js-room-rate-card__additional-services-total-cost');

    const addServices = roomData.additionalServices;
    this.addServicesCost = RoomRateCard.renderServices(addServices, $servicesList);

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

    this.$total.html(RoomRateCard.formatPrice(this.total));
  }

  _handleDatepickerUpdateDates() {
    this._calcDaysTotalCost();
    this._renderTotalCost();
  }

  async _handleRoomRateCardSubmit(event) {
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

  static renderServices(servicesData, $servicesDisplay) {
    let servicesCost = 0;

    if (servicesData.length > 0) {
      $servicesDisplay.empty();
      servicesData.forEach((service) => {
        servicesCost += service.cost;

        const $serviceListItem = $('<li>', { class: 'room-rate-card__services-list-item' });
        const $serviceName = $('<span>', {
          class: 'room-rate-card__service-name',
          text: service.name,
        });
        const $serviceCost = $('<span>', {
          class: 'room-rate-card__service-cost',
          text: RoomRateCard.formatPrice(service.cost),
        });

        $serviceListItem
          .append($serviceName)
          .append($serviceCost);

        $servicesDisplay.append($serviceListItem);
      });
    }

    return servicesCost;
  }
}

$('.js-room-rate-card').each(function addRoomRateCard() {
  const roomRateCard = new RoomRateCard(this);

  return roomRateCard;
});
