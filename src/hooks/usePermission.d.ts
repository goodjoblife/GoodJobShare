declare const usePermission: () => [
  boolean,
  () => Promise<void>,
  (publishId: string) => boolean,
];

export default usePermission;
