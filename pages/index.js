/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  Typography,
} from "@mui/material";
import { auth } from "../firebase/firebase";
import styles from "../styles/landing.module.scss";
import { useAuth } from "../firebase/auth";
const REDIRECT_PAGE = "/dashboard";

// to use firebaseUI we need some sortof configuration
const uiConfig = {
  signInFlow: "popup", //pop up instead of redirection.
  signINSuccessUrl: REDIRECT_PAGE,
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    EmailAuthProvider.PROVIDER_ID,
  ],
};
export default function Home() {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push("/dashboaard");
  };
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState("");

  const loginWithGoogle = async (e) => {
    e.preventDefault();
    if (navigator.onLine) {
      try {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider).then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          setUser(result.user);
          console.log("successful");
        });
      } catch (error) {
        alert(`problem logging in please try again!`);
      }
    } else {
      alert("check your internet connection and try again");
    }
  };
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const loginWithEmail = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      setUser(userCredential.user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(error);
    }
  };
  if (user) {
    router.push("/dashboard");
  }

  const { isLoading } = useAuth();
  console.log("loading state: ", isLoading);

  return (
    <div>
      <Head>
        <title>Expense Tracker</title>
      </Head>

      <main>
        <button onClick={handleClick}>click me</button>
        <Container className={styles.container}>
          <Typography variant="h1">Welcome to Expense Tracker!</Typography>
          <Typography variant="h2">
            Add, view, edit, and delete expenses
          </Typography>
          <div className={styles.buttons}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setLogin(true)}
            >
              Login / Register
            </Button>
          </div>
          <Dialog open={login} onClose={() => setLogin(false)}>
            {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} /> */}
            <h1>Hello Ibrahim</h1>
            <button onClick={loginWithGoogle}>Login with Google</button>
            <form action="">
              <input
                type="email"
                name="email"
                placeholder="email"
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
              />
              <button onClick={loginWithEmail}>Login with Email</button>
            </form>
          </Dialog>
        </Container>
      </main>
      <section></section>
    </div>
  );
}
