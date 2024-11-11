import React, { useState } from "react";
import SRSTabs from "../common/SRSTabs";
import { Outlet, Link, useNavigate, NavLink } from "react-router-dom";
import { StyledMainContent, StyledFormInline } from "./Search.css";
import SRSMainContent from "../common/SRSMainContainer";
// import ClientEntry from "./ClientEntry";
import SRSMainContainer from "../common/SRSMainContainer";

import Joi from "joi";
import { CREATE_CLIENT } from "../graphQL/mutations/mutations";
import { GET_CLIENTS } from "../graphQL/queries/queries";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQuery } from "@apollo/client";
import { Controller, useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";

import NameResult from "./NameResult";
import { useClients } from "../context/ClientProvider";

function MainPersonPage() {
  const { client, setClient, isSearched, setIsSearched } = useClients();

  const navigate = useNavigate();
  // GET ALL CLIENTS
  const { loading, error, data } = useQuery(GET_CLIENTS);
  const [createClientEntry] = useMutation(CREATE_CLIENT);

  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.string().allow(null, "").optional(), // Allows null
    address: Joi.string().allow(null, "").optional(),
  });

  const { control, handleSubmit } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
    },
  });

  const onSubmit = async (formData) => {
    const filteredClient = data.clients.filter((client) => {
      return (
        client.firstName === formData.firstName &&
        client.lastName === formData.lastName
      );
    });

    if (filteredClient.length === 0) {
      // Only create the client if they don't already exist
      const result = await createClientEntry({
        variables: {
          client: formData,
        },
      });

      console.log("formData: ", formData, "filteredClient: ", filteredClient);
      // Update the state with the newly created client
      setClient(result.data.createClient);
    } else {
      setClient(filteredClient[0]);
      console.log("Client already exists. No new client created.");
    }
    setIsSearched(true);
  };

  if (loading) return <p>Loading clients...</p>; // Loading state
  if (error) return <p>Error loading clients.</p>; // Error state
  return (
    <div>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <Form.Group controlId="firstName" className="mt-2">
              <Form.Label className="visually-hidden">First Name</Form.Label>
              <Form.Control
                {...field}
                type="text"
                placeholder=""
                size="lg"
                className="form-shadow"
              />
            </Form.Group>
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <Form.Group controlId="lastName" className="mt-2">
              <Form.Label className="visually-hidden">Last Name</Form.Label>
              <Form.Control
                {...field}
                type="text"
                placeholder=""
                size="lg"
                className="form-shadow"
              />
            </Form.Group>
          )}
        />
        {!isSearched ? (
          <Button
            variant="dark"
            size="lg"
            block="true"
            className="w-100 mt-2"
            type="submit"
          >
            Search <i className="bi bi-send-fill"></i>
          </Button>
        ) : null}

        {(client.firstName === "") & (client.lastName === "") ? null : (
          <div onClick={() => navigate("/persons/details")}>
            {/* {client.firstName} {client.lastName} */}
            <NameResult
              firstName={client.firstName}
              lastName={client.lastName}
            />
          </div>
        )}
      </Form>

      {/* <Details client={client} />
            {isSearched && <NoteEntry client={client} />} */}
    </div>
  );
}

export default MainPersonPage;
