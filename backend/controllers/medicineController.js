const Medicine = require('../models/medicineModel'); 
const axios = require('axios');

exports.getMedicineDetails = async (req, res) => {
  const { name } = req.params;

  try {
    console.log(`Fetching details for medicine: ${name}`); // Debug log

    // Fetch local database data (if applicable)
    const localData = await Medicine.getMedicineByName(name);
    
    console.log("Fetching data from OpenFDA API..."); // Debug log

    // Fetch external API data
    const apiResponse = await axios.get(`https://api.fda.gov/drug/label.json?search=${name}`);

    console.log("Received response from OpenFDA:", apiResponse.data); // Log API response

    // Ensure API data exists before sending response
    if (!apiResponse.data || !apiResponse.data.results) {
      return res.status(404).json({ error: 'No data found in OpenFDA' });
    }

    // Send response with local and API data
    res.json({
      localData,
      apiData: apiResponse.data.results // Send only the `results` array
    });

  } catch (error) {
    console.error("Error fetching medicine details:", error);

    res.status(500).json({ 
        error: 'Error fetching medicine details', 
        details: error.response ? error.response.data : error.message 
    });
  }
};
