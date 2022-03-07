export const newUser = {
  name: 'John Doe',
  login: 'johndoe',
  medias: {
    voice: {
      min: 2,
      max: 3,
      selected: 2,
      handleMode: 'default',
      device: 'any-device',
      devicePassword: '1234',
    },
    email: { min: 2, max: 3, selected: 2 },
    chat: { min: 2, max: 3, selected: 2, handleMode: 'default' },
  },
  password: '12345678',
};

export const updatedUser = {
  name: 'Jane Doe',
  login: 'janedoe',
  medias: {
    voice: {
      min: 1,
      max: 5,
      selected: 3,
      handleMode: 'secondary',
      device: 'other-device',
      devicePassword: '4321',
    },
    email: { min: 1, max: 5, selected: 3 },
    chat: { min: 1, max: 5, selected: 3, handleMode: 'secondary' },
  },
};
