import { db } from "./firebase";
const collectionName = "users";

//adding data to collection
export const AddDataToFirebase = (data) =>
  db.collection(collectionName).add(data);

//getting data
export const GetFirebaseData = ({ setUploadedData }) => {
  const array = [];
  let item;
  db.collection(collectionName)
    .get()
    .then((res_array) => {
      res_array.forEach((doc) => {
        item = doc.data();
        item.id = doc.id;
        array.push(item);
      });
      setUploadedData(array);
    });
};

//deleting data
export const DeleteData = ({ id }) =>
  db.collection(collectionName).doc(id).delete();

//get Snap updated data
export const GetUpdatedSnapData = ({ Fx_RunOnUpdate }) =>
  db.collection(collectionName).onSnapshot(() => Fx_RunOnUpdate);

//updataing firebase data
export const GetFirebaseCollectionDataById = ({ id }) => {
  return db.collection(collectionName).doc(id).get();
};

export const UpdateFirebaseCollectionDataById = ({ id, data }) => {
  return db.collection(collectionName).doc(id).update(data);
};
