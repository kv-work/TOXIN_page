import '../../main.scss'
import './colors-n-type.scss'

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

requireAll(require.context('../../components', true, /\.(js)$/));