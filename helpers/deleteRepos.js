import { deleteDoc, doc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

const deleteRepository = async (repositoryId) => {
  const db = getFirestore();
  const repositoryRef = doc(db, 'repositories', repositoryId);

  try {
    await deleteDoc(repositoryRef);
    console.log(`Repository with ID ${repositoryId} deleted successfully.`);
    return true; 
  } catch (error) {
    console.error('Error deleting repository:', error);
    return false;
  }
};

export default deleteRepository;