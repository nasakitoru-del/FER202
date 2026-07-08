const orchidImages = import.meta.glob('../assets/*.{png,jpg,jpeg}', { eager: true, as: 'url' });
const imageMap = Object.entries(orchidImages).reduce((map, [filePath, url]) => {
  const fileName = filePath.split('/').pop();
  if (fileName) map[fileName] = url;
  return map;
}, {});

export function resolveOrchidImage(imagePath) {
  if (!imagePath) return 'https://via.placeholder.com/600x400?text=No+Image';

  const normalizedPath = imagePath.replace(/^\.{0,2}\/?/, '').replace(/^src\//, '');
  const fileName = normalizedPath.split('/').pop();
  if (fileName && imageMap[fileName]) {
    return imageMap[fileName];
  }

  if (normalizedPath.startsWith('assets/')) {
    return `/${normalizedPath}`;
  }

  return imagePath;
}
