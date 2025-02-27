import axios from "axios";

// export const API_BASE_URL = "http://api.fastapi.popovic.pro/";
export const API_BASE_URL = "http://127.0.0.1:8000/";

export const logout = () => {
    localStorage.removeItem("auth_token");
    window.location.href = "/login";
};

const ApiService = {
    init() {
        axios.defaults.baseURL = API_BASE_URL;

        axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 401) {
                    logout();
                }
                return Promise.reject(error);
            }
        );
    },

    setHeader() {
        const token = localStorage.getItem("auth_token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },

    async post(resource, data, headers) {
         resource = resource.startsWith("/")
            ? resource.slice(1)
            : resource;

        try {
            const response = await axios.post(resource, data, headers);
            return {
                message: "Success",
                data: response.data,
                status: response.status
            };
        } catch (error) {
            console.error("Axios error:", error);

            const statusCode = error.response?.status;
            const errorMessage = error.response?.data?.detail || error.message;

            return {
                message: "Error",
                error: errorMessage,
                status: statusCode || "Unknown status"
            };
        }
    },

    async put(resource, data, headers) {
        resource = resource.startsWith("/")
            ? resource.slice(1)
            : resource;

        try {
            const response = await axios.put(resource, data, headers);
            return {
                message: "Success",
                data: response.data,
                status: response.status
            };
        } catch (error) {
            console.error("Axios error:", error);

            const statusCode = error.response?.status;
            const errorMessage = error.response?.data?.detail || error.message;

            return {
                message: "Error",
                error: errorMessage,
                status: statusCode || "Unknown status"
            };
        }
    },

    async get(resource, params) {
        resource = resource.startsWith("/")
            ? resource.slice(1)
            : resource;

        try {
            const response = await axios.get(resource, {params});
            return {
                message: "Success",
                data: response.data,
                status: response.status
            };
        } catch (error) {
            console.error("Axios error:", error);

            const statusCode = error.response?.status;
            const errorMessage = error.response?.data?.detail || error.message;

            return {
                message: "Error",
                error: errorMessage,
                status: statusCode || "Unknown status"
            };
        }
    },

    async delete(resource, params) {
        resource = resource.startsWith("/")
            ? resource.slice(1)
            : resource;

        try {
            const response = await axios.delete(resource, {params});
            return {
                message: "Success",
                status: response.status
            };
        } catch (error) {
            console.error("Axios error:", error);

            const statusCode = error.response?.status;
            const errorMessage = error.response?.data?.detail || error.message;

            return {
                message: "Error",
                error: errorMessage,
                status: statusCode || "Unknown status"
            };
        }
    }
}

export default ApiService;