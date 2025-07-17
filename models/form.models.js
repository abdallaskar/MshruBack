import mongoose from 'mongoose';

const labeledFieldSchema = new mongoose.Schema({
    label: String,
    value: String,
}, { _id: false });

const teamMemberSchema = new mongoose.Schema({
    name: labeledFieldSchema,
    position: labeledFieldSchema,
    workType: labeledFieldSchema,
}, { _id: false });

const formSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    projectName: labeledFieldSchema,
    ownerName: labeledFieldSchema,
    strategicObjective: labeledFieldSchema,
    performanceIndicator: labeledFieldSchema,
    previousReading: labeledFieldSchema,
    targetReading: labeledFieldSchema,
    email: labeledFieldSchema,
    phone: labeledFieldSchema,
    networkPhone: labeledFieldSchema,
    mainProjectObjective: labeledFieldSchema,
    startDate: labeledFieldSchema,
    endDate: labeledFieldSchema,
    detailedProjectDescription: labeledFieldSchema,
    supportingManagement: labeledFieldSchema,
    supportingAgency: labeledFieldSchema,
    targetGroup: labeledFieldSchema,
    teamMembers: [teamMemberSchema],
    firstIndicator: labeledFieldSchema,
    secondIndicator: labeledFieldSchema,
    thirdIndicator: labeledFieldSchema,
    potentialChallenges: labeledFieldSchema,
    uniqueProcedures: labeledFieldSchema,
    projectBudget: labeledFieldSchema,
    authorityName: labeledFieldSchema,
    authorityDate: labeledFieldSchema,
    authoritySignature: labeledFieldSchema,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Form = mongoose.model('Form', formSchema);
export default Form;
