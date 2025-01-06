const { getAllPayments, createPayment, updatePayment: updatePaymentModel, deletePayment: deletePaymentModel } = require('../models/paymentModel');

// Payments
const getPayments = async (req, res) => {
  try {
    const payments = await getAllPayments();
    res.json({
      success: true,
      message: 'Payments retrieved successfully',
      data: payments
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving payments',
      error: err.message
    });
  }
};

const addPayment = async (req, res) => {
  try {
    const result = await createPayment(req.body);
    res.status(201).json({
      success: true,
      message: 'Payment created successfully',
      data: result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error creating payment',
      error: err.message
    });
  }
};

const updatePayment = async (req, res) => {
  try {
    const result = await updatePaymentModel(req.params.id, req.body);
    res.json({
      success: true,
      message: 'Payment updated successfully',
      data: result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error updating payment',
      error: err.message
    });
  }
};

const deletePayment = async (req, res) => {
  try {
    await deletePaymentModel(req.params.id);
    res.json({
      success: true,
      message: 'Payment deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error deleting payment',
      error: err.message
    });
  }
};

module.exports = {
  getPayments,
  addPayment,
  updatePayment,
  deletePayment
};