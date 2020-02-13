import 'air-datepicker/dist/js/datepicker.min';

export default class Datepicker {
  constructor(node, options) {    
    this.$node = $(node);
    this.startDate = this.$node.find('.start_date');
    this.endDate = this.$node.find('.end_date');
    this.$datepicker = this.$node.find('.js_datepicker_ranged');
    this.settings = {
      ...options,
      onSelect: (_, date) => this._selectDate(date, this.startDate, this.endDate),
      onHide: (inst) => this._selectDate(inst.selectedDates, this.startDate, this.endDate)
    };

    this._render();
    this._addApplyButton();
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    const { $node, startDate, endDate, datepickerData, $applyBtn, _setDate } = this;

    //start date element event handlers
    startDate.focus( (e) => e.target.value = '' );
    startDate.change( (e) => _setDate(e.target.value, e.target, datepickerData) )

    //end date element event handlers
    endDate.focus( (e) => e.target.value = '' );
    endDate.change( (e) => _setDate(e.target.value, e.target, datepickerData) )

    //apply button event handlers
    $applyBtn.click((e) => {
      console.log(e.target)
    })

    $node.find('.form_datepicker').click( () => datepickerData.show() );
    
  }

  _render() {
    this.datepickerData = this.$datepicker.datepicker(this.settings).data('datepicker');
  }

  _addApplyButton() {
    this.$applyBtn = this.datepickerData.$datepicker.find('.datepicker--buttons').append('<button type="button" class="datepicker--button-apply">Применить</button>')     
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