const TalentSchema = require('../models/talent');

const getTalentById = async (talentId) => TalentSchema.findById(talentId);

module.exports = {
    getTalentById,
};
