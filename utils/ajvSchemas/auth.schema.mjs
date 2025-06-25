export const registerSchema = {
  type: 'object',
  required: ['userName', 'email', 'password'],
  properties: {
    userName: { type: 'string', minLength: 3 },
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 6 },
    role: { type: 'string' },
    profileImage: { type: 'string', format: 'uri' },
    bio: { type: 'string' }
  },
  additionalProperties: false
};


export const loginSchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 6 }
  },
  additionalProperties: false
};
