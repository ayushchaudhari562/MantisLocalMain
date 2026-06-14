async function seed() {
  try {
    console.log("Creating company...");
    const companyRes = await fetch('http://localhost:5000/api/companies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: "Honda",
        email: "support@honda.com"
      })
    });
    const companyData = await companyRes.json();
    const companyId = companyData.data.id;
    console.log("Company created:", companyId);

    console.log("Creating product...");
    const productRes = await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: "Honda Activa 6G",
        category: "Scooter",
        description: "Intelligent troubleshooting powered by official manuals, service documentation, electrical diagrams, and diagnostic workflows.",
        company_id: companyId
      })
    });
    const productData = await productRes.json();
    console.log("Product created:", productData.data.id);
    
    console.log("Seeding complete!");
  } catch (err) {
    console.error("Seeding failed:", err);
  }
}

seed();
