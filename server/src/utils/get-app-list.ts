export const getAppList = async (): Promise<number[]> => {
  const response = await fetch(`https://api.steampowered.com/IStoreService/GetAppList/v1/?key=7790E19EF3A07FE1361D55B037607498&max_results=50000`);
  const appList = await response.json();
  const appIds = appList.response.apps.filter((app: { appid: number, name: string }) => app.appid);

  return appIds;
}