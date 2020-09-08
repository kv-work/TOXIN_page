import $ from 'jquery';
import './like-button.scss';

class LikeButton {
  constructor(node) {
    this.$this = $(node);
    this.$input = this.$this.find('.like_button__input');

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
      currentTarget.classList.add('like_button__label_checked');
      value = +value + 1;
    } else {
      currentTarget.classList.remove('like_button__label_checked');
      value = +value - 1;
    }

    $(currentTarget).find('p').text(value);
  }
}

$('.js-like_button').each((_, node) => {
  const likeButton = new LikeButton(node);

  return likeButton;
});
