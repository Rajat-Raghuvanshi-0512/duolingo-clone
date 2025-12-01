const POINTS_PRICE = 10;
const MAX_HEARTS = 5;
const DAYS_IN_MS = 86400000;

const quests = [
  {
    id: 1,
    title: 'Earn 10 XP',
    value: 10,
  },
  {
    id: 2,
    title: 'Earn 20 XP',
    value: 20,
  },
  {
    id: 3,
    title: 'Earn 30 XP',
    value: 30,
  },
  {
    id: 4,
    title: 'Earn 40 XP',
    value: 40,
  },
  {
    id: 5,
    title: 'Earn 50 XP',
    value: 50,
  },
];

// Helper function to darken a hex color
export const darkenColor = (hex: string, factor: number = 0.8): string => {
  // Remove # if present
  const color = hex.replace('#', '');

  // Parse RGB values
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  // Darken each component
  const darkenedR = Math.max(0, Math.floor(r * factor));
  const darkenedG = Math.max(0, Math.floor(g * factor));
  const darkenedB = Math.max(0, Math.floor(b * factor));

  // Convert back to hex
  return `#${darkenedR.toString(16).padStart(2, '0')}${darkenedG
    .toString(16)
    .padStart(2, '0')}${darkenedB.toString(16).padStart(2, '0')}`;
};

export { POINTS_PRICE, MAX_HEARTS, DAYS_IN_MS, quests };
