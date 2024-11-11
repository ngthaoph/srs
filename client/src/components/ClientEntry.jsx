// import Joi from "joi";
// import { CREATE_CLIENT } from "../graphQL/mutations/mutations";
// import { GET_CLIENTS } from "../graphQL/queries/queries";
// import { joiResolver } from "@hookform/resolvers/joi";
// import { useMutation, useQuery } from "@apollo/client";
// import { Controller, useForm } from "react-hook-form";
// import { Form, Button } from "react-bootstrap";
// import { useState, useEffect } from "react";
// import { useClients } from "../context/ClientProvider";

// import Details from "./Details";
// import NameResult from "./NameResult";

// function ClientEntry() {
//   const { recentList, setRecentList } = useClients();
//   const [client, setClient] = useState({
//     firstName: "",
//     lastName: "",
//   });
//   console.log("client: ", client);
//   console.log("recentList:", recentList);
//   const [isSearched, setIsSearched] = useState(false);

//   // GET ALL CLIENTS
//   const { loading, error, data } = useQuery(GET_CLIENTS);
//   const [createClientEntry] = useMutation(CREATE_CLIENT);

//   const schema = Joi.object({
//     firstName: Joi.string().required(),
//     lastName: Joi.string().required(),
//   });

//   const { control, handleSubmit } = useForm({
//     resolver: joiResolver(schema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//     },
//   });

//   const onSubmit = async (formData) => {
//     const filteredClient = data.clients.filter((client) => {
//       return (
//         client.firstName === formData.firstName &&
//         client.lastName === formData.lastName
//       );
//     });

//     if (filteredClient.length === 0) {
//       // Only create the client if they don't already exist
//       const result = await createClientEntry({
//         variables: {
//           client: formData,
//         },
//       });

//       // Update the state with the newly created client
//       setClient(result.data.createClient);

//       setRecentList((prev) => {
//         return [...prev, result.data.createClient];
//       });
//     } else {
//       setClient(filteredClient[0]);

//       setRecentList((prev) => {
//         return [...prev, filteredClient[0]];
//       });
//     }
//     setIsSearched(true);
//   };

//   if (loading) return <p>Loading clients...</p>; // Loading state
//   if (error) return <p>Error loading clients.</p>; // Error state

//   return (
//     <div>
//       <div>
//         <Form noValidate onSubmit={handleSubmit(onSubmit)}>
//           <Controller
//             name="firstName"
//             control={control}
//             render={({ field }) => (
//               <Form.Group controlId="firstName" className="mt-2">
//                 <Form.Label className="visually-hidden">First Name</Form.Label>
//                 <Form.Control
//                   {...field}
//                   type="text"
//                   placeholder=""
//                   size="lg"
//                   className="form-shadow"
//                 />
//               </Form.Group>
//             )}
//           />
//           <Controller
//             name="lastName"
//             control={control}
//             render={({ field }) => (
//               <Form.Group controlId="lastName" className="mt-2">
//                 <Form.Label className="visually-hidden">Last Name</Form.Label>
//                 <Form.Control
//                   {...field}
//                   type="text"
//                   placeholder=""
//                   size="lg"
//                   className="form-shadow"
//                 />
//               </Form.Group>
//             )}
//           />
//           {!isSearched ? (
//             <Button
//               variant="dark"
//               size="lg"
//               block="true"
//               className="w-100 mt-2"
//               type="submit"
//             >
//               Search <i className="bi bi-send-fill"></i>
//             </Button>
//           ) : null}

//           {(client.firstName === "") & (client.lastName === "") ? null : (
//             <div>
//               {/* {client.firstName} {client.lastName} */}
//               <NameResult
//                 firstName={client.firstName}
//                 lastName={client.lastName}
//               />
//             </div>
//           )}
//         </Form>
//         <Details client={client} />
//         {/* {isSearched && <NoteEntry client={client} />} */}
//       </div>
//     </div>
//   );
// }

// export default ClientEntry;
