class LikeButton {
  constructor(node) {
    this.$this = $(node);
    this.value = this.$this.find('p').text();
    this.$input = this.$this.find('.like_button__input');

    this._attachEventHandlers()
  }

  _attachEventHandlers() {
    const { $this, $input, _increase, _decrease } = this;
    let { value } = this;

    $this.change(function() {
      if (this.control.checked) {
        this.classList.add('like_button__label_checked')
        ++value
      } else {
        this.classList.remove('like_button__label_checked')
        --value
      }

      $(this).find('p').text(value)
    })
  }
}

$('.like_button').each(function() {
  const likeButton = new LikeButton(this)
})