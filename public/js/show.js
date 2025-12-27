const mapDiv = document.getElementById("map");
let map;

if (mapDiv) {
  map = L.map("map").setView([28.6139, 77.2090], 13);

  // Add OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(map);
  const listing = window.listingData;
  if (listing && listing.location) {
    const q = encodeURIComponent(listing.location);
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${q}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          const latNum = parseFloat(lat);
          const lonNum = parseFloat(lon);
          map.setView([latNum, lonNum], 13);
          const marker = L.marker([latNum, lonNum]).addTo(map);
          marker.bindPopup(`<b>${listing.title}</b><br>₹${listing.price}/night`).openPopup();
        } else {
          // fallback marker at default position
          const marker = L.marker([28.6139, 77.2090]).addTo(map);
          marker.bindPopup(`<b>${listing.title || 'Listing'}</b><br>₹${listing.price || ''}/night`);
        }
      })
      .catch(() => {
        const marker = L.marker([28.6139, 77.2090]).addTo(map);
        marker.bindPopup(`<b>${listing.title || 'Listing'}</b><br>₹${listing.price || ''}/night`);
      });
  } else {
    // no listing data: show default marker
    const marker = L.marker([28.6139, 77.2090]).addTo(map);
    marker.bindPopup("<b>Cozy Room</b><br>₹1200/night");
  }
};