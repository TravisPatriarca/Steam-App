import { styled } from "styled-components";
import React from "react";

const AppCard = styled.div`
  border-radius: 5px;
  padding: 5px;
  background-color: white;
  
`;

const AppImg = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 10px;
`;

interface SteamAppProps {
  appid: number
}

export const SteamApp: React.FC<SteamAppProps> = ({ appid }) => {
  return <AppCard>
    <AppImg src={`https://cdn.akamai.steamstatic.com/steam/apps/${appid}/header.jpg`}></AppImg>
  </AppCard>
}