import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";
import { ACI_DATA, getUniqueBrands, getModelsByBrand, findVehicle } from "./aci_data.ts";

const app = new Hono();

app.use('*', logger(console.log));

app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check
app.get("/make-server-3061b741/health", (c) => {
  return c.json({ status: "ok" });
});

// Join Waitlist endpoint (driver form)
app.post("/make-server-3061b741/join-waitlist", async (c) => {
  try {
    const body = await c.req.json();
    const { email, name, lastname, phone, city, role, vehicle_model, source } = body;

    if (!email) {
      return c.json({ error: "Email is required" }, 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { error } = await supabase
      .from('leads')
      .upsert({
        email,
        first_name: name || "",
        last_name: lastname || "",
        phone: phone || "",
        city: city || "",
        role: role || "owner",
        vehicle_model: vehicle_model || "",
        source: source || "organic", // ← salvato
      }, { onConflict: 'email', ignoreDuplicates: true });

    if (error) {
      console.error("Supabase error:", error);
      return c.json({ error: error.message, code: error.code }, 400);
    }

    return c.json({ success: true, message: "Joined waitlist successfully" });
  } catch (error) {
    console.error("Error joining waitlist:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Check Vehicle Eligibility endpoint
app.post("/make-server-3061b741/check-vehicle-eligibility", async (c) => {
  try {
    const body = await c.req.json();
    const { plate } = body;

    if (!plate) {
      return c.json({ error: "Plate is required" }, 400);
    }

    const cleanPlate = plate.toUpperCase().replace(/[^A-Z0-9]/g, "");

    const mockDb = [
      { model: "Fiat 500", year: 2021, dailyRate: 35, segment: "City Car" },
      { model: "Jeep Renegade", year: 2020, dailyRate: 48, segment: "SUV" },
      { model: "Toyota Yaris Hybrid", year: 2022, dailyRate: 42, segment: "City Car" },
      { model: "Volkswagen Golf", year: 2019, dailyRate: 45, segment: "Compact" },
      { model: "Audi A3 Sportback", year: 2021, dailyRate: 55, segment: "Premium" },
      { model: "Tesla Model 3", year: 2022, dailyRate: 85, segment: "Electric" },
      { model: "Ford Puma", year: 2021, dailyRate: 44, segment: "SUV" },
      { model: "Peugeot 208", year: 2020, dailyRate: 38, segment: "City Car" },
    ];

    let hash = 0;
    for (let i = 0; i < cleanPlate.length; i++) {
      hash += cleanPlate.charCodeAt(i);
    }
    const vehicle = mockDb[hash % mockDb.length];

    const key = `vehicle_lookup:${cleanPlate}`;
    const value = {
      plate: cleanPlate,
      ...vehicle,
      timestamp: new Date().toISOString(),
      status: "eligible"
    };

    await kv.set(key, value);

    const baseRate = 30;
    let multiplier = 1;
    const luxuryBrands = ['Tesla', 'Audi', 'BMW', 'Mercedes'];
    const midBrands = ['Volkswagen', 'Jeep', 'Toyota', 'Ford', 'Peugeot'];
    const brand = vehicle.model.split(' ')[0];

    if (luxuryBrands.includes(brand)) multiplier = 2.5;
    else if (midBrands.includes(brand)) multiplier = 1.5;

    const dailyEarning = Math.round(baseRate * multiplier);
    const monthlyEarning = dailyEarning * 10;
    const yearlyEarning = monthlyEarning * 12;

    return c.json({
      success: true,
      vehicle: value,
      earnings: { daily: dailyEarning, monthly: monthlyEarning, yearly: yearlyEarning, currency: "€" }
    });
  } catch (error) {
    console.error("Error checking vehicle:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Calculate Earnings Endpoint
app.post("/make-server-3061b741/calculate-earnings", async (c) => {
  try {
    const body = await c.req.json();
    const { brand, model } = body;

    if (!brand || !model) {
      return c.json({ error: "Brand and Model are required" }, 400);
    }

    const vehicle = findVehicle(brand, model);
    let monthlyEarning = 0;
    let yearlyEarning = 0;

    if (vehicle) {
      const estimatedDailyRate = Math.round(vehicle.cost_per_km * 80);
      const utilizationDays = 10;
      monthlyEarning = estimatedDailyRate * utilizationDays;
      yearlyEarning = monthlyEarning * 12;
    } else {
      const baseRate = 30;
      let multiplier = 1;
      const luxuryBrands = ['Tesla', 'Audi', 'BMW', 'Mercedes'];
      if (luxuryBrands.includes(brand)) multiplier = 2.0;
      monthlyEarning = Math.round(baseRate * multiplier * 10);
      yearlyEarning = monthlyEarning * 12;
    }

    const result = {
      daily: Math.round(monthlyEarning / 10),
      monthly: monthlyEarning,
      yearly: yearlyEarning,
      currency: "€",
      message: `Con la tua ${brand} ${model} puoi guadagnare fino a ${monthlyEarning}€ al mese!`
    };

    return c.json({ success: true, data: result });
  } catch (error) {
    console.error("Error calculating earnings:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get Car List Endpoint
app.get("/make-server-3061b741/car-models", (c) => {
  const brands = getUniqueBrands();
  const result = brands.map(brand => ({
    brand,
    models: getModelsByBrand(brand)
  }));
  return c.json(result);
});

// Leads endpoint (owner forms)
app.post("/make-server-3061b741/leads", async (c) => {
  try {
    const body = await c.req.json();
    const { email, first_name, last_name, phone, city, source } = body;

    if (!email) {
      return c.json({ error: "Email is required" }, 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { error } = await supabase
      .from('leads')
      .insert({
        first_name,
        last_name,
        email,
        phone,
        city,
        source: source || "organic", // ← salvato
      });

    if (error) {
      console.error("Supabase error:", error);
      return c.json({ error: "Failed to save lead: " + error.message, code: error.code }, 500);
    }

    return c.json({ success: true, message: "Lead captured" });
  } catch (error) {
    console.error("Error capturing lead:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

Deno.serve(app.fetch);