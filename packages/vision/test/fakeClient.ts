const BASE_URL = "http://localhost:3000";

const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const request = {
  get: async (url: string) => {
    const response = await fetch(`${BASE_URL}${url}`);
    return response.json();
  },
  post: async (url: string, body: any) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: HEADERS,
    });

    return response.json();
  },
  put: async (url: string, body: any) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: HEADERS,
    });
    return response.json();
  },
  patch: async (url: string, body: any) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: HEADERS,
    });
    return response.json();
  },
  delete: async (url: string) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  },
};

console.log(await request.get("/users/1"));
console.log(await request.post("/users", { name: "John Doe" }));
console.log(await request.get("/delay"));
console.log("THE NEXT ERROR IS EXPECTED DONT WORRY ABOUT IT");
console.log(await request.get("/error"));
