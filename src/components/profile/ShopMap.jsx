import React, { useState, useEffect } from "react";
import configData from "../../config.json";
import { toast } from "react-toastify";
import http from "../../services/httpService";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function GetIcon(_iconSize) {
  return L.icon({
    iconUrl: require("../../media/marker.png"),
    iconSize: [_iconSize],
  });
}

function ShopMap({ shopName, coordinates }) {
  return (
    <MapContainer center={coordinates} zoom={13} style={{ height: "200px" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coordinates} icon={GetIcon(35)}>
        <Popup>{shopName}</Popup>
      </Marker>
    </MapContainer>
  );
}

export default ShopMap;
