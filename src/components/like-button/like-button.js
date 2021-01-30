import $ from 'jquery';

class LikeButton {
  constructor(node) {
    this.$this = $(node);
    this.$input = this.$this.find('.js-like-button__input');

    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    const { $this } = this;

    $this.on('change.likeButton', this.handleLikeButtonChange);
  }

  // eslint-disable-next-line class-methods-use-this
  handleLikeButtonChange(event) {
    const { currentTarget } = event;
    const $count = $(currentTarget).find('.js-like-button__count');
    let value = $count.text();

    if (currentTarget.control.checked) {
      currentTarget.classList.add('like-button__label_checked');
      value = +value + 1;
    } else {
      currentTarget.classList.remove('like-button__label_checked');
      value = +value - 1;
    }

    $count.text(value);
  }
}

$('.js-like-button').each((_, node) => {
  const likeButton = new LikeButton(node);

  return likeButton;
});
