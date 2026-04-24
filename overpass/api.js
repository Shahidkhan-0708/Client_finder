async function fetchFromOverPass({city,businessType}){
 const overpassQuery=`
 [out:json];
 area[name="${city}"]->.a;
 node(area.a)["amenity"="${businessType}"];
 out body;
 `;
 const res = await fetch("https://overpass-api.de/api/interpreter", {
  method: "POST",
   headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": "ClientFinder/1.0"
  },
  body:new URLSearchParams({data:overpassQuery})
});
const text = await res.text();
console.log("Status",res.status);
console.log("Response: ",text.substring(0,500))
const data=JSON.parse(text)

if (!data.elements || data.elements.length === 0) {
  return [];
}
const businesses=data.elements.map((ele) => ({
  name:ele.tags?.name||null,
  phone:ele.tags?.phone||null,
   website:ele.tags?.website||null,
  email:ele.tags?.email||null,
  lat:ele.lat,
  lon:ele.lon,
}
))
return businesses;
}

module.exports={fetchFromOverPass};