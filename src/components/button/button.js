import './button.scss';

class Button {
  constructor(node) {
    this.$this = $(node)

    this._attachEventHandlers()
  }

  _attachEventHandlers() {
    const { $this } = this;

    $this.click(function() {
      const button = this;
    })
  }
}

$('.button').each(function() {
  const button = new Button(this)
})