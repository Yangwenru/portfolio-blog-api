const Project = require('../models/Project');
const projectInput = require('../utils/projectInput');
const makeCrud = require('../utils/makeCrud');
const controller = makeCrud(Project, projectInput, 'Project');
controller.create = async (req, res) => {
  const project = await Project.create({ ...projectInput(req.body), user: req.user._id });
  res.status(201).json(project);
};
module.exports = controller;
