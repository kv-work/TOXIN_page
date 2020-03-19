import '../../main.scss'
import './headers-n-footers.scss';

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

requireAll(require.context('../../components', true, /\.(js)$/));