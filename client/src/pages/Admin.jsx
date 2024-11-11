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
import { CREATE_WORKER } from "../graphQL/mutations/mutations";

function Admin({ onLogin }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [createWorker, { loading, error }] = useMutation(CREATE_WORKER);
  const navigate = useNavigate();
  const onSubmit = async (data, event) => {
    event.preventDefault();
    const { name, email, password } = data;
    console.log(data);
    try {
      const result = await createWorker({
        variables: {
          input: {
            name,
            email,

            password,
          },
        },
      });
      console.log(result.data);
      onLogin(result.data.createWorker);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const schema = Joi.object({
    name: Joi.string().required(),
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
    { defaultValues: { name: "", email: "", password: "" } }
  );
  return (
    <StyledAdminContainer>
      <SRSTabs tabsName={["Sign Up"]} />
      <StyledAdminList>
        <p>
          Passwords need to comply with the following rules: Must contain at
          least 12 characters. Must contain at least 1 upper-case letter, 1
          lower-case letter, 1 number and 1 symbol.
        </p>
      </StyledAdminList>
      <StyledAdminForm onSubmit={handleSubmit(onSubmit)}>
        <StyledFieldSet>
          <StyledLabel htmlFor="name">User Name</StyledLabel>
          <StyledFormField {...register("name")} />
          {/* {errors.name && <span>{errors.name.message}</span>} */}
        </StyledFieldSet>
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
        <StyledFormField type="submit" value="submit" />
      </StyledAdminForm>
      {/* {errorMessage && <p>{errorMessage}</p>} */}
    </StyledAdminContainer>
  );
}

export default Admin;
