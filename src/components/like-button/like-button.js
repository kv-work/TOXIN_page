import $ from 'jquery';

class LikeButton {
  constructor(node) {
    this.$this = $(node);
    this.$input = this.$this.find('.like-button__input');

    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    const { $this } = this;

    $this.on('change', LikeButton.changeHandler);
  }

  static changeHandler(event) {
    const { currentTarget } = event;
    let value = $(currentTarget).find('p').text();

    if (currentTarget.control.checked) {
      currentTarget.classList.add('like-button__label_checked');
      value = +value + 1;
    } else {
      currentTarget.classList.remove('like-button__label_checked');
      value = +value - 1;
    }

    $(currentTarget).find('p').text(value);
  }
}

$('.js-like-button').each((_, node) => {
  const likeButton = new LikeButton(node);

  return likeButton;
});
