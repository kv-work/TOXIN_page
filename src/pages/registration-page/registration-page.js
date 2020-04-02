import '../../main.scss'
import './registration-page.scss'

//import favicon
import '../../favicons/favicon'

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

requireAll(require.context('../../components', true, /\.(js)$/));