import React from "react";
import SRSTabs from "../common/SRSTabs";
import {
  StyledAdminContainer,
  StyledAdminList,
  StyledAdminForm,
  StyledFieldSet,
  StyledFormField,
  StyledLabel,
} from "./Admin.css";
import { useState } from "react";
//React Router
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//React Hook Forms
import { Controller, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
//Apollo Client
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphQL/mutations/mutations";

function Login({ onLogin }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [loginWorker, { loading, error }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();
  const onSubmit = async (data, event) => {
    event.preventDefault();
    const { email, password } = data;
    console.log(data);
    try {
      const result = await loginWorker({
        variables: {
          input: {
            email,

            password,
          },
        },
      });
      console.log(result.data);
      onLogin(result.data.loginWorker);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().required(),
  });
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm(
    { resolver: joiResolver(schema) },
    { defaultValues: { email: "", password: "" } }
  );
  return (
    <div>
      <StyledAdminContainer>
        <SRSTabs tabsName={["Log In"]} />
        <StyledAdminList>
          <p>Please sign in</p>
        </StyledAdminList>
        <StyledAdminForm onSubmit={handleSubmit(onSubmit)}>
          <StyledFieldSet>
            <StyledLabel htmlFor="email">Email Address</StyledLabel>
            <StyledFormField {...register("email")} />
            {/* {errors.email && <span>{errors.email.message}</span>} */}
          </StyledFieldSet>
          <StyledFieldSet>
            <StyledLabel htmlFor="password">Password</StyledLabel>
            <StyledFormField type="password" {...register("password")} />
            {/* {errors.password && <span>{errors.password.message}</span>} */}
          </StyledFieldSet>
          <StyledFormField type="submit" value="Log In" />
        </StyledAdminForm>
        {/* {errorMessage && <p>{errorMessage}</p>} */}
      </StyledAdminContainer>
    </div>
  );
}

export default Login;
