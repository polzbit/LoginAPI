// process function will return the same parameters as the payload.
export const process = (encrypt, text, cypher) => {
    return {
        type: "PROCESS",
        payload: {
            encrypt,
            text,
            cypher,
        },
    };
  };