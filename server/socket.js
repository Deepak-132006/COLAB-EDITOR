const Document = require('./models/Document');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('get-document', async (documentId) => {
      const document = await findOrCreateDocument(documentId);
      socket.join(documentId);
      socket.emit('load-document', document.data);

      socket.on('send-changes', (data) => {
        socket.broadcast.to(documentId).emit('receive-changes', data);
      });

      socket.on('save-document', async (data) => {
        await Document.findByIdAndUpdate(documentId, { data });
      });
    });
  });
};

async function findOrCreateDocument(id) {
  if (!id) return;

  const doc = await Document.findById(id);
  if (doc) return doc;

  return await Document.create({ _id: id, data: "" });
}
