import '../../main.scss';
import './search-room.scss';

//import favicon
import '../../favicons/favicon'

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

requireAll(require.context('../../components', true, /\.(js)$/));

class SearchRoomContent {
  constructor(node) {
    this.$content = $(node);
    this.$toggler = this.$content.find('.search_room__filter_toggler');
    this.$filters = this.$content.find('.search_room__filters_block');

    this._init();
  }

  _init() {
    this._attachEventHandlers();
    this._getData();
  }

  _getData() {
    this.data = window
      .location
      .search
      .replace('?','')
      .split('&')
      .reduce( (prev,elem) => {
        const arr = elem.split('=');
        prev[ decodeURIComponent(arr[0])] = decodeURIComponent(arr[1]);
        return prev;
      }, {});
  }

  _attachEventHandlers() {
    const {$toggler, $filters} = this;

    $toggler.click( () => {
      $toggler.toggleClass('opened');
      $filters.toggleClass('opened');
    } )
  }
}

$('.search_room__content').each( function() {
  new SearchRoomContent(this);
} )