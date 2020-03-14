import 'air-datepicker/dist/js/datepicker.min';

export default class Datepicker {
  constructor(node, options) {
    this.$node = $(node);
    this.isInline = this.$node.hasClass('js_form_datepicker_inline');
    
    this.data = this.isInline ? this.$node.data() : this.$node.find('input').data();

    this.isSeparated = this.$node.hasClass('js_form_datepicker_separated');

    if (this.isInline) {
      this.$datepicker = this.$node
    } else {
      this.$datepicker = this.isSeparated ? this.$node.find('.js_datepicker_separated') : this.$node.find('.js_datepicker');
    }


    this.options = !this.isSeparated ? options : {
      ...options,
      showEvent: 'none',
      onSelect: (formDate, date, inst) => {
        this._selectDate(formDate, date)
      },
      // onShow: (inst, animComplete) => { 
      //   if (animComplete) this._openDatepicker()
      // }
    }

    this._init()
  }

  _init() {
    this.datepickerData = this.$datepicker.datepicker(this.options).data('datepicker')

    if (this.isSeparated) {
      this._addEndDateInput()
      this.datepickerData.update('dateFormat', 'dd.mm.yyyy')
    }

    this.$wrapper = this.$node.find('.form_datepicker__input_wrapper')

    if (this.data.date || this.data.valueSecond) this._setDataValues();
    this._addApplyButton()
    this._attachEventHandlers()
  }

  //Установка дат переданных с помощью data-атрибутов
  _setDataValues() {
    const {date, valueSecond} = this.data;

    const startDateStr  = date ? date.split('.').reverse().join('-') : '',
          endDateStr    = valueSecond ? valueSecond.split('.').reverse().join('-') : '';

    this.startDate = startDateStr ? new Date(startDateStr) : '';
    this.endDate = endDateStr ? new Date(endDateStr) : '';
    
    if (!this.isSeparated) {
      return this.datepickerData.selectDate( [this.startDate, this.endDate] )
    }

    this.$datepicker.val(date)
    this.$endDate.val(valueSecond)
    this.datepickerData.selectedDates = [this.startDate, this.endDate]
  }

  //Создание инпута, который будет отображать конечную дату диапозона
  _addEndDateInput() {
    const { labelSecond, valueSecond } = this.data;

    this.$endDate = this.$node.append('<div class="form_datepicker_wrapper"><label class="form_datepicker__label like_h3">' + labelSecond + '</label><div class="form_datepicker__input_wrapper"><input class="form_datepicker__end_date_input js_datepicker_masked" type="text" placeholder="ДД.ММ.ГГГГ" data-date=' + valueSecond + ' readonly /></div></div>').find('.form_datepicker__end_date_input')
  }

  //Добавление кнопки "применить"
  _addApplyButton() {
    this.$applyBtn = this.datepickerData.$datepicker.find('.datepicker--buttons').append('<button type="button" class="datepicker--button-apply">Применить</button>').find('.datepicker--button-apply')
  }

  //Создание обработчиков событий
  _attachEventHandlers() {

    this.$wrapper.click( (e) => {
      this.$opener = $(e.currentTarget).find('input')
      this.datepickerData.show()
      this._openDatepicker()
    } )

    //apply button event handlers
    this.$applyBtn.click((e) => {
      this.datepickerData.hide()
    })

  }

  _selectDate(formattedDates, date) {    
    const dates = formattedDates.split(' - ')
    const { $datepicker, $endDate } = this;

    if (this.$opener && this.$opener.hasClass('start_date')) {
      this.startDate = date[0]
      $datepicker.val(dates[0]);   
      this.datepickerData.selectedDates = [this.startDate, this.endDate]
      this.datepickerData.maxRange = this.endDate;
    }

    if (this.$opener && this.$opener.hasClass('form_datepicker__end_date_input')) {
      this.endDate = date[0];
      $datepicker.val(this.startDate ? this.startDate.toLocaleDateString() : ''); 
      $endDate.val(dates[0])
      this.datepickerData.minRange = this.startDate;
      this.datepickerData.selectedDates = [this.startDate, this.endDate]
      this.datepickerData.maxRange = this.endDate;  
    }

    //Установка дат до открытия
    if (!this.$opener) {
      switch (dates.length) {
        case 1:
          this.startDate = date[0];
          $datepicker.val(dates[0]);        
          break;
        case 2: 
          this.startDate = date[0];
          this.endDate = date[1];       
          $datepicker.val(dates[0]);
          $endDate.val(dates[1])
          break;
        default:
          break;
      }
    }

    //Сброс дат
    if (!date) {
      this.startDate = ''
      this.endDate = ''
      $datepicker.val('')
      $endDate.val('')
      this.datepickerData.update({
        'minDate': '',
        'maxDate': ''
      })
    }
  }

  _openDatepicker() {
    const {$opener, datepickerData, startDate, endDate, $datepicker} = this;    

    datepickerData.update({
      'minDate': '',
      'maxDate': ''
    })

    if ($opener.hasClass('start_date')) {
      if (!startDate && endDate) {
        datepickerData.selectDate([endDate, endDate])
      }
      datepickerData.update('maxDate', endDate)
    }

    if ($opener.hasClass('form_datepicker__end_date_input')) {
      datepickerData.update('minDate', startDate)
    }

    $datepicker.val(startDate ? startDate.toLocaleDateString() : '')
  }
}