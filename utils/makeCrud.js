const httpError = require('./httpError');
module.exports = function makeCrud(Model, input, label) {
  return {
    list: async (req, res) => res.json(await Model.find().sort({ createdAt: -1 })),
    detail: async (req, res) => {
      const item = await Model.findById(req.params.id);
      if (!item) throw httpError(404, `${label} not found`);
      res.json(item);
    },
    create: async (req, res) => res.status(201).json(await Model.create(input(req.body))),
    update: async (req, res) => {
      const item = await Model.findByIdAndUpdate(req.params.id,
        { $set: input(req.body) }, { returnDocument: 'after', runValidators: true });
      if (!item) throw httpError(404, `${label} not found`);
      res.json(item);
    },
    remove: async (req, res) => {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) throw httpError(404, `${label} not found`);
      res.status(204).end();
    }
  };
};
