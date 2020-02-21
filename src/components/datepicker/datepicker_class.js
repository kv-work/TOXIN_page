import 'air-datepicker/dist/js/datepicker.min';

export default class Datepicker {
  constructor(node, options) {
    this.$node = $(node);
    this.isSeparated = this.$node.hasClass('js_form_datepicker_separated');
    this.wrapper = this.$node.find('.form_datepicker_wrapper');
    this.data = this.$node.find('input').data()

    if (this.isSeparated) {
      this.$datepicker = this.$node.find('.js_datepicker_separated');
    } else {
      this.$datepicker = this.$node.find('.js_datepicker');
    }

    if (this.isSeparated) this._addEndDateInput();

    this.settings = (!this.isSeparated) ? options : {
      ...options,
      onSelect: (_, date) => this._selectDate(date, this.$datepicker, this.$endDate),
      onHide: (inst) => this._selectDate(inst.selectedDates, this.$datepicker, this.$endDate)
    };

    this._render();
    
    this._addApplyButton();
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    const { $node, $endDate, $datepicker, datepickerData, $applyBtn, _setDate } = this;

    $node.click(() => datepickerData.show())

    // start date element event handlers
    if (this.isSeparated) {
      $datepicker.change((e) => _setDate(e.target.value, e.target, datepickerData))
    }

    if (this.isSeparated) {
      // end date element event handlers
      $endDate.focus((e) => {
        e.target.value = '';
        const startDate = datepickerData.selectedDates[0];
        datepickerData.selectDate(startDate);
      });

      $endDate.change((e) => _setDate(e.target.value, e.target, datepickerData))
    }


    //apply button event handlers
    $applyBtn.click((e) => {
      console.log(e.target)
    })
  }

  _render() {
    this.datepickerData = this.$datepicker.datepicker(this.settings).data('datepicker');
  }

  _addEndDateInput() {
    const { labelSecond, valueSecond } = this.data;

    this.$endDate = this.$node.append('<div class="form_datepicker_wrapper"><label class="form_datepicker__label like_h3">' + labelSecond + '</label><div class="form_datepicker__input_wrapper"><input class="form_datepicker__end_date_input js_datepicker_masked" type="text" class=classList placeholder="ДД.ММ.ГГГГ" data-date=' + valueSecond + ' /></div></div>').find('.form_datepicker__end_date_input')
  }

  _addApplyButton() {
    this.$applyBtn = this.datepickerData.$datepicker.find('.datepicker--buttons').append('<button type="button" class="datepicker--button-apply">Применить</button>').find('.datepicker--button-apply')
  }

  _selectDate(date, startEl, endEl) {
    
    let start, end;

    switch (date.length) {
      case 1:
        start = date[0].toLocaleDateString();
        if (startEl) $(startEl).val(start);
        break;
      case 2:
        end = date[1].toLocaleDateString();
        start = date[0].toLocaleDateString();
        if (startEl) $(startEl).val(start);
        if (endEl) $(endEl).val(end)
        break;
      default:
        $(startEl).val('');
        $(endEl).val('')
        break;
    }
  }

  _setDate(date, input, calendar) {
    const dateString = date.split('.').reverse().join('-');
    let startDate, endDate;

    if (input.classList.contains('start_date')) {

      startDate = new Date(dateString)
      endDate = calendar.selectedDates[1] ? calendar.selectedDates[1] : startDate

    } else if (input.classList.contains('end_date')) {

      endDate = new Date(dateString)
      startDate = calendar.selectedDates[0] ? calendar.selectedDates[0] : new Date()
    }

    const dateArr = [startDate, endDate]
    calendar.selectDate(dateArr)
  }
}