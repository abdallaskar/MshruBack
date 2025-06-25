import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
    name: String,
    position: String,
    workType: String,
}, { _id: false });

const performanceIndicatorSchema = new mongoose.Schema({
    indicator: String,
    value: String,
}, { _id: false });

const formSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',

    },
    projectName: String,
    ownerName: String,
    strategicObjective: String,
    performanceIndicator: String,
    previousReading: String,
    targetReading: String,
    email: String,
    phone: String,
    networkPhone: String,
    mainProjectObjective: String,
    implementationPeriod: String,
    detailedProjectDescription: String,
    supportingManagement: String,
    supportingAgency: String,
    targetGroup: String,
    teamMembers: [teamMemberSchema],
    performanceIndicators: [performanceIndicatorSchema],
    potentialChallenges: String,
    uniqueProcedures: String,
    projectBudget: String,
    authorityName: String,
    authorityDate: String,
    authoritySignature: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Form', formSchema);
