import { getAppData } from "./utils/get-app-data";

const main = async () => {
  console.log(await getAppData(730));

}

main()