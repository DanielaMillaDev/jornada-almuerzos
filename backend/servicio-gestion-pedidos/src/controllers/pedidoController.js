// pedidoController.js

// Importar el modelo de pedido
const pedidoModel = require('../models/pedidoModel');

exports.crearPedido = async (req, res) => {
  try {
    const nuevoPedidoId = await pedidoModel.crearPedido(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        pedidoId: nuevoPedidoId
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
};

exports.entregarPedido = async (req, res) => {
  try {
    const pedidoEntregadoId = await pedidoModel.entregarPedido(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        pedidoId: pedidoEntregadoId
      }
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
    const listaPedidos = await pedidoModel.verPedido();

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
