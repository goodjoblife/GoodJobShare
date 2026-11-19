/**
 * Server 端（SSR 與 /graphql 轉發）連後端用的位址，讀執行期環境變數 INTERNAL_API_HOST。
 * 部署時指向叢集內的 API service；本機開發由 .env.development 提供。
 * 沒有預設值：沒設定就直接丟錯，避免悄悄退回公開網域。
 * 只能在 server 端呼叫，瀏覽器請用相對路徑。
 */
const getServerApiHost = (): string => {
  const host = process.env.INTERNAL_API_HOST;
  if (!host) {
    throw new Error('INTERNAL_API_HOST is not set');
  }
  return host;
};

export default getServerApiHost;
