
class ExpandableCheckbox {
  constructor(checkboxList) {
    this.$checkboxList = $(checkboxList);
    this.$checkboxLabel = this.$checkboxList.find('.checkbox__label_wrapper');
    this.$checkboxOptions = this.$checkboxList.find('.checkbox__options');
    this.$option = this.$checkboxList.find('.checkbox__option_wrapper');

    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    const { $checkboxList, $checkboxLabel, $checkboxOptions } = this;

    $checkboxList.click((e) => {
      $(e.currentTarget).toggleClass('form__checkbox_expandable_opened')
    })

    $checkboxOptions.click( (e) => {
      e.stopPropagation()
    } )
  }

}

$('.form__checkbox_expandable').each(function() {
  const checkbox = new ExpandableCheckbox(this);
})