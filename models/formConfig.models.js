import mongoose from 'mongoose';

const formFieldSchema = new mongoose.Schema({
    fieldKey: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    placeholder: {
        type: String,
        required: true,
    },
    isRequired: {
        type: Boolean,
        default: false,
    }
}, { _id: false });

const formConfigSchema = new mongoose.Schema({
    fields: [formFieldSchema],
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const FormConfig = mongoose.model('FormConfig', formConfigSchema);
export default FormConfig;
