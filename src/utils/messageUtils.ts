export const generateAvatarColors = (username: string) => {
  const colors = [
    ['from-pink-500 to-rose-500', 'bg-rose-100'],
    ['from-purple-500 to-indigo-500', 'bg-indigo-100'],
    ['from-blue-500 to-cyan-500', 'bg-cyan-100'],
    ['from-teal-500 to-emerald-500', 'bg-emerald-100'],
    ['from-orange-500 to-amber-500', 'bg-amber-100'],
  ];
  const index = username.charCodeAt(0) % colors.length;
  return colors[index];
};

export const generateInitials = (username: string) => {
  const parts = username.split(' ');
  if (parts.length > 1) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return username.slice(0, 2).toUpperCase();
}; 