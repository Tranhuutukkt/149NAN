import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

class Firebase {
    constructor() {
        app.initializeApp({
            apiKey: "AIzaSyDad4eQ2_V04UqqgE93FFOqOTqjn3NtrYQ",
            authDomain: "nan-44f9a.firebaseapp.com",
            projectId: "nan-44f9a",
            storageBucket: "nan-44f9a.appspot.com",
            messagingSenderId: "54540549215",
            appId: "1:54540549215:web:de4c1a26a1778dcda72fea",
            measurementId: "G-3XQ2YD785W"
        });

        this.storage = app.storage();
        this.db = app.firestore();
        this.auth = app.auth();
    }

    // AUTH ACTIONS ------------

    createAccount = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    emailVerified = () =>
        this.auth.currentUser.sendEmailVerification();

    signIn = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    signOut = () => this.auth.signOut();

    passwordReset = (email) => this.auth.sendPasswordResetEmail(email);

    addUser = (id, user) => this.db.collection("users").doc(id).set(user);

    getUser = (id) => this.db.collection("users").doc(id).get();

    passwordUpdate = (password) => this.auth.currentUser.updatePassword(password);

    changePassword = (currentPassword, newPassword) =>
        new Promise((resolve, reject) => {
            this.reauthenticate(currentPassword)
                .then(() => {
                    const user = this.auth.currentUser;
                    user
                        .updatePassword(newPassword)
                        .then(() => {
                            resolve("Password updated successfully!");
                        })
                        .catch((error) => reject(error));
                })
                .catch((error) => reject(error));
        });

    reauthenticate = (currentPassword) => {
        const user = this.auth.currentUser;
        const cred = app.auth.EmailAuthProvider.credential(
            user.email,
            currentPassword
        );

        return user.reauthenticateWithCredential(cred);
    };

    updateEmail = (currentPassword, newEmail) =>
        new Promise((resolve, reject) => {
            this.reauthenticate(currentPassword)
                .then(() => {
                    const user = this.auth.currentUser;
                    user
                        .updateEmail(newEmail)
                        .then(() => {
                            resolve("Email Successfully updated");
                        })
                        .catch((error) => reject(error));
                })
                .catch((error) => reject(error));
        });

    updateProfile = (id, updates) =>
        this.db.collection("users").doc(id).update(updates);

    onAuthStateChanged = () =>
        new Promise((resolve, reject) => {
            this.auth.onAuthStateChanged((user) => {
                if (user) {
                    resolve(user);
                } else {
                    reject(new Error("Auth State Changed failed"));
                }
            });
        });

    setAuthPersistence = () =>
        this.auth.setPersistence(app.auth.Auth.Persistence.LOCAL);

    getAllUsers = () => {
        let didTimeout = false;
        return new Promise((resolve, reject) => {
            (async () => {
                const timeout = setTimeout(() => {
                    didTimeout = true;
                    reject(new Error("Request timeout, please try again"));
                }, 15000);

                try {
                    const totalQuery = await this.db.collection("users").get();
                    const total = totalQuery.docs.length;
                    const query = this.db
                        .collection("users")
                        .orderBy(app.firestore.FieldPath.documentId());
                    const snapshot = await query.get();

                    clearTimeout(timeout);
                    if (!didTimeout) {
                        const users = [];
                        snapshot.forEach((doc) =>
                            users.push({ id: doc.id, ...doc.data() })
                        );

                        resolve({ users, total });
                    }
                } catch (e) {
                    if (didTimeout) return;
                    reject(e?.message || ":( Failed to fetch users.");
                }
            })();
        });
    }


}

const firebaseInstance = new Firebase();

export default firebaseInstance;