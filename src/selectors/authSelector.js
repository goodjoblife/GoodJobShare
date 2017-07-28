export const statusSelector = state => state.auth.get('status');
export const tokenSelector = state => state.auth.token;
export const userSelector = state => state.auth.user;
