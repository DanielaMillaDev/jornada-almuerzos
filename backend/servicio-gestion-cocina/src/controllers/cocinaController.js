// pedidoController.js

// Importar el modelo de pedido
const cocinaModel = require('../models/cocinaModel');

exports.crearPlatoAleatorio = async (req, res) => {
  try {
    const nuevoPlatoId = await cocinaModel.crearPlato(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        platoId: nuevoPlatoId
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
};

exports.crearSolicitudBodega = async (req, res) => {
try {
  const nuevaSolicitudId = await cocinaModel.crearSolicitudBodega(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      solicitudId: nuevaSolicitudId
    }
  });
} catch (err) {
  res.status(400).json({
    status: 'error',
    message: err.message
  });
}
};

exports.entregarPlato = async (req, res) => {
  try {
    const entregarPlato = await cocinaModel.entregarPlato(req.body);

    res.status(201).json({
      status: 'success',
      salida: entregarPlato
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
};

exports.verPedidos = async (req, res) => {
  try {
    const listaPedidos = await cocinaModel.verPedido();

    res.status(201).json({
      status: 'success',
      resultadosPedidos: listaPedidos
    
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
};


exports.verIngredientes = async (req, res) => {
  try {
    const listaIngredientes = await cocinaModel.verIngredientes(req.body);

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


exports.verRecetas = async (req, res) => {
  try {
    const listaRecetas = await cocinaModel.verRecetas();

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

exports.verHistorialPedidos = async (req, res) => {
  try {
    const listaHistorial = await cocinaModel.verHistorialPedidos();

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
