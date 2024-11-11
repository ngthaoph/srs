import React from "react";
import { useClients } from "../context/ClientProvider";
import SRSMainContainer from "../common/SRSMainContainer";
import { Form, Button } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { UPDATE_CLIENT } from "../graphQL/mutations/mutations";
import { GET_CLIENT } from "../graphQL/queries/queries";
import { useMutation, useQuery } from "@apollo/client";

function Details() {
  const { client, setClient } = useClients();
  console.log(client);
  const schema = Joi.object({
    phone: Joi.string().allow(null, "").optional(), // Allows null
    address: Joi.string().allow(null, "").optional(),
  });
  const [updateClient, { data, loading, error }] = useMutation(UPDATE_CLIENT);
  const { control, handleSubmit } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      phone: "",
      address: "",
    },
  });
  const onSubmit = async (data) => {
    console.log(data);
    // Add the address and phone to the client

    setClient((prevClient) => ({
      ...prevClient,
      phone: data.phone,
      address: data.address,
    }));
    await updateClient({
      variables: {
        updateClientId: client.id,
        client: {
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          address: data.address,
        },
      },
    });
  };
  return (
    <div>
      <div>
        <h1>View Primary Detaills</h1>
      </div>
      <div>
        Person/Alias
        <table
          style={{
            tableLayout: "auto",
            width: "60%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Primary/Alias</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a>
                  {client?.firstName} {client?.lastName}
                </a>
              </td>
              <td>Primary Name </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/*Address*/}
      <div>
        <div>
          <h2>Address</h2>
          <a>Create new address</a>
        </div>
        <div>No contacts exist</div>
      </div>
      {/*PHONE*/}
      <div>
        <div>
          <h2>Phone &amp; other contacts:</h2>
          <a>Create new econtact</a>
        </div>
        <div>No contacts exist</div>

        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div>
            {client?.address ? (
              client.address
            ) : (
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <Form.Group controlId="address" className="mt-2">
                    <Form.Label className="visually-hidden">Address</Form.Label>
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
            )}
          </div>
          <div>
            {client?.phone ? (
              client.phone
            ) : (
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Form.Group controlId="phone" className="mt-2">
                    <Form.Label className="visually-hidden">Phone</Form.Label>
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
            )}
          </div>

          <Button
            variant="dark"
            size="lg"
            block="true"
            className="w-100 mt-2"
            type="submit"
          >
            Add <i className="bi bi-send-fill"></i>
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Details;
