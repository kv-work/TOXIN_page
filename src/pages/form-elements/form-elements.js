//Loading styles
import '../../main.scss'
import './form-elements.scss'

//Loading scripts
//import favicon
import '../../favicons/favicon'



function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

requireAll(require.context('../../components', true, /\.(js)$/));
