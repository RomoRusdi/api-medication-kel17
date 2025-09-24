import { MedicationModel } from "../models/medicationModel.js"; 

export const MedicationController = { 
  async getAll(req, res) { 
    try { 
      const meds = await MedicationModel.getAll(); 
      res.json(meds); 
    } catch (err) { 
      res.status(500).json({ error: err.message }); 
    } 
  }, 

  async getById(req, res) { 
    try { 
      const med = await MedicationModel.getById(req.params.id); 
      res.json(med); 
    } catch (err) { 
      res.status(404).json({ error: err.message }); 
    } 
  }, 

  async create(req, res) { 
    try { 
      const med = await MedicationModel.create(req.body); 
      res.status(201).json(med); 
    } catch (err) { 
      res.status(400).json({ error: err.message }); 
    } 
  }, 

  async update(req, res) { 
    try { 
      const med = await MedicationModel.update(req.params.id, req.body); 
      res.json(med); 
    } catch (err) { 
      res.status(400).json({ error: err.message }); 
    } 
  }, 

  async remove(req, res) { 
    try { 
      await MedicationModel.remove(req.params.id); 
      res.json({ message: "Deleted successfully" }); 
    } catch (err) { 
      res.status(400).json({ error: err.message }); 
    } 
  }, 
  async searchByName(req, res) { 

  try { 

    const { name } = req.query;  

    const results = await MedicationModel.searchByName(name); 

    res.json(results); 

  } catch (err) { 

    res.status(400).json({ error: err.message }); 

  } 

},
async getPaginated(req, res) { 

  try { 

    const page = parseInt(req.query.page) || 1; 

    const limit = parseInt(req.query.limit) || 5; 

    const results = await MedicationModel.getPaginated(page, limit); 

    res.json(results); 

  } catch (err) { 

    res.status(400).json({ error: err.message }); 

  } 

},
async create(req, res) {
  try {
    const { sku, name, description, category_id, supplier_id, price, quantity } = req.body;

    // Validasi stok dan harga
    if (price < 0) {
      return res.status(400).json({ error: "Harga tidak boleh kurang dari 0" });
    }
    if (quantity < 0) {
      return res.status(400).json({ error: "Stok tidak boleh kurang dari 0" });
    }

    const result = await MedicationModel.create({
      sku, name, description, category_id, supplier_id, price, quantity,
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}, 

async update(req, res) {
  try {
    const { id } = req.params;
    const { sku, name, description, category_id, supplier_id, price, quantity } = req.body;

    // Validasi stok dan harga
    if (price < 0) {
      return res.status(400).json({ error: "Harga tidak boleh kurang dari 0" });
    }
    if (quantity < 0) {
      return res.status(400).json({ error: "Stok tidak boleh kurang dari 0" });
    }

    const result = await MedicationModel.update(id, {
      sku, name, description, category_id, supplier_id, price, quantity,
    });

    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
},
async getTotalCount(req, res) {
  try {
    const total = await MedicationModel.getTotalCount();
    res.json({ total });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
},


}; 
