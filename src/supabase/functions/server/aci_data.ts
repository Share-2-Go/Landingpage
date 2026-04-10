// ACI (Automobile Club d'Italia) Database Structure
// Questo file simula la struttura ufficiale delle tabelle ACI per i costi chilometrici.
// Puoi sostituire questo array con l'export JSON completo delle tabelle ACI 2024.

export interface ACIVehicle {
  brand: string;
  model: string;
  fuel: "Benzina" | "Gasolio" | "GPL" | "Metano" | "Ibrido-Benzina" | "Ibrido-Gasolio" | "Elettrico";
  cost_per_km: number; // Costo chilometrico ACI (es. 0.45€/km)
  fringe_benefit_annual: number; // Valore fringe benefit annuale (base per calcolo tasse, indicatore di valore)
}

export const ACI_DATA: ACIVehicle[] = [
  // ABARTH
  { brand: "ABARTH", model: "500", fuel: "Benzina", cost_per_km: 0.52, fringe_benefit_annual: 2100 },
  { brand: "ABARTH", model: "595", fuel: "Benzina", cost_per_km: 0.58, fringe_benefit_annual: 2350 },
  { brand: "ABARTH", model: "595 Competizione", fuel: "Benzina", cost_per_km: 0.62, fringe_benefit_annual: 2500 },
  { brand: "ABARTH", model: "595 Turismo", fuel: "Benzina", cost_per_km: 0.60, fringe_benefit_annual: 2450 },
  
  // ALFA ROMEO
  { brand: "ALFA ROMEO", model: "Giulia", fuel: "Gasolio", cost_per_km: 0.65, fringe_benefit_annual: 2800 },
  { brand: "ALFA ROMEO", model: "Giulia Veloce", fuel: "Gasolio", cost_per_km: 0.70, fringe_benefit_annual: 3000 },
  { brand: "ALFA ROMEO", model: "Stelvio", fuel: "Gasolio", cost_per_km: 0.72, fringe_benefit_annual: 3100 },
  { brand: "ALFA ROMEO", model: "Stelvio Veloce", fuel: "Gasolio", cost_per_km: 0.76, fringe_benefit_annual: 3300 },
  { brand: "ALFA ROMEO", model: "Tonale", fuel: "Ibrido-Benzina", cost_per_km: 0.58, fringe_benefit_annual: 2500 },
  { brand: "ALFA ROMEO", model: "Tonale Speciale", fuel: "Ibrido-Benzina", cost_per_km: 0.62, fringe_benefit_annual: 2650 },
  
  // AUDI
  { brand: "AUDI", model: "A1 Sportback", fuel: "Benzina", cost_per_km: 0.55, fringe_benefit_annual: 2200 },
  { brand: "AUDI", model: "A1 Citycarver", fuel: "Benzina", cost_per_km: 0.57, fringe_benefit_annual: 2300 },
  { brand: "AUDI", model: "A3 Sportback", fuel: "Gasolio", cost_per_km: 0.59, fringe_benefit_annual: 2400 },
  { brand: "AUDI", model: "A3 Sedan", fuel: "Gasolio", cost_per_km: 0.60, fringe_benefit_annual: 2450 },
  { brand: "AUDI", model: "A4 Avant", fuel: "Gasolio", cost_per_km: 0.68, fringe_benefit_annual: 2900 },
  { brand: "AUDI", model: "A4 Sedan", fuel: "Gasolio", cost_per_km: 0.66, fringe_benefit_annual: 2850 },
  { brand: "AUDI", model: "Q3", fuel: "Ibrido-Gasolio", cost_per_km: 0.68, fringe_benefit_annual: 2900 },
  { brand: "AUDI", model: "Q3 Sportback", fuel: "Ibrido-Gasolio", cost_per_km: 0.70, fringe_benefit_annual: 3000 },
  { brand: "AUDI", model: "Q5", fuel: "Gasolio", cost_per_km: 0.78, fringe_benefit_annual: 3400 },
  { brand: "AUDI", model: "Q5 Sportback", fuel: "Gasolio", cost_per_km: 0.80, fringe_benefit_annual: 3500 },
  
  // BMW
  { brand: "BMW", model: "Serie 1", fuel: "Gasolio", cost_per_km: 0.60, fringe_benefit_annual: 2500 },
  { brand: "BMW", model: "Serie 1 M Sport", fuel: "Gasolio", cost_per_km: 0.63, fringe_benefit_annual: 2600 },
  { brand: "BMW", model: "Serie 2 Active Tourer", fuel: "Benzina", cost_per_km: 0.58, fringe_benefit_annual: 2400 },
  { brand: "BMW", model: "Serie 2 Gran Coupé", fuel: "Gasolio", cost_per_km: 0.61, fringe_benefit_annual: 2550 },
  { brand: "BMW", model: "Serie 3", fuel: "Gasolio", cost_per_km: 0.68, fringe_benefit_annual: 2900 },
  { brand: "BMW", model: "Serie 3 Touring", fuel: "Gasolio", cost_per_km: 0.70, fringe_benefit_annual: 3000 },
  { brand: "BMW", model: "X1", fuel: "Ibrido-Benzina", cost_per_km: 0.65, fringe_benefit_annual: 2700 },
  { brand: "BMW", model: "X1 xDrive", fuel: "Ibrido-Benzina", cost_per_km: 0.67, fringe_benefit_annual: 2800 },
  { brand: "BMW", model: "X3", fuel: "Gasolio", cost_per_km: 0.75, fringe_benefit_annual: 3200 },
  { brand: "BMW", model: "X3 M Sport", fuel: "Gasolio", cost_per_km: 0.78, fringe_benefit_annual: 3350 },
  
  // FIAT
  { brand: "FIAT", model: "Panda", fuel: "Ibrido-Benzina", cost_per_km: 0.38, fringe_benefit_annual: 1500 },
  { brand: "FIAT", model: "Panda Cross", fuel: "Ibrido-Benzina", cost_per_km: 0.40, fringe_benefit_annual: 1600 },
  { brand: "FIAT", model: "500", fuel: "Ibrido-Benzina", cost_per_km: 0.42, fringe_benefit_annual: 1700 },
  { brand: "FIAT", model: "500 Cabrio", fuel: "Ibrido-Benzina", cost_per_km: 0.44, fringe_benefit_annual: 1750 },
  { brand: "FIAT", model: "500X", fuel: "Gasolio", cost_per_km: 0.50, fringe_benefit_annual: 2000 },
  { brand: "FIAT", model: "500X Cross", fuel: "Gasolio", cost_per_km: 0.52, fringe_benefit_annual: 2100 },
  { brand: "FIAT", model: "Tipo", fuel: "Gasolio", cost_per_km: 0.48, fringe_benefit_annual: 1900 },
  { brand: "FIAT", model: "Tipo Station Wagon", fuel: "Gasolio", cost_per_km: 0.49, fringe_benefit_annual: 1950 },
  { brand: "FIAT", model: "600", fuel: "Elettrico", cost_per_km: 0.45, fringe_benefit_annual: 1800 },

  // FORD
  { brand: "FORD", model: "Fiesta", fuel: "Benzina", cost_per_km: 0.46, fringe_benefit_annual: 1850 },
  { brand: "FORD", model: "Fiesta Active", fuel: "Benzina", cost_per_km: 0.48, fringe_benefit_annual: 1900 },
  { brand: "FORD", model: "Puma", fuel: "Ibrido-Benzina", cost_per_km: 0.49, fringe_benefit_annual: 1950 },
  { brand: "FORD", model: "Puma ST-Line", fuel: "Ibrido-Benzina", cost_per_km: 0.51, fringe_benefit_annual: 2050 },
  { brand: "FORD", model: "Kuga", fuel: "Ibrido-Benzina", cost_per_km: 0.62, fringe_benefit_annual: 2600 },
  { brand: "FORD", model: "Kuga Vignale", fuel: "Ibrido-Benzina", cost_per_km: 0.65, fringe_benefit_annual: 2700 },

  // JEEP
  { brand: "JEEP", model: "Renegade", fuel: "Ibrido-Benzina", cost_per_km: 0.55, fringe_benefit_annual: 2200 },
  { brand: "JEEP", model: "Renegade Trailhawk", fuel: "Ibrido-Benzina", cost_per_km: 0.58, fringe_benefit_annual: 2350 },
  { brand: "JEEP", model: "Compass", fuel: "Gasolio", cost_per_km: 0.60, fringe_benefit_annual: 2400 },
  { brand: "JEEP", model: "Compass Trailhawk", fuel: "Gasolio", cost_per_km: 0.63, fringe_benefit_annual: 2550 },
  { brand: "JEEP", model: "Avenger", fuel: "Benzina", cost_per_km: 0.48, fringe_benefit_annual: 1950 },

  // LANCIA
  { brand: "LANCIA", model: "Ypsilon", fuel: "Ibrido-Benzina", cost_per_km: 0.40, fringe_benefit_annual: 1600 },

  // MERCEDES
  { brand: "MERCEDES", model: "Classe A", fuel: "Gasolio", cost_per_km: 0.62, fringe_benefit_annual: 2600 },
  { brand: "MERCEDES", model: "Classe A AMG Line", fuel: "Gasolio", cost_per_km: 0.65, fringe_benefit_annual: 2700 },
  { brand: "MERCEDES", model: "Classe B", fuel: "Gasolio", cost_per_km: 0.64, fringe_benefit_annual: 2650 },
  { brand: "MERCEDES", model: "GLA", fuel: "Gasolio", cost_per_km: 0.68, fringe_benefit_annual: 2900 },
  { brand: "MERCEDES", model: "GLA AMG Line", fuel: "Gasolio", cost_per_km: 0.70, fringe_benefit_annual: 3000 },
  { brand: "MERCEDES", model: "GLC", fuel: "Ibrido-Gasolio", cost_per_km: 0.82, fringe_benefit_annual: 3600 },
  { brand: "MERCEDES", model: "GLC Coupé", fuel: "Ibrido-Gasolio", cost_per_km: 0.85, fringe_benefit_annual: 3750 },

  // PEUGEOT
  { brand: "PEUGEOT", model: "208", fuel: "Benzina", cost_per_km: 0.45, fringe_benefit_annual: 1800 },
  { brand: "PEUGEOT", model: "208 GT", fuel: "Benzina", cost_per_km: 0.47, fringe_benefit_annual: 1900 },
  { brand: "PEUGEOT", model: "2008", fuel: "Gasolio", cost_per_km: 0.50, fringe_benefit_annual: 2000 },
  { brand: "PEUGEOT", model: "2008 GT", fuel: "Gasolio", cost_per_km: 0.52, fringe_benefit_annual: 2100 },
  { brand: "PEUGEOT", model: "3008", fuel: "Ibrido-Benzina", cost_per_km: 0.65, fringe_benefit_annual: 2700 },
  { brand: "PEUGEOT", model: "3008 GT", fuel: "Ibrido-Benzina", cost_per_km: 0.68, fringe_benefit_annual: 2850 },

  // RENAULT
  { brand: "RENAULT", model: "Clio", fuel: "Benzina", cost_per_km: 0.44, fringe_benefit_annual: 1750 },
  { brand: "RENAULT", model: "Clio RS Line", fuel: "Benzina", cost_per_km: 0.46, fringe_benefit_annual: 1850 },
  { brand: "RENAULT", model: "Captur", fuel: "Ibrido-Benzina", cost_per_km: 0.48, fringe_benefit_annual: 1900 },
  { brand: "RENAULT", model: "Captur Intens", fuel: "Ibrido-Benzina", cost_per_km: 0.50, fringe_benefit_annual: 2000 },
  { brand: "RENAULT", model: "Arkana", fuel: "Ibrido-Benzina", cost_per_km: 0.55, fringe_benefit_annual: 2200 },

  // TESLA
  { brand: "TESLA", model: "Model 3", fuel: "Elettrico", cost_per_km: 0.65, fringe_benefit_annual: 2500 },
  { brand: "TESLA", model: "Model 3 Long Range", fuel: "Elettrico", cost_per_km: 0.68, fringe_benefit_annual: 2650 },
  { brand: "TESLA", model: "Model 3 Performance", fuel: "Elettrico", cost_per_km: 0.72, fringe_benefit_annual: 2850 },
  { brand: "TESLA", model: "Model Y", fuel: "Elettrico", cost_per_km: 0.70, fringe_benefit_annual: 2800 },
  { brand: "TESLA", model: "Model Y Long Range", fuel: "Elettrico", cost_per_km: 0.73, fringe_benefit_annual: 2950 },

  // TOYOTA
  { brand: "TOYOTA", model: "Yaris", fuel: "Ibrido-Benzina", cost_per_km: 0.44, fringe_benefit_annual: 1750 },
  { brand: "TOYOTA", model: "Yaris GR Sport", fuel: "Ibrido-Benzina", cost_per_km: 0.46, fringe_benefit_annual: 1850 },
  { brand: "TOYOTA", model: "Yaris Cross", fuel: "Ibrido-Benzina", cost_per_km: 0.48, fringe_benefit_annual: 1900 },
  { brand: "TOYOTA", model: "Yaris Cross Adventure", fuel: "Ibrido-Benzina", cost_per_km: 0.50, fringe_benefit_annual: 2000 },
  { brand: "TOYOTA", model: "C-HR", fuel: "Ibrido-Benzina", cost_per_km: 0.58, fringe_benefit_annual: 2300 },
  { brand: "TOYOTA", model: "C-HR GR Sport", fuel: "Ibrido-Benzina", cost_per_km: 0.60, fringe_benefit_annual: 2400 },
  { brand: "TOYOTA", model: "RAV4", fuel: "Ibrido-Benzina", cost_per_km: 0.68, fringe_benefit_annual: 2800 },
  { brand: "TOYOTA", model: "RAV4 Adventure", fuel: "Ibrido-Benzina", cost_per_km: 0.70, fringe_benefit_annual: 2900 },

  // VOLKSWAGEN
  { brand: "VOLKSWAGEN", model: "Polo", fuel: "Benzina", cost_per_km: 0.48, fringe_benefit_annual: 1900 },
  { brand: "VOLKSWAGEN", model: "Polo Style", fuel: "Benzina", cost_per_km: 0.50, fringe_benefit_annual: 2000 },
  { brand: "VOLKSWAGEN", model: "Golf", fuel: "Gasolio", cost_per_km: 0.58, fringe_benefit_annual: 2300 },
  { brand: "VOLKSWAGEN", model: "Golf GTI", fuel: "Benzina", cost_per_km: 0.65, fringe_benefit_annual: 2700 },
  { brand: "VOLKSWAGEN", model: "T-Roc", fuel: "Benzina", cost_per_km: 0.55, fringe_benefit_annual: 2200 },
  { brand: "VOLKSWAGEN", model: "T-Roc R-Line", fuel: "Benzina", cost_per_km: 0.58, fringe_benefit_annual: 2350 },
  { brand: "VOLKSWAGEN", model: "Tiguan", fuel: "Gasolio", cost_per_km: 0.68, fringe_benefit_annual: 2800 },
  { brand: "VOLKSWAGEN", model: "Tiguan R-Line", fuel: "Gasolio", cost_per_km: 0.71, fringe_benefit_annual: 2950 }
];

// Funzione per estrarre il modello base (senza varianti)
function getBaseModel(model: string): string {
    // Rimuove suffissi comuni come: Sportback, Cross, Active, etc.
    const suffixes = [
        'Sportback', 'Sedan', 'Avant', 'Touring', 'Station Wagon', 'Cabrio',
        'Cross', 'Citycarver', 'Active Tourer', 'Gran Coupé', 'Coupé',
        'xDrive', 'M Sport', 'Veloce', 'Speciale', 'Competizione', 'Turismo',
        'Trailhawk', 'AMG Line', 'GT', 'RS Line', 'Intens', 'GR Sport',
        'Adventure', 'Style', 'GTI', 'R-Line', 'Long Range', 'Performance',
        'ST-Line', 'Vignale'
    ];
    
    let baseModel = model.trim();
    
    // Rimuove i suffissi
    for (const suffix of suffixes) {
        if (baseModel.endsWith(suffix)) {
            baseModel = baseModel.substring(0, baseModel.length - suffix.length).trim();
            break;
        }
    }
    
    return baseModel;
}

// Funzione per ottenere le varianti di un modello base
function getModelVariants(brand: string, baseModel: string): string[] {
    return ACI_DATA
        .filter(v => v.brand === brand && getBaseModel(v.model) === baseModel)
        .map(v => v.model);
}

// Funzione helper per ottenere le marche uniche
export function getUniqueBrands() {
    const brands = new Set(ACI_DATA.map(v => v.brand));
    return Array.from(brands).sort();
}

// Funzione helper per ottenere i modelli per marca (versione con raggruppamento)
export function getModelsByBrand(brand: string) {
    const vehicles = ACI_DATA.filter(v => v.brand === brand);
    
    // Raggruppa per modello base
    const modelGroups = new Map<string, string[]>();
    
    vehicles.forEach(v => {
        const baseModel = getBaseModel(v.model);
        if (!modelGroups.has(baseModel)) {
            modelGroups.set(baseModel, []);
        }
        modelGroups.get(baseModel)!.push(v.model);
    });
    
    // Crea l'array di modelli con indicazione delle varianti
    const models = Array.from(modelGroups.entries()).map(([baseModel, variants]) => {
        if (variants.length === 1) {
            // Solo una variante, mostra il nome completo
            return variants[0];
        } else {
            // Multiple varianti, mostra il modello base con indicazione
            const variantNames = variants.map(v => {
                const suffix = v.substring(baseModel.length).trim();
                return suffix;
            }).filter(s => s.length > 0);
            
            if (variantNames.length > 0) {
                return `${baseModel} (${variantNames.join(', ')} o simili)`;
            }
            return baseModel;
        }
    });
    
    return models.sort();
}

// Funzione helper per trovare un veicolo (aggiornata per gestire modelli raggruppati)
export function findVehicle(brand: string, model: string) {
    // Prima cerca una corrispondenza esatta
    let vehicle = ACI_DATA.find(v => v.brand === brand && v.model === model);
    
    if (vehicle) {
        return vehicle;
    }
    
    // Se non trova corrispondenza esatta, cerca per modello base
    // Questo gestisce il caso in cui model è "A1 (Sportback, Citycarver o simili)"
    const baseModelMatch = model.match(/^([^(]+)/);
    if (baseModelMatch) {
        const baseModel = baseModelMatch[1].trim();
        const variants = getModelVariants(brand, baseModel);
        
        if (variants.length > 0) {
            // Restituisce la prima variante trovata (o potresti fare una media)
            return ACI_DATA.find(v => v.brand === brand && v.model === variants[0]);
        }
    }
    
    return undefined;
}