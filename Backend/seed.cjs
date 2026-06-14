const axios = require('axios');

async function seed() {
  try {
    console.log("Creating company...");
    const companyRes = await axios.post('http://localhost:5000/api/companies', {
      name: "Honda",
      email: "support@honda.com"
    });
    const companyId = companyRes.data.data.id;
    console.log("Company created:", companyId);

    console.log("Creating product...");
    const productRes = await axios.post('http://localhost:5000/api/products', {
      name: "Honda Activa 6G",
      category: "Scooter",
      description: "Intelligent troubleshooting powered by official manuals, service documentation, electrical diagrams, and diagnostic workflows.",
      company_id: companyId
    });
    console.log("Product created:", productRes.data.data.id);
    
    console.log("Seeding complete!");
  } catch (err) {
    console.error("Seeding failed:", err.response ? err.response.data : err.message);
  }
}

seed();
