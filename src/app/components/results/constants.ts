export const Flavours = [
  'Fruity',
  'Spicy',
  'Sweet',
  'Acid',
  'Coffee',
  'Creamy',
  'Chocolate',
  'Honey',
  'Earthy',
  'Herbal',
];

export const Pairings = ['Scotch', 'Whisky', 'Cognac', 'Rum'];
export const ALL_RESULTS = 'All';
export const NOT_SPECIFIED = 'Not specified';

export const getRandom = (
  items: string[],
): { name: string; applied: boolean }[] =>
  items.map((name) => ({
    name,
    applied: Math.random() < 0.5,
  }));
