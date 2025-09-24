import { supabase } from "../config/supabaseClient.js";

export const MedicationModel = {
  async getAll() {
    const { data, error } = await supabase
      .from("medications")
      .select("id, sku, name, description, price, quantity, category_id, supplier_id");

    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("medications")
      .select(
        `
        id, sku, name, description, price, quantity,
        categories ( id, name ),
        suppliers ( id, name, email, phone )
      `
      )
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async create(payload) {
    const { data, error } = await supabase.from("medications").insert([payload]).select();

    if (error) throw error;
    return data[0];
  },

  async update(id, payload) {
    const { data, error } = await supabase.from("medications").update(payload).eq("id", id).select();

    if (error) throw error;
    return data[0];
  },

  async remove(id) {
    const { error } = await supabase.from("medications").delete().eq("id", id);

    if (error) throw error;
    return { success: true };
  },
  async searchByName(name) { 

  const { data, error } = await supabase 

    .from("medications") 

    .select("*") 

    .ilike("name", `%${name}%`);   

 

  if (error) throw error; 

  return data; 

},
async getPaginated(page, limit) { 

  const from = (page - 1) * limit; 

  const to = from + limit - 1; 

 

  const { data, error } = await supabase 

    .from("medications") 

    .select("*") 

    .range(from, to); 

 

  if (error) throw error; 

  return data; 

},
async getTotalCount() {
  const { count, error } = await supabase
    .from("medications")
    .select("*", { count: "exact", head: true });

  if (error) throw error;
  return count;
},

};