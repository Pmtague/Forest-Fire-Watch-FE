import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import FireContext from "../context/contextProvider";
import axios from "axios";

import useInput from "../utils/useInput";
import styled from "styled-components";

import errorHandling from "../utils/inputErrorHandling";

function Register() {
  //useInput is a custom hook that should be used for all controlled inputs
  const [username, setUsername, handleUsername] = useInput("", "username");
  const [password, setPassword, handlePassword] = useInput("", "password");
  //second password input used to ensure no typos in passwords
  const [passwordConf, setPasswordConf, handlePasswordConf] = useInput(
    "",
    "passwordConf"
  );
  const [loading, setLoading] = useState(false);
  const [badPassword, setBadPassword] = useState(false);
  const [error, setError] = useState("");

  const data = useContext(FireContext);

  const setErrorHandler = () => {
    const userObject = { username, password, passwordConf };
    setError(errorHandling(userObject));
  };

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    setErrorHandler();

    if (!error) {
      const newUser = { username, password };
      axios
        .post(
          "https://fireflight-lambda.herokuapp.com/api/auth/register",
          newUser
        )
        .then(res => {
          setUsername("");
          setPassword("");
          setPasswordConf("");
          setLoading(false);
          console.log(res);
          return <Redirect to="/login" />;
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setBadPassword(true);
    }
  }

  if (data.token != null) {
    console.log(localStorage.getItem("token"));
    return <Redirect to="/" />;
  } else {
    return (
      <RegPageContainer>
        Registration Page!
        <FormContainer onSubmit={handleSubmit}>
          <FormLabel>
            Username
            <FormInput
              type="text"
              name="username"
              value={username}
              // onChange={e=>setUsername(e.value)}
              onChange={handleUsername}
            />
          </FormLabel>
          <FormLabel>
            Password
            <FormInput
              type="password"
              name="password"
              value={password}
              // onChange={e=>setPassword(e.value)}
              onChange={handlePassword}
            />
          </FormLabel>
          <FormLabel>
            Confirm Password
            <FormInput
              type="password"
              name="passwordConf"
              value={passwordConf}
              // onChange={e=>setPasswordConf(e.value)}
              onChange={handlePasswordConf}
            />
          </FormLabel>
          <Button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Register"}
          </Button>
          {<p>{error}</p>}
        </FormContainer>
        <p>
          Already a member? Log in <Link to="/login">here</Link>
        </p>
      </RegPageContainer>
    );
  }
}

export default Register;

const RegPageContainer = styled.div`
  width: 75%;
  margin: 50px auto auto;
  padding: 50px 0px;
  text-align: center;
  border: 1px solid black;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  padding: 5px 0px;
`;

const FormInput = styled.input`
  margin-left: 10px;
`;

const Button = styled.button`
  width: 200px;
  box-shadow: 2px 2px 7px black;
  margin: 20px auto;
`;
