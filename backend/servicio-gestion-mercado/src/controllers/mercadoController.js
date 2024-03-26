// mercadoController.js

// Importar el modelo de mercado
const mercadoModel = require('../models/mercadoModel');

exports.verIngredientesMercado = async (req, res) => {
  try {
    const listaIngredientes = await mercadoModel.verIngredientesMercado();

    res.status(201).json({
      status: 'success',
      resultadosIngredientes: listaIngredientes
    
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
};

exports.verRecetasDisponibles = async (req, res) => {
  try {
    const listaRecetas = await mercadoModel.verRecetasDisponibles();

    res.status(201).json({
      status: 'success',
      resultadosRecetas: listaRecetas
    
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
};

exports.verHistorialCompras = async (req, res) => {
  try {
    const listaHistorial = await mercadoModel.verHistorialCompras();

    res.status(201).json({
      status: 'success',
      resultadosHistorial: listaHistorial
    
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
};

exports.comprarIngrediente = async (req, res) => {
  try {
    const comprarIngrediente= await mercadoModel.comprarIngrediente(req.body);

    res.status(201).json({
      status: 'success',
      resultadosCompra: comprarIngrediente
    
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
};



