import PermissionContext from './PermissionContext';
import PermissionContextProvider from './PermissionContextProvider';
import withPermission from './withPermission';

const PermissionContextConsumer = PermissionContext.Consumer;

export default PermissionContext;
export { PermissionContextProvider, PermissionContextConsumer, withPermission };
