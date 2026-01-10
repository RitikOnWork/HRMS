const apiFetch = async (url, options = {}) => {
  const response = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    let error = "Request failed";
    try {
      const data = await response.json();
      error = data.error || error;
    } catch (_) {}
    throw new Error(error);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export default apiFetch;
