//Style loading
import "./main.scss";

//import favicon
import './favicons/favicon'

//Scripts loading
function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

requireAll(require.context('./components', true, /\.(js)$/));
requireAll(require.context('./pages', true, /\.(js)$/)); 