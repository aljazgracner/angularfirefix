import { Subscriber } from 'rxjs';
import firebase from 'firebase/compat/app';
export declare type Settings = firebase.firestore.Settings;
export declare type CollectionReference<T = DocumentData> = firebase.firestore.CollectionReference<T>;
export declare type DocumentReference<T = DocumentData> = firebase.firestore.DocumentReference<T>;
export declare type PersistenceSettings = firebase.firestore.PersistenceSettings;
export declare type DocumentChangeType = firebase.firestore.DocumentChangeType;
export declare type SnapshotOptions = firebase.firestore.SnapshotOptions;
export declare type FieldPath = firebase.firestore.FieldPath;
export declare type Query<T = DocumentData> = firebase.firestore.Query<T>;
export declare type SetOptions = firebase.firestore.SetOptions;
export declare type DocumentData = firebase.firestore.DocumentData;
export interface DocumentSnapshotExists<T> extends firebase.firestore.DocumentSnapshot<T> {
  readonly exists: true;
  data(options?: SnapshotOptions): T;
}
export interface DocumentSnapshotDoesNotExist extends firebase.firestore.DocumentSnapshot {
  readonly exists: false;
  data(options?: SnapshotOptions): undefined;
  get(fieldPath: string | FieldPath, options?: SnapshotOptions): undefined;
}
export declare type DocumentSnapshot<T> = DocumentSnapshotExists<T> | DocumentSnapshotDoesNotExist;
export interface QueryDocumentSnapshot<T> extends firebase.firestore.QueryDocumentSnapshot<T> {
  data(options?: SnapshotOptions): T;
}
export interface QuerySnapshot<T> extends firebase.firestore.QuerySnapshot<T> {
  readonly docs: QueryDocumentSnapshot<T>[];
}
export interface DocumentChange<T> extends firebase.firestore.DocumentChange<T> {
  readonly doc: QueryDocumentSnapshot<T>;
}
export interface DocumentChangeAction<T> {
  type: DocumentChangeType;
  payload: DocumentChange<T>;
}
export interface Action<T> {
  type: string;
  payload: T;
}
export interface Reference<T> {
  onSnapshot: (options: firebase.firestore.SnapshotListenOptions, sub: Subscriber<any>) => any;
}
export declare type QueryFn<T = DocumentData> = (ref: CollectionReference<T>) => Query<T>;
export declare type QueryGroupFn<T = DocumentData> = (query: Query<T>) => Query<T>;
/**
 * A structure that provides an association between a reference
 * and a query on that reference. Note: Performing operations
 * on the reference can lead to confusing results with complicated
 * queries.
 *
 * Example:
 *
 * const query = ref.where('type', '==', 'Book').
 *                  .where('price', '>' 18.00)
 *                  .where('price', '<' 100.00)
 *                  .where('category', '==', 'Fiction')
 *                  .where('publisher', '==', 'BigPublisher')
 *
 * // This addition would not be a result of the query above
 * ref.add({
 *  type: 'Magazine',
 *  price: 4.99,
 *  category: 'Sports',
 *  publisher: 'SportsPublisher'
 * });
 */
export interface AssociatedReference<T = DocumentData> {
  ref: CollectionReference<T>;
  query: Query<T>;
}
