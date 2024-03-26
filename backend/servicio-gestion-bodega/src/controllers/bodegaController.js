// bodegaController.js

const bodegaModel = require('../models/bodegaModel');

exports.verSolicitudes = async (req, res) => {
  try {
    const listaSolicitudes = await bodegaModel.verSolicitudes();

    res.status(201).json({
      status: 'success',
      resultadosSolicitudes: listaSolicitudes
    
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
};

exports.verInventarioIngredientes = async (req, res) => {
  try {
    const listaInventario = await bodegaModel.verInventarioIngredientes();

    res.status(201).json({
      status: 'success',
      resultadosInventario: listaInventario
    
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
};

exports.verIngredientesSolicitud = async (req, res) => {
  try {
    const listaIngredientes= await bodegaModel.verIngredientesSolicitud(req.body);

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

exports.enviarIngredientes = async (req, res) => {
  try {
    const envioIngredientes= await bodegaModel.enviarIngredientes(req.body);

    res.status(201).json({
      status: 'success',
      resultadosEnvio: envioIngredientes
    
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
};



