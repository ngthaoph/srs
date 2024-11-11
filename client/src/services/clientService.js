// GET ALL CLIENTS
const { loading, error, data } = useQuery(GET_CLIENTS);
const [createClientEntry] = useMutation(CREATE_CLIENT);
