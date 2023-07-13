import { SteamApp } from "./steam-app";
import { collection, getDocs, QuerySnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { useEffect, useState } from "react";
import { styled } from "styled-components"

const AppGrid = styled.div`
  background-color: darkgrey;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(462px, 1fr));
  grid-gap: 10px;
`;

export const SteamAppGrid = () => {
  const [appData, setAppData] = useState<QuerySnapshot | null>()

  useEffect(() => {
    const fetchFirebaseAppData = async () => {
      const querySnapshot = await getDocs(collection(db, `apps`));
      setAppData(querySnapshot);
    }
    fetchFirebaseAppData();
  }, []);

  if (!appData) return <div>Loading Data...</div>

  return <AppGrid>
    {appData.docs.map((doc) => <SteamApp appid={doc.get(`appid`)}></SteamApp>)}
  </AppGrid> 
}