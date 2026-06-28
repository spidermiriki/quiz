import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

const COL = "scores";
const MAX_ENTRIES = 50;

export async function saveScore({ name, photo, score, total, points, mode }) {
  await addDoc(collection(db, COL), {
    name,
    ...(photo ? { photo } : {}),
    score,
    total,
    points,
    mode,
    date: new Date().toLocaleDateString("fr-FR"),
    createdAt: Date.now(),
  });
}

export async function getScores() {
  const q = query(
    collection(db, COL),
    orderBy("points", "desc"),
    orderBy("score", "desc"),
    limit(MAX_ENTRIES)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function clearScores() {
  const snap = await getDocs(collection(db, COL));
  await Promise.all(snap.docs.map((d) => deleteDoc(doc(db, COL, d.id))));
}
