export interface SHGProduct {
  id: string;
  name: string;
  brandName: string;
  category: 'Wild Honey' | 'Kurkuti & Traditional Foods' | 'Wild Mushrooms (Chhatu)' | 'Jhuna & Natural Resins' | 'Forest Arrowroot (Palua)' | 'Wild Edible Leaves (Saga)' | 'Sabai Grass & Crafts' | 'Sal Leaf Eco-Tableware';
  manufacturerSHG: string;
  sourceArea: string;
  edcVillage: string;
  forestDivision: string;
  netWeight: string;
  mrp: number;
  salePrice: number;
  rating: number;
  reviewsCount: number;
  productBatch: string;
  batchNumber: string;
  harvestDate: string;
  dateOfPackaging: string;
  bestBefore: string;
  fssaiLicense: string;
  certifications: string[];
  stockStatus: 'In Stock' | 'Limited Stock' | 'Fresh Seasonal Harvest';
  description: string;
  benefits: string[];
  ingredientsOrMaterials: string;
  shgStory: string;
  shgLeader: string;
  womenBeneficiaries: number;
  image: string;
  thankYouMessage: string;
  customerCare: string;
  email: string;
  website: string;
  tigerConservationNote: string;
}

export const shgProducts: SHGProduct[] = [
  {
    id: "SIM-HON-2026-000125",
    name: "Similipal Wild Forest Honey",
    brandName: "Similipal Natural Products",
    category: "Wild Honey",
    manufacturerSHG: "Maa Tarini SHG, Gudgudia Village",
    sourceArea: "Similipal Forest Landscape",
    edcVillage: "Gudgudia Village & EDC",
    forestDivision: "Similipal North / South Division",
    netWeight: "500 gm",
    mrp: 480,
    salePrice: 395,
    rating: 4.9,
    reviewsCount: 184,
    productBatch: "HON-B001",
    batchNumber: "SFH-2026-001",
    harvestDate: "05-Oct-2026",
    dateOfPackaging: "12-Oct-2026",
    bestBefore: "24 Months",
    fssaiLicense: "12024999000182",
    certifications: [
      "100% Raw Wild Forest Harvest",
      "Tiger Habitat Co-existence Certified",
      "FSSAI Approved",
      "Zero Added Sugar or Adulteration",
      "Cold Processed & Filtered"
    ],
    stockStatus: "In Stock",
    description: "Sustainably harvested raw wild forest Mahua & multifloral honey collected by tribal honey hunter families from the biodiverse forests of Similipal Tiger Reserve. Packed with natural pollen, therapeutic enzymes, and the authentic wild taste of Mayurbhanj.",
    benefits: [
      "Rich in active wild antioxidants & plant pollen",
      "Natural immunity stimulant and throat soother",
      "Sourced with non-destructive bee comb harvesting methods"
    ],
    ingredientsOrMaterials: "100% Pure Raw Wild Forest Honey (Apis dorsata rock bee nectar)",
    shgStory: "Processed and packed with love by 22 tribal women members of Maa Tarini SHG, Gudgudia. This enterprise creates direct dignified livelihood, reducing forest fire hazards and keeping the core tiger reserve pristine.",
    shgLeader: "Hemalata Mahanta",
    womenBeneficiaries: 22,
    image: "./products/mahua_honey_pack.jpg",
    thankYouMessage: "Thank you for purchasing Similipal Wild Forest Honey. This product was sustainably harvested from the forests of Similipal and processed by Maa Tarini SHG. Your purchase directly supports forest-dependent communities, women's livelihoods, and biodiversity conservation. For any further queries, please contact our Customer Care Centre +91 1800 123 4567 or email us at support@similipalproducts.in. We will be happy to assist you.",
    customerCare: "+91 1800 123 4567",
    email: "support@similipalproducts.in",
    website: "www.similipalproducts.in",
    tigerConservationNote: "🐅 Similipal Tiger Reserve Heritage: Every bottle protects the natural sanctuary of the world's only wild Melanistic (Black) Royal Bengal Tigers. By providing forest-fringe tribal women with fair NTFP income, this initiative eliminates illegal extraction and strengthens community anti-poaching vigilance."
  },
  {
    id: "SIM-KAI-2026-000214",
    name: "Mayurbhanj Kurkuti (Kai Chutney - Red Weaver Ant)",
    brandName: "Similipal Tribal Heritage",
    category: "Kurkuti & Traditional Foods",
    manufacturerSHG: "Maa Hingula Tribal Producer SHG",
    sourceArea: "Jashipur Buffer Forests, Similipal",
    edcVillage: "Jashipur Range Fringe EDC",
    forestDivision: "Karanjia Division",
    netWeight: "250 gm",
    mrp: 350,
    salePrice: 280,
    rating: 4.9,
    reviewsCount: 195,
    productBatch: "KAI-B002",
    batchNumber: "SKC-2026-002",
    harvestDate: "04-Oct-2026",
    dateOfPackaging: "11-Oct-2026",
    bestBefore: "6 Months",
    fssaiLicense: "12025001000781",
    certifications: [
      "Geographical Indication (GI) Mayurbhanj Kai Chutney",
      "Rich in Natural Formic Acid & Zinc",
      "Traditional Indigenous Tribal Recipe"
    ],
    stockStatus: "In Stock",
    description: "The celebrated Geographical Indication (GI) tagged savory forest delicacy of Mayurbhanj. Prepared from sustainably harvested indigenous red weaver ants (Oecophylla smaragdina) and their brood, blended with roasted mustard, garlic, wild ginger, and forest chilies.",
    benefits: [
      "High natural protein, zinc, vitamin B12, and iron",
      "Traditional tribal remedy for common colds, joint aches, and vitality",
      "Deep savory citrus-umami taste profile"
    ],
    ingredientsOrMaterials: "Cleaned Red Weaver Ants (Kai/Kurkuti), Forest Garlic, Mustard, Green Chilies, Ginger, Salt",
    shgStory: "Hand-pounded by 24 tribal women following centuries of Santhali and Ho cultural knowledge, championing indigenous superfood heritage.",
    shgLeader: "Sumati Majhi",
    womenBeneficiaries: 24,
    image: "./products/kurkuti.jpg",
    thankYouMessage: "Thank you for experiencing the GI-tagged Mayurbhanj Kurkuti Kai Chutney. Your purchase empowers Similipal tribal collectors and preserves centuries-old indigenous gastronomic traditions.",
    customerCare: "+91 1800 123 4567",
    email: "support@similipalproducts.in",
    website: "www.similipalproducts.in",
    tigerConservationNote: "🐅 Habitat Protection: Red weaver ants play an essential role in biological pest control within the Sal canopy of Similipal Tiger Reserve, maintaining the ecological balance of tiger prey habitats."
  },
  {
    id: "SIM-MUSH-2026-000308",
    name: "Fresh Similipal Wild Forest Mushrooms (Ruguda & Chhatu)",
    brandName: "Similipal Banashree",
    category: "Wild Mushrooms (Chhatu)",
    manufacturerSHG: "Durgadevi Forest Produce SHG",
    sourceArea: "Gudgudia Moist Sal Canopy, Similipal",
    edcVillage: "Gudgudia EDC",
    forestDivision: "Similipal South Forest Division",
    netWeight: "500 gm",
    mrp: 320,
    salePrice: 260,
    rating: 4.8,
    reviewsCount: 84,
    productBatch: "MSH-B003",
    batchNumber: "SMR-2026-003",
    harvestDate: "08-Oct-2026",
    dateOfPackaging: "09-Oct-2026",
    bestBefore: "5 Days (Fresh Harvest)",
    fssaiLicense: "12025001000344",
    certifications: [
      "Wild Foraged NTFP",
      "100% Pesticide & Fertilizer Free",
      "High Plant Protein & Beta-Glucans"
    ],
    stockStatus: "Fresh Seasonal Harvest",
    description: "Wild earthball puffball mushrooms (locally known as Ruguda) and forest canopy Chhatu gathered from the moist Sal forest floor at the onset of monsoon rains. Renowned for their earthy, nutty, meaty texture and exceptional nutritional profile.",
    benefits: [
      "Rich in complete proteins, potassium, and dietary fiber",
      "Zero cholesterol and natural immunity enhancing beta-glucans",
      "Prized culinary jewel of northern Odisha tribal cuisine"
    ],
    ingredientsOrMaterials: "Freshly foraged wild Ruguda & Sal Forest Chhatu mushrooms",
    shgStory: "Gathered early at dawn by 20 tribal women members who know the secret forest groves, sorted, cleaned, and packed under strict hygiene standards.",
    shgLeader: "Kuntala Murmu",
    womenBeneficiaries: 20,
    image: "./products/wild_mushrooms.jpg",
    thankYouMessage: "Thank you for purchasing wild forest Ruguda & Chhatu. Your support provides direct seasonal income to tribal women foragers across the southern Similipal buffer ranges.",
    customerCare: "+91 1800 123 4567",
    email: "support@similipalproducts.in",
    website: "www.similipalproducts.in",
    tigerConservationNote: "🐅 Healthy Forest Ecosystem: Mycorrhizal fungi like Ruguda are indicators of pristine, unpolluted old-growth Sal forest soil essential for tiger biodiversity."
  },
  {
    id: "SIM-JHN-2026-000412",
    name: "Pure Similipal Sal Jhuna (Natural Dammar Resin)",
    brandName: "Similipal Sacred Groves",
    category: "Jhuna & Natural Resins",
    manufacturerSHG: "Vanadurgi Mahila Samiti",
    sourceArea: "Thakurmunda Buffer Forest, Similipal",
    edcVillage: "Thakurmunda Range EDC",
    forestDivision: "Similipal South Forest Division",
    netWeight: "150 gm",
    mrp: 260,
    salePrice: 210,
    rating: 4.9,
    reviewsCount: 142,
    productBatch: "JHN-B004",
    batchNumber: "SJH-2026-004",
    harvestDate: "28-Sep-2026",
    dateOfPackaging: "10-Oct-2026",
    bestBefore: "Indefinite Natural Shelf Life",
    fssaiLicense: "NTFP-OD-2025-Jhuna-54",
    certifications: [
      "100% Pure Sal Dammar (Shorea robusta)",
      "Zero Charcoal Adulteration",
      "Sustainably Foraged from Fallen Exudates"
    ],
    stockStatus: "In Stock",
    description: "Grade-A aromatic resin tears exuded naturally by mature Sal trees (Shorea robusta) in Similipal. When placed on burning embers, it releases a heavenly, balsamic, purifying forest fragrance with therapeutic properties.",
    benefits: [
      "Cleanses ambient air and repels mosquitoes and insects naturally",
      "Creates a serene, meditative sacred atmosphere",
      "Calms anxiety and respiratory discomfort"
    ],
    ingredientsOrMaterials: "100% Pure Wild Sal Tree Dammar Resin Crystals",
    shgStory: "Hand-picked by 16 women who gather only naturally dried exuded tears without damaging tree barks, promoting sustainable forest stewardship.",
    shgLeader: "Basanti Hembram",
    womenBeneficiaries: 16,
    image: "./products/sal_jhuna.jpg",
    thankYouMessage: "Thank you for purchasing pure Similipal Sal Jhuna. Your purchase preserves sacred tribal forest rituals and ensures trees remain protected from destructive tapping.",
    customerCare: "+91 1800 123 4567",
    email: "support@similipalproducts.in",
    website: "www.similipalproducts.in",
    tigerConservationNote: "🐅 Canopy Guardian: Sal trees provide dense canopy cover for tiger mothers and cubs in Similipal. Sustainable Jhuna collection incentivizes local villagers to guard against illegal logging."
  },
  {
    id: "SIM-PLU-2026-000519",
    name: "Wild Similipal Arrowroot Powder (Forest Palua)",
    brandName: "Mayur Banajata Amrut",
    category: "Forest Arrowroot (Palua)",
    manufacturerSHG: "Maa Tarini Tribal SHG",
    sourceArea: "Talabandha Valley, Similipal",
    edcVillage: "Talabandha EDC",
    forestDivision: "Karanjia Division",
    netWeight: "250 gm",
    mrp: 290,
    salePrice: 240,
    rating: 4.9,
    reviewsCount: 112,
    productBatch: "PLU-B005",
    batchNumber: "SPL-2026-005",
    harvestDate: "15-Sep-2026",
    dateOfPackaging: "08-Oct-2026",
    bestBefore: "24 Months",
    fssaiLicense: "12025001000889",
    certifications: [
      "100% Wild Tuber Starch",
      "Natural Digestive Cooler",
      "Zero Preservatives or Chemical Bleach"
    ],
    stockStatus: "In Stock",
    description: "Traditional forest Palua extracted from deep forest arrowroot tubers using ancient natural sedimentation and spring-water decanting methods. Yields a pure, silky white gluten-free starch widely praised as a therapeutic cooling food.",
    benefits: [
      "Instant digestive relief for acidity, ulcers, and dehydration",
      "Safe, easily digestible weaning food for babies and elders",
      "Excellent silky natural thickener for healthy puddings"
    ],
    ingredientsOrMaterials: "100% Pure Wild Arrowroot Tuber Starch (Maranta arundinacea)",
    shgStory: "Hand-processed by 14 Santhali women artisans through labor-intensive traditional water washing and sun-drying in clean solar tunnels.",
    shgLeader: "Shanti Soren",
    womenBeneficiaries: 14,
    image: "./products/arrowroot_palua.jpg",
    thankYouMessage: "Thank you for purchasing pure forest Palua. Your purchase revitalizes ancient botanical culinary wisdom and supports women tuber cultivators of Similipal.",
    customerCare: "+91 1800 123 4567",
    email: "support@similipalproducts.in",
    website: "www.similipalproducts.in",
    tigerConservationNote: "🐅 Biodiversity Conservation: Wild root foraging in buffer agroforestry plots reduces human encroachment into core tiger breeding zones."
  },
  {
    id: "SIM-SGA-2026-000627",
    name: "Wild Edible Forest Leaves (Fresh Saga Assortment)",
    brandName: "Similipal Forest Greens",
    category: "Wild Edible Leaves (Saga)",
    manufacturerSHG: "Subhalaxmi Mahila Mandal",
    sourceArea: "Chahala Stream Beds, Similipal",
    edcVillage: "Chahala Buffer EDC",
    forestDivision: "Karanjia Division",
    netWeight: "Fresh Assorted Bundle",
    mrp: 140,
    salePrice: 99,
    rating: 4.8,
    reviewsCount: 77,
    productBatch: "SGA-B006",
    batchNumber: "SSG-2026-006",
    harvestDate: "10-Oct-2026",
    dateOfPackaging: "11-Oct-2026",
    bestBefore: "3 Days (Fresh Harvest)",
    fssaiLicense: "12024999000511",
    certifications: [
      "Naturally Organic Wild Forest Greens",
      "Uncultivated Nutrient-Dense Biodiversity",
      "Chemical-Free Spring Water Harvest"
    ],
    stockStatus: "Fresh Seasonal Harvest",
    description: "A freshly picked bundle of indigenous uncultivated forest leafy greens collected from clean Similipal streams and understory groves: Sunsunia saga (Marsilea quadrifolia), Korda saga, and Gandhari saga. Bursting with micronutrients and ancient herbal flavors.",
    benefits: [
      "Promotes sound restful sleep and nervous system relaxation",
      "High calcium, folate, and carotenoid content",
      "Authentic rural Odia culinary treasure"
    ],
    ingredientsOrMaterials: "Similipal Stream Sunsunia Saga, Forest Korda Saga, Gandhari Leaves",
    shgStory: "Provides steady morning income to 19 tribal women who forage wild greens along natural spring beds and deliver them fresh to local and urban hubs.",
    shgLeader: "Parbati Majhi",
    womenBeneficiaries: 19,
    image: "./products/wild_edible_leaves.jpg",
    thankYouMessage: "Thank you for relishing Similipal wild edible saga. Every purchase helps protect clean natural freshwater springs in the tiger reserve buffer areas.",
    customerCare: "+91 1800 123 4567",
    email: "support@similipalproducts.in",
    website: "www.similipalproducts.in",
    tigerConservationNote: "🐅 Riparian Habitat Health: Pristine streams where Sunsunia saga grows are vital waterholes for tigers, leopards, and wild elephants during summer months."
  },
  {
    id: "SIM-SAB-2026-000735",
    name: "Handcrafted Sabai Grass Multiutility Baskets (Set of 2)",
    brandName: "Mayur Golden Fibre",
    category: "Sabai Grass & Crafts",
    manufacturerSHG: "Maa Tarini Sabai Producers Union",
    sourceArea: "Morada & Pithabata Plateau, Mayurbhanj",
    edcVillage: "Pithabata EDC, Morada",
    forestDivision: "Baripada Division",
    netWeight: "850 gm (Set of 2 Baskets)",
    mrp: 950,
    salePrice: 799,
    rating: 4.9,
    reviewsCount: 138,
    productBatch: "SAB-B007",
    batchNumber: "SSB-2026-007",
    harvestDate: "20-Sep-2026",
    dateOfPackaging: "05-Oct-2026",
    bestBefore: "Lifetime Handcrafted",
    fssaiLicense: "Craft-MSME/OD/2025/119",
    certifications: [
      "Geographical Indication (GI) Mayurbhanj Sabai Grass",
      "Natural Vegetable Mineral Dyes",
      "Zero Plastic Storage"
    ],
    stockStatus: "In Stock",
    description: "Artisan-braided and coiled from high-tensile Sabai grass (golden fiber of Mayurbhanj). Features geometric tribal borders and tight weaving that makes them exceptionally durable, washable, and eco-friendly.",
    benefits: [
      "Washable, moisture-resistant, and sturdy for years",
      "Biodegradable aesthetic storage for planters, laundry, and pantry",
      "Preserves tribal weaving heritage"
    ],
    ingredientsOrMaterials: "100% Natural Mayurbhanj Sabai Grass (Eulaliopsis binata) & Cotton Yarn",
    shgStory: "Created by 35 tribal women artisans who transform indigenous grass into high-value designer craft, providing financial independence.",
    shgLeader: "Hemalata Tudu",
    womenBeneficiaries: 35,
    image: "./products/sabai_grass_baskets.jpg",
    thankYouMessage: "Thank you for bringing home Mayurbhanj Sabai grass art. You are sustaining centuries of indigenous handicraft excellence.",
    customerCare: "+91 1800 123 4567",
    email: "support@similipalproducts.in",
    website: "www.similipalproducts.in",
    tigerConservationNote: "🐅 Agroforestry Barrier: Sabai grass cultivation along forest fringes acts as an eco-buffer zone, minimizing wildlife conflict along the Similipal border."
  },
  {
    id: "SIM-PAT-2026-000843",
    name: "Eco-Pressed Sal Leaf (Siali Patra) Banquet Dinnerware",
    brandName: "Banashree Greenware",
    category: "Sal Leaf Eco-Tableware",
    manufacturerSHG: "Shakti Tribal Women Cluster",
    sourceArea: "Bangiriposi Forest Fringe, Similipal",
    edcVillage: "Bangiriposi EDC",
    forestDivision: "Baripada Division",
    netWeight: "Pack of 50 Plates & 50 Bowls",
    mrp: 380,
    salePrice: 299,
    rating: 4.8,
    reviewsCount: 92,
    productBatch: "PAT-B008",
    batchNumber: "SSP-2026-008",
    harvestDate: "25-Sep-2026",
    dateOfPackaging: "06-Oct-2026",
    bestBefore: "12 Months Storage",
    fssaiLicense: "EcoPack-Reg-9014",
    certifications: [
      "100% Home Compostable within 30 Days",
      "Thermal Molded without Chemicals",
      "Forest Fire Preventive Collection"
    ],
    stockStatus: "In Stock",
    description: "Hygienically pressed tableware made from mature, shed forest Sal leaves (Shorea robusta) and Siali vine leaves. Perfect for festivals, catering, and home dining, eliminating single-use plastic and paper waste.",
    benefits: [
      "Biodegrades naturally in backyards within 30 days",
      "Leak-proof and heat-resistant for hot gravies and curries",
      "Infuses a mild, pleasant forest aroma into hot food"
    ],
    ingredientsOrMaterials: "100% Fallen Similipal Sal Leaves & Siali Fibers",
    shgStory: "Collected by 22 tribal women from forest buffer zones, helping clear dry forest leaf litter to prevent wild summer fires while earning fair wages.",
    shgLeader: "Malati Marndi",
    womenBeneficiaries: 22,
    image: "./products/sal_leaf_plates.jpg",
    thankYouMessage: "Thank you for choosing compostable Sal leaf dinnerware. Your choice reduces single-use plastic pollution across Odisha and supports tribal women forest gatherers.",
    customerCare: "+91 1800 123 4567",
    email: "support@similipalproducts.in",
    website: "www.similipalproducts.in",
    tigerConservationNote: "🐅 Fire Hazard Prevention: Gathering dry fallen Sal leaves in pre-summer clears combustible leaf litter, significantly decreasing forest fire outbreaks in Similipal tiger corridors."
  }
];

export function buildQRPayload(product: SHGProduct, originUrl: string): string {
  const cleanBase = originUrl.split('#')[0].replace(/\/+$/, '');
  const verificationLink = `${cleanBase}/#/products?productId=${product.id}`;
  return `Product: ${product.name}\nProduct ID: ${product.id}\nDate of Packaging: ${product.dateOfPackaging}\nProduced By: ${product.manufacturerSHG}\nWeb Link: ${verificationLink}`;
}
