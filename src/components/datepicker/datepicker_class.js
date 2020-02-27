import 'air-datepicker/dist/js/datepicker.min';

export default class Datepicker {
  constructor(node, options) {
    this.$node = $(node);
    this.isSeparated = this.$node.hasClass('js_form_datepicker_separated');
    this.wrapper = this.$node.find('.form_datepicker_wrapper');
    this.data = this.$node.find('input').data()
    console.log(this.data)

    if (this.isSeparated) {
      this.$datepicker = this.$node.find('.js_datepicker_separated');
    } else {
      this.$datepicker = this.$node.find('.js_datepicker');
    }

    if (this.isSeparated) this._addEndDateInput();

    this.settings = (!this.isSeparated) ? options : {
      ...options,
      onSelect: (formattedDate) => {
        this._selectDate(formattedDate)
      }
    };

    this._init();
  }

  _init() {
    this.datepickerData = this.$datepicker.datepicker(this.settings).data('datepicker');

    if (this.isSeparated) this.datepickerData.update('dateFormat', 'dd.mm.yyyy')

    const { data, datepickerData } = this;

    if (data.date) {
      const dateString = data.date.split('.').reverse().join('-')
      const date = new Date(dateString)
      const dates = [];

      datepickerData.update('startDate', date)
      
      dates.push(date);

      if (data.valueSecond) {
        const dateString = data.valueSecond.split('.').reverse().join('-')
        const date = new Date(dateString)
        dates.push(date);
      }

      datepickerData.selectDate(dates)
    }    

    this.$inputWrapper = this.$node.find('.form_datepicker__input_wrapper')
      
    this._addApplyButton();
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    const { $node, $endDate, $datepicker, datepickerData, $applyBtn, _setDate, $inputWrapper } = this;

    $inputWrapper.click((e) => {
      this.$opener = $(e.currentTarget).find('input');
      datepickerData.show()
    })

    //apply button event handlers
    $applyBtn.click((e) => {
      console.log(e.target)
    })
  }

  _addEndDateInput() {
    const { labelSecond, valueSecond } = this.data;

    this.$endDate = this.$node.append('<div class="form_datepicker_wrapper"><label class="form_datepicker__label like_h3">' + labelSecond + '</label><div class="form_datepicker__input_wrapper"><input class="form_datepicker__end_date_input js_datepicker_masked" type="text" placeholder="ДД.ММ.ГГГГ" data-date=' + valueSecond + ' readonly /></div></div>').find('.form_datepicker__end_date_input')
  }

  _addApplyButton() {
    this.$applyBtn = this.datepickerData.$datepicker.find('.datepicker--buttons').append('<button type="button" class="datepicker--button-apply">Применить</button>').find('.datepicker--button-apply')
  }

  _selectDate(formattedDate) {    
    const dates = formattedDate.split(' - ');
    const { $opener, $datepicker, $endDate } = this;

    // console.log($opener.hasClass('form_datepicker__end_date_input'))
    
    switch (dates.length) {
      case 1:
        $($datepicker).val(dates[0]);
        break;
      case 2:        
        $($datepicker).val(dates[0]);
        $($endDate).val(dates[1])
        break;
      default:
        break;
    }

    if (!dates[0]) {
      $($datepicker).val('');
      $($endDate).val('');
    }
  }

  _setStartDate(date) {
    const { $opener, $datepicker, datepickerData } = this;
    const dates = datepickerData.selectedDates;

    if ($opener.hasClass('form_datepicker__end_date_input')) {
      return
    }

    if (dates[1]) {
      datepickerData.update('maxDate', dates[1])
    }
  }
}