import 'air-datepicker';
import $ from 'jquery';

export default class Datepicker {
  constructor(node, options) {
    this.$node = $(node);
    this.isInline = this.$node.hasClass('datepicker-block_inline');
    this.isSeparated = this.$node.hasClass('datepicker-block_separated');
    this.data = this.isInline ? this.$node.data() : this.$node.find('.js-datepicker-block__input').data();

    this._initDatepicker(options);
    this._init();
  }

  _initDatepicker(options) {
    this.$datepicker = this.isInline ? this.$node : this.$node.find('.js-datepicker-block__input');

    this.options = options;
    if (this.isSeparated) {
      this.options = {
        ...options,
        showEvent: 'none',
        dateFormat: 'dd.mm.yyyy',
        onSelect: this._selectDate.bind(this),
        onHide: this._handleDatepickerHide.bind(this),
      };
      this._addEndDateInput();
    }

    this.datepicker = this.$datepicker.datepicker(this.options).data('datepicker');
  }

  _init() {
    this.$clearBtn = this.datepicker.$datepicker.find('span.datepicker--button[data-action=clear]');
    this.$wrapper = this.$node.find('.js-datepicker-block__input-wrapper');

    if (this.data.date || this.data.valueSecond) this._setDataValues();

    this._addApplyButton();
    this._attachEventHandlers();
  }

  _addEndDateInput() {
    const {
      labelSecond,
      valueSecond,
    } = this.data;

    this.$endDate = this.$node.append(
      `<div class="js-datepicker-block__input-wrapper datepicker-block_wrapper">
        <label class="datepicker-block__label">${labelSecond}</label>
        <div class="datepicker-block__input-wrapper" tabindex=0>
          <input class="js-datepicker-block__end-date-input datepicker-block__end-date-input" type="text" name="end-date" placeholder="ДД.ММ.ГГГГ" readonly required tabindex=-1
          ${valueSecond ? `data-date=${valueSecond}` : ' '} />
        </div>
      </div>`,
    ).find('.js-datepicker-block__end-date-input');
  }

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
      this.datepicker.selectDate(dates);
    } else {
      this.$datepicker.val(date);
      this.$endDate.val(valueSecond);

      const dates = [];
      if (this.startDate) dates.push(this.startDate);
      if (this.endDate) dates.push(this.endDate);

      if (dates.length === 2) {
        this.datepicker.selectDate(dates);
      } else {
        this.datepicker.selectedDates = dates;
      }
    }
  }

  _addApplyButton() {
    this.$applyBtn = this.datepicker.$datepicker.find('.datepicker--buttons')
      .append('<button type="button" class="js-datepicker--button-apply datepicker--button-apply">Применить</button>')
      .find('.js-datepicker--button-apply');
  }

  _attachEventHandlers() {
    this.$wrapper.on('focus.datepicker', this._handleWrapperFocus.bind(this));
    this.$wrapper.on('click.datepicker', this._handleWrapperClick);

    this.$clearBtn.on('click.datepicker', this._handleClearButtonClick.bind(this));

    this.$applyBtn.on('click.datepicker', this._handleApplyButtonClick.bind(this));
  }

  _handleApplyButtonClick() {
    this.datepicker.hide();
  }

  _handleWrapperFocus(event) {
    this.$opener = $(event.currentTarget).find('input');
    this.datepicker.show();
    if (this.isSeparated) this._openDatepicker();
  }

  _selectDate(formattedDates, date) {
    const formattedDatesArr = formattedDates.split(' - ');
    const {
      $datepicker,
      $endDate,
      datepicker,
      $opener,
    } = this;

    let start;
    let end;

    if ($opener) {
      const isStartDate = $opener.hasClass('datepicker-block__input');
      if (Array.isArray(date)) {
        [start, end] = date;
        if (isStartDate) {
          this.startDate = start;
          $datepicker.val(formattedDatesArr[0]);
          $datepicker.data('date', formattedDatesArr[0]);
          datepicker.selectedDates = [this.startDate, this.endDate];
          datepicker.maxRange = this.endDate;
        } else {
          this.endDate = (this.endDate) ? start : end;
          $datepicker.val(this.startDate.toLocaleDateString());
          $endDate.val(this.endDate.toLocaleDateString());
          $endDate.data('date', this.endDate.toLocaleDateString());
          datepicker.minRange = this.startDate;
          datepicker.selectedDates = [this.startDate, this.endDate];
          datepicker.maxRange = this.endDate;
        }
      } else {
        start = date;
        if (isStartDate) {
          this.startDate = start;
          $datepicker.val(formattedDates);
          $datepicker.data('date', formattedDates);
          datepicker.selectedDates = [this.startDate];
        } else {
          this.endDate = start;
          $endDate.val(formattedDates);
          $endDate.data('date', formattedDates);
          $datepicker.val('');
          datepicker.selectedDates = [this.endDate];
        }
      }

      return;
    }

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

  _handleDatepickerHide(_, animationCompleted) {
    if (animationCompleted) {
      this.$node.trigger('updateDates');
    }
  }

  _handleClearButtonClick() {
    const {
      $datepicker,
      $endDate,
      datepicker,
    } = this;

    this.startDate = '';
    this.endDate = '';
    $datepicker.val('');
    $endDate.val('');
    datepicker.update({
      minDate: '',
      maxDate: '',
      range: false,
    });
  }

  _openDatepicker() {
    const {
      $opener,
      datepicker,
      startDate,
      endDate,
      $datepicker,
    } = this;

    datepicker.update({
      minDate: '',
      maxDate: '',
    });

    const isStartDate = $opener.hasClass('datepicker-block__input');
    const isEndDate = $opener.hasClass('datepicker-block__end-date-input');

    if (isStartDate && !endDate) {
      datepicker.update({
        range: false,
      });
    }

    if (isStartDate && endDate) {
      datepicker.update({
        range: true,
        maxDate: endDate,
      });
    }

    if (isEndDate && !startDate) {
      datepicker.update({
        range: false,
      });
    }

    if (isEndDate && startDate) {
      datepicker.update({
        minDate: startDate,
        range: true,
      });
    }

    if (startDate) $datepicker.val(startDate.toLocaleDateString());
  }

  // eslint-disable-next-line class-methods-use-this
  _handleWrapperClick(e) {
    $(e.currentTarget).trigger('focus');
  }
}
