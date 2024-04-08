import * as inventoryModel from '../models/inventory.model.js';

const getInventory = async (req, res) => {
  try {
    const inventory = await inventoryModel.getAll();
    res.status(200).send(inventory);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getInventoryItem = async (req, res) => {
  try {
    const inventoryId = req.params.id;
    const inventoryItem = await inventoryModel.getById(inventoryId);
    if (!inventoryItem) {
      return res.status(404).send({ message: 'Inventory item not found' });
    }
    res.status(200).send(inventoryItem);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const createInventoryItem = async (req, res) => {
  try {
    const newInventoryItemData = req.body;
    const inventoryId = await inventoryModel.create(newInventoryItemData);
    res.status(201).send({ id: inventoryId, message: 'Inventory item created successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateInventoryItem = async (req, res) => {
  try {
    const inventoryId = req.params.id;
    const updatedInventoryItemData = req.body;
    const result = await inventoryModel.update(inventoryId, updatedInventoryItemData);
    if (!result) {
      return res.status(404).send({ message: 'Inventory item not found' });
    }
    res.status(200).send({ message: 'Inventory item updated successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteInventoryItem = async (req, res) => {
  try {
    const inventoryId = req.params.id;
    const result = await inventoryModel.remove(inventoryId);
    if (!result) {
      return res.status(404).send({ message: 'Inventory item not found' });
    }
    res.status(200).send({ message: 'Inventory item deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export { getInventory, getInventoryItem, createInventoryItem, updateInventoryItem, deleteInventoryItem };