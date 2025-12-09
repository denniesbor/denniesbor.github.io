// Category configuration for projects and thoughts
export const categoryConfig = {
  'signal-processing': {
    name: 'Signal Processing',
    icon: 'fa-wave-square',
    color: 'bg-blue-100 text-blue-700'
  },
  'computational-physics': {
    name: 'Computational Physics',
    icon: 'fa-atom',
    color: 'bg-purple-100 text-purple-700'
  },
  'geospatial-computing': {
    name: 'Geospatial Computing',
    icon: 'fa-map',
    color: 'bg-green-100 text-green-700'
  },
  'space-weather': {
    name: 'Space Weather',
    icon: 'fa-sun',
    color: 'bg-yellow-100 text-yellow-700'
  },
  'remote-sensing': {
    name: 'Remote Sensing',
    icon: 'fa-satellite',
    color: 'bg-teal-100 text-teal-700'
  },
  'audio-engineering': {
    name: 'Audio Engineering',
    icon: 'fa-headphones',
    color: 'bg-pink-100 text-pink-700'
  },
  'image-processing': {
    name: 'Image Processing',
    icon: 'fa-image',
    color: 'bg-indigo-100 text-indigo-700'
  },
  'health': {
    name: 'Health Tech',
    icon: 'fa-heartbeat',
    color: 'bg-red-100 text-red-700'
  },
  'research-infrastructure': {
    name: 'Research Infrastructure',
    icon: 'fa-server',
    color: 'bg-gray-100 text-gray-700'
  }
};

// Helper function to get category info
export const getCategoryInfo = (categorySlug) => {
  return categoryConfig[categorySlug] || {
    name: categorySlug,
    icon: 'fa-code',
    color: 'bg-gray-100 text-gray-600'
  };
};

// Helper to get tag color only
export const getTagColor = (tag) => {
  return categoryConfig[tag]?.color || 'bg-gray-100 text-gray-600';
};