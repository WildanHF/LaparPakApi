const payments = [];

const getAllPayments = async () => {
  return payments;
};

const createPayment = async (paymentData) => {
  const newPayment = { id: payments.length + 1, ...paymentData };
  payments.push(newPayment);
  return newPayment;
};

const updatePayment = async (id, paymentData) => {
  const index = payments.findIndex(payment => payment.id === parseInt(id));
  if (index !== -1) {
    payments[index] = { ...payments[index], ...paymentData };
    return payments[index];
  }
  throw new Error('Payment not found');
};

const deletePayment = async (id) => {
  const index = payments.findIndex(payment => payment.id === parseInt(id));
  if (index !== -1) {
    const deletedPayment = payments.splice(index, 1);
    return deletedPayment[0];
  }
  throw new Error('Payment not found');
};

module.exports = {
  getAllPayments,
  createPayment,
  updatePayment,
  deletePayment
};