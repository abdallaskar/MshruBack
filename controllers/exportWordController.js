import { Document, Packer } from "docx";
import Form from '../models/form.models.js';
import { createWordDoc } from '../utils/wordGenerator.js';

export const exportWord = async (req, res) => {
    try {
        const formId = req.query.formId;
        if (!formId) return res.status(400).json({ message: "Form ID is required" });

        const form = await Form.findById(formId);
        if (!form) return res.status(404).json({ message: "Form not found" });

        const doc = createWordDoc(form);
        const buffer = await Packer.toBuffer(doc);

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
        res.setHeader("Content-Disposition", `attachment; filename=form-${'document'}.docx`);

        res.send(buffer);
    } catch (error) {
        console.error("Error exporting Word file:", error);
        res.status(500).json({ message: "Failed to generate Word file" });
    }
};