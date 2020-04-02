import '../../main.scss'
import './room-details.scss'

//import favicon
import '../../favicons/favicon'

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

requireAll(require.context('../../components', true, /\.(js)$/));