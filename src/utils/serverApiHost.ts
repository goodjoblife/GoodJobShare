import { API_HOST } from 'config';

/**
 * Server 端（SSR 與 /graphql 轉發）連後端用的位址。
 * 部署時以執行期環境變數 INTERNAL_API_HOST 指向叢集內的 API service；
 * 未設定時退回 API_HOST（公開網域）。
 * 只能在 server 端呼叫，瀏覽器請用相對路徑。
 */
const getServerApiHost = (): string =>
  process.env.INTERNAL_API_HOST || API_HOST;

export default getServerApiHost;
