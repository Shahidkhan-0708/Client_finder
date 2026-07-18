const { fetchFromOverPass } = require("../overpass/api");
const Search = require("../models/s");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");

const handleSearch = asyncHandler(async (req, res) => {
  const { city, type } = req.query;

  await Search.create({
    city,
    businessType: type,
  });

  const businesses = await fetchFromOverPass({ city, businessType: type });

  return sendSuccess(res, 200, "Businesses fetched successfully", {
    businesses,
  });
});

module.exports={
    handleSearch,
}
