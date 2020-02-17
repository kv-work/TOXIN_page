class Button {
  constructor(node) {
    this.$this = $(node)

    this._attachEventHandlers()
  }

  _attachEventHandlers() {
    const { $this } = this;

    $this.click(function() {
      const button = this;
      console.log(button)
    })
  }
}

$('.button').each(function() {
  const button = new Button(this)
})