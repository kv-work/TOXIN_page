import '../../main.scss';
import './room-images.scss';
import data from './data.json';

class RoomImagesBlock {
  constructor(node) {
    this.$node = $(node);
    this.room = this.$node.data().room;

    this.images = data.images[this.room];

    this._init();
  }

  _init() {

    this._addImages();
  }

  _addImages() {
    const {images, $node} = this;

    images.forEach(element => {

      const $image = $('<div>', { class: 'room_images__image'});
      const imgUrl = require(`${element}`).default;
      
      $image.css({
        'background-image': `url(${imgUrl})`,
      });

      $node.append($image);
    });
  }
}

$('.js_room_images').each(function() {
  new RoomImagesBlock(this)
})