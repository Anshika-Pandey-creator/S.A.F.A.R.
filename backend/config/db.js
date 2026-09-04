const { getInitialData } = require('../utils/seedData');

let state = null;

function initState() {
  if (!state) {
    const initialData = getInitialData();
    state = {
      users: initialData.users,
      geofences: initialData.geofences,
      tourists: initialData.tourists,
      digitalIds: initialData.digitalIds,
      emergencyServices: initialData.emergencyServices,
      incidents: initialData.incidents,
      trips: initialData.trips,
      notifications: [
        {
          id: 'notif_01',
          type: 'CRITICAL',
          title: 'SOS Emergency Signal',
          message: 'Tourist TID-1026 (David Miller) triggered SOS in Kaziranga Core Forest Zone.',
          timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
          read: false,
          touristId: 'TID-1026'
        },
        {
          id: 'notif_02',
          type: 'HIGH',
          title: 'Geo-fence Border Breach',
          message: 'Tourist TID-1027 (Aarav Sharma) entered Kamrup Restricted Border Buffer.',
          timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
          read: false,
          touristId: 'TID-1027'
        },
        {
          id: 'notif_03',
          type: 'MEDIUM',
          title: 'Route Deviation Offset',
          message: 'Tourist TID-1025 (Priya Mukherjee) 3.2km offset from planned route.',
          timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
          read: true,
          touristId: 'TID-1025'
        }
      ]
    };
    console.log('✓ SafeTour NE Local Demo Database Initialized with Seed Data');
  }
  return state;
}

const dbStore = {
  get: (collectionName) => {
    const currentState = initState();
    return currentState[collectionName] || [];
  },

  find: (collectionName, filterFn = null) => {
    const items = dbStore.get(collectionName);
    if (!filterFn) return items;
    return items.filter(filterFn);
  },

  findOne: (collectionName, filterFn) => {
    const items = dbStore.get(collectionName);
    return items.find(filterFn) || null;
  },

  findById: (collectionName, id) => {
    return dbStore.findOne(collectionName, (item) => item.id === id || item.touristId === id);
  },

  insert: (collectionName, newItem) => {
    const items = dbStore.get(collectionName);
    if (!newItem.id) {
      newItem.id = `${collectionName}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    }
    if (!newItem.createdAt) {
      newItem.createdAt = new Date().toISOString();
    }
    items.unshift(newItem);
    return newItem;
  },

  update: (collectionName, id, updateFields) => {
    const items = dbStore.get(collectionName);
    const index = items.findIndex((item) => item.id === id || item.touristId === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...updateFields, updatedAt: new Date().toISOString() };
      return items[index];
    }
    return null;
  },

  remove: (collectionName, id) => {
    const currentState = initState();
    const initialLen = currentState[collectionName].length;
    currentState[collectionName] = currentState[collectionName].filter(
      (item) => item.id !== id && item.touristId !== id
    );
    return currentState[collectionName].length < initialLen;
  },

  reset: () => {
    state = null;
    return initState();
  }
};

module.exports = {
  dbStore,
  initState
};
