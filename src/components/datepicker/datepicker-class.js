import 'air-datepicker/dist/js/datepicker.min';
import $ from 'jquery';

export default class Datepicker {
  constructor(node, options) {
    this.$node = $(node);
    this.isInline = this.$node.hasClass('js-form_datepicker_inline');
    this.isSeparated = this.$node.hasClass('js-form_datepicker_separated');
    this.data = this.isInline ? this.$node.data() : this.$node.find('input').data();

    this.$datepicker = this.$node.find('.js-datepicker');
    if (this.isInline) this.$datepicker = this.$node;
    if (this.isSeparated) this.$datepicker = this.$node.find('.js-datepicker_separated');

    this.options = options;

    if (this.isSeparated) {
      this.options = {
        ...options,
        showEvent: 'none',
        onSelect: (formDate, date) => {
          this._selectDate(formDate, date);
        },
        onHide: (_, animationCompleted) => {
          if (animationCompleted) {
            this.$node.trigger('updateDates');
          }
        },
      };
    }

    this.datepickerData = this.$datepicker.datepicker(this.options).data('datepicker');
    this.clearBtn = this.datepickerData.$datepicker.find('span.datepicker--button[data-action=clear');

    this._init();
  }

  _init() {
    if (this.isSeparated) {
      this._addEndDateInput();
      this.datepickerData.update('dateFormat', 'dd.mm.yyyy');
    }

    this.$wrapper = this.$node.find('.form_datepicker__input_wrapper');

    if (this.data.date || this.data.valueSecond) this._setDataValues();

    this._addApplyButton();
    this._attachEventHandlers();
  }

  // Создание инпута, который будет отображать конечную дату диапозона
  _addEndDateInput() {
    const {
      labelSecond,
      valueSecond,
    } = this.data;

    this.$endDate = this.$node.append(
      `<div class="form_datepicker_wrapper">
        <label class="form_datepicker__label like_h3">${labelSecond}</label>
        <div class="form_datepicker__input_wrapper">
          <input class="form_datepicker__end_date_input js-datepicker_masked" type="text" name="end-date" placeholder="ДД.ММ.ГГГГ" readonly required 
          ${valueSecond ? `data-date=${valueSecond}` : ' '} />
        </div>
      </div>`,
    ).find('.form_datepicker__end_date_input');
  }

  // Установка дат переданных с помощью data-атрибутов
  _setDataValues() {
    const {
      date,
      valueSecond,
    } = this.data;

    const startDateStr = date ? date.split('.').reverse().join('-') : '';
    const endDateStr = valueSecond ? valueSecond.split('.').reverse().join('-') : '';

    this.startDate = startDateStr ? new Date(startDateStr) : '';
    this.endDate = endDateStr ? new Date(endDateStr) : '';

    if (!this.isSeparated) {
      const dates = [];
      if (this.startDate) dates.push(this.startDate);
      if (this.endDate) dates.push(this.endDate);
      this.datepickerData.selectDate(dates);
    } else {
      this.$datepicker.val(date);
      this.$endDate.val(valueSecond);

      const dates = [];
      if (this.startDate) dates.push(this.startDate);
      if (this.endDate) dates.push(this.endDate);

      if (dates.length === 2) {
        this.datepickerData.selectDate(dates);
      } else {
        this.datepickerData.selectedDates = dates;
      }
    }
  }

  // Добавление кнопки "применить"
  _addApplyButton() {
    this.$applyBtn = this.datepickerData.$datepicker.find('.datepicker--buttons')
      .append('<button type="button" class="datepicker--button-apply">Применить</button>')
      .find('.datepicker--button-apply');
  }

  // Создание обработчиков событий
  _attachEventHandlers() {
    this.$wrapper.on('click', this._clickOnWrapperHandler.bind(this));

    this.clearBtn.on('click', this._clearDates.bind(this));

    // apply button event handlers
    this.$applyBtn.on('click', this._clickOnApplyBtn.bind(this));
  }

  _clickOnApplyBtn() {
    this.datepickerData.hide();
  }

  _clickOnWrapperHandler(event) {
    this.$opener = $(event.currentTarget).find('input');
    this.datepickerData.show();
    if (this.isSeparated) this._openDatepicker();
  }

  _selectDate(formattedDates, date) {
    const formattedDatesArr = formattedDates.split(' - ');
    const {
      $datepicker,
      $endDate,
      datepickerData,
      $opener,
    } = this;

    let start;
    let end;

    if ($opener) {
      if (Array.isArray(date)) {
        [start, end] = date;
        if ($opener.hasClass('start_date')) {
          this.startDate = start;
          $datepicker.val(formattedDatesArr[0]);
          $datepicker.data('date', formattedDatesArr[0]);
          datepickerData.selectedDates = [this.startDate, this.endDate];
          datepickerData.maxRange = this.endDate;
        } else {
          this.endDate = (this.endDate) ? start : end;
          $datepicker.val(this.startDate.toLocaleDateString());
          $endDate.val(this.endDate.toLocaleDateString());
          $endDate.data('date', this.endDate.toLocaleDateString());
          datepickerData.minRange = this.startDate;
          datepickerData.selectedDates = [this.startDate, this.endDate];
          datepickerData.maxRange = this.endDate;
        }
      } else {
        start = date;
        if ($opener.hasClass('start_date')) {
          this.startDate = start;
          $datepicker.val(formattedDates);
          $datepicker.data('date', formattedDates);
          datepickerData.selectedDates = [this.startDate];
        } else {
          this.endDate = start;
          $endDate.val(formattedDates);
          $endDate.data('date', formattedDates);
          $datepicker.val('');
          datepickerData.selectedDates = [this.endDate];
        }
      }
    } else {
      // отображение дат до открытия календаря
      switch (formattedDatesArr.length) {
        case 1:
          this.startDate = date;
          $datepicker.val(formattedDatesArr[0]);
          break;
        case 2:
          [start, end] = date;
          this.startDate = start;
          this.endDate = end;
          $datepicker.val(formattedDatesArr[0]);
          $endDate.val(formattedDatesArr[1]);
          break;
        default:
          break;
      }
    }
  }

  // Сброс дат
  _clearDates() {
    const {
      $datepicker,
      $endDate,
      datepickerData,
    } = this;

    this.startDate = '';
    this.endDate = '';
    $datepicker.val('');
    $endDate.val('');
    datepickerData.update({
      minDate: '',
      maxDate: '',
      range: false,
    });
  }

  _openDatepicker() {
    const {
      $opener,
      datepickerData,
      startDate,
      endDate,
      $datepicker,
    } = this;

    datepickerData.update({
      minDate: '',
      maxDate: '',
    });

    // клик на $datepicker НЕ выбран конец диапазона
    if ($opener.hasClass('start_date') && !endDate) {
      datepickerData.update({ range: false });
    }

    // клик на $datepicker выбран конец диапазона
    if ($opener.hasClass('start_date') && endDate) {
      datepickerData.update({
        range: true,
        maxDate: endDate,
      });
    }

    // клик на $endDate НЕ выбран старт диапазона
    if ($opener.hasClass('form_datepicker__end_date_input') && !startDate) {
      datepickerData.update({ range: false });
    }

    // клик на $endDate выбран старт диапазона
    if ($opener.hasClass('form_datepicker__end_date_input') && startDate) {
      datepickerData.update({
        minDate: startDate,
        range: true,
      });
    }

    if (startDate) $datepicker.val(startDate.toLocaleDateString());
  }
}
