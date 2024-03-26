// api/index.ts

export const fetchData = async (endpoint: string) => {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Error al obtener los datos de ${endpoint}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error(`Error al obtener los datos de ${endpoint}`);
  }
};

export const postData = async (endpoint: string, data: any) => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`Error al realizar la solicitud a ${endpoint}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error(`Error al realizar la solicitud a ${endpoint}`);
  }
};
