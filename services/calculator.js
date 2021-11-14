import { loadFromCloud, loadFromLocalStorage } from './storage';

const calculateCloudCount = async () => {
  return (await loadFromCloud())?.length || 0;
};

const calculateLocalCount = async () => {
  return (await loadFromLocalStorage())?.length || 0;
};

const calculateTotalCount = async () =>
  (await calculateCloudCount()) + (await calculateLocalCount());

export { calculateCloudCount, calculateLocalCount, calculateTotalCount };
