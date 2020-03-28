import '../../main.scss'
import './landing.scss'


function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

requireAll(require.context('../../components', true, /\.(js)$/));