import ajv from '../utils/ajvInstance.mjs';

/**
 * AJV Validation Middleware
 * @param {Object} schema - AJV schema to validate against
 * @returns Express middleware
 */
export default function validate(schema) {
    const validateFn = ajv.compile(schema);

    return (req, res, next) => {
        const valid = validateFn(req.body);

        if (!valid) {
            console.log("pass schema validation ");
            return res.status(400).json({
                message: "Validation error this body not follow validation schema-01",
                errors: validateFn.errors
            });
        }
        next();
    };
}
