import 'air-datepicker/dist/js/datepicker.min';

export default class Datepicker {
  constructor(node, options) {
    this.$node = $(node);
    this.isInline = this.$node.hasClass('js_form_datepicker_inline');
    this.isSeparated = this.$node.hasClass('js_form_datepicker_separated');
    this.data = this.isInline ? this.$node.data() : this.$node.find('input').data();

    this.$datepicker = this.$node.find('.js_datepicker');
    if (this.isInline) this.$datepicker = this.$node;
    if (this.isSeparated) this.$datepicker = this.$node.find('.js_datepicker_separated');

    this.options = options;

    if (this.isSeparated) {
      this.options = {
        ...options,
        showEvent: 'none',
        onSelect: (formDate, date, inst) => {
          console.log(formDate) // убрать в продакшене
          this._selectDate(formDate, date)
        },
        onShow: (_, animComplete) => {
          if (animComplete) {
            console.log('open') // убрать в продакшене
          }
        }
      }
    }

    this.datepickerData = this.$datepicker.datepicker(this.options).data('datepicker');
    this.clearBtn = this.datepickerData.$datepicker.find('span.datepicker--button[data-action=clear')

    this._init()
  }

  _init() {
    if (this.isSeparated) {
      this._addEndDateInput()
      this.datepickerData.update('dateFormat', 'dd.mm.yyyy')
    }

    this.$wrapper = this.$node.find('.form_datepicker__input_wrapper')

    if (this.data.date || this.data.valueSecond) this._setDataValues();

    this._addApplyButton()
    this._attachEventHandlers()
  }

  //Создание инпута, который будет отображать конечную дату диапозона
  _addEndDateInput() {
    const { labelSecond, valueSecond } = this.data;
  
    this.$endDate = this.$node.append(
      `<div class="form_datepicker_wrapper">
        <label class="form_datepicker__label like_h3">${labelSecond}</label>
        <div class="form_datepicker__input_wrapper">
          <input class="form_datepicker__end_date_input js_datepicker_masked" type="text" placeholder="ДД.ММ.ГГГГ" data-date=${valueSecond} readonly />
        </div>
      </div>`).find(`.form_datepicker__end_date_input`)
  }

  //Установка дат переданных с помощью data-атрибутов
  _setDataValues() {
    const {date, valueSecond} = this.data;

    const startDateStr  = date ? date.split('.').reverse().join('-') : '',
          endDateStr    = valueSecond ? valueSecond.split('.').reverse().join('-') : '';

    this.startDate = startDateStr ? new Date(startDateStr) : '';
    this.endDate = endDateStr ? new Date(endDateStr) : '';
    
    if (!this.isSeparated) {
      const dates = []
      if (this.startDate) dates.push(this.startDate);
      if (this.endDate) dates.push(this.endDate);
      return this.datepickerData.selectDate( dates );
    }

    this.$datepicker.val(date)
    this.$endDate.val(valueSecond)

    const dates = []
    if (this.startDate) dates.push(this.startDate);
    if (this.endDate) dates.push(this.endDate);
    this.datepickerData.selectedDates = dates;
  }

  //Добавление кнопки "применить"
  _addApplyButton() {
    this.$applyBtn = this.datepickerData.$datepicker.find('.datepicker--buttons')
                                                    .append('<button type="button" class="datepicker--button-apply">Применить</button>')
                                                    .find('.datepicker--button-apply')
  }

  //Создание обработчиков событий
  _attachEventHandlers() {

    this.$wrapper.click( (e) => {
      this.$opener = $(e.currentTarget).find('input')
      console.log(this.datepickerData.selectedDates) // убрать в продакшене
      this.datepickerData.show()
      if (this.isSeparated) this._openDatepicker()
    } )

    this.clearBtn.click( () => {
      console.log('click on clear-button') //убрать на продакшене
      this._clearDates()
    } )

    //apply button event handlers
    this.$applyBtn.click((e) => {
      this.datepickerData.hide()
    })

  }

  _selectDate(formattedDates, date) {    
    const formattedDatesArr = formattedDates.split(' - ')
    const { $datepicker, $endDate, datepickerData, $opener } = this;

    //выбор даты начала диапозона, если не выбрана дата конца
    if ($opener && $opener.hasClass('start_date') && date && !this.endDate ) {
      console.log('select start without end')

      this.startDate = date[0];
      $datepicker.val(formattedDates);
      datepickerData.selectedDates = [this.startDate, this.startDate];
    }

    //выбор даты начала диапозона, если выбрана дата конца
    if ($opener && $opener.hasClass('start_date') && date && this.endDate ) {
      console.log('select start with end')
      this.startDate = date[0]
      $datepicker.val(formattedDatesArr[0]);
      datepickerData.selectedDates = [this.startDate, this.endDate];
      datepickerData.maxRange = this.endDate;
    }

    //выбор даты конца диапозона, если не выбрана дата начала
    if ( $opener && $opener.hasClass('form_datepicker__end_date_input') && date && !this.startDate ) {
      console.log('select end without start')
      this.endDate = date[0];
      $endDate.val(formattedDates);
      $datepicker.val('');
      datepickerData.selectedDates = [this.endDate, this.endDate];
    }

    // //выбор даты конца диапозона, если выбрана дата начала
    // if ( $opener && $opener.hasClass('form_datepicker__end_date_input') && date && startDate ) {
    //   console.log('select end with start')
    //   endDate = date[0];
    //   $endDate.val(formattedDatesArr[1]);
    //   datepickerData.selectedDates = [startDate, endDate];
    //   datepickerData.minRange = startDate;
    // }

    //выбор даты конца диапозона, если выбрана дата начала
    if (this.$opener && this.$opener.hasClass('form_datepicker__end_date_input') && date && this.startDate ) {
      console.log('end opener')
      this.endDate = date[0];
      $datepicker.val(this.startDate ? this.startDate.toLocaleDateString() : ''); 
      $endDate.val(formattedDatesArr[0])
      this.datepickerData.minRange = this.startDate;

      const dates = []
      if (this.startDate) dates.push(this.startDate);
      if (this.endDate) dates.push(this.endDate);
      this.datepickerData.selectedDates = dates;

      this.datepickerData.maxRange = this.endDate;
    }

    //Установка дат до открытия (!не факт что нужна!)
    if (!this.$opener) {
      console.log('none opener')
      switch (formattedDatesArr.length) {
        case 1:
          this.startDate = date[0];
          $datepicker.val(formattedDatesArr[0]);        
          break;
        case 2: 
          this.startDate = date[0];
          this.endDate = date[1];       
          $datepicker.val(formattedDatesArr[0]);
          $endDate.val(formattedDatesArr[1])
          break;
        default:
          break;
      }
    }

    //проверка валидности выбранной даты (!не факт что нужна!)
    if (!date ) {
      console.log('undefined date')
    }
  }

  //Сброс дат
  _clearDates() {
    const { $datepicker, $endDate, datepickerData } = this;

    this.startDate = '';
    this.endDate = '';
    $datepicker.val('');
    $endDate.val('');
    datepickerData.update({
      'minDate': '',
      'maxDate': ''
    });
  }

  _openDatepicker() {
    const {$opener, datepickerData, startDate, endDate, $datepicker} = this;
    console.log('_openDatepicker')

    datepickerData.update({
      'minDate': '',
      'maxDate': ''
    })

    if ($opener.hasClass('start_date')) {
      if (this.endDate) datepickerData.update('maxDate', endDate)
    }

    if ($opener.hasClass('form_datepicker__end_date_input')) {
      datepickerData.update('minDate', startDate)
    }

    if (startDate) {
      $datepicker.val(startDate.toLocaleDateString())
    }

    if (!datepickerData.selectedDates[0]) {
      $datepicker.val('')
    }
  }
}