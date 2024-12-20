import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useProductStore = create((set, get) => ({
    products: [],
    loading: false,
    error: null,
    product: null,
    categories: [],
    colors: [],
    dataColors: [],
    images: [],
    brands: [],

    getAllProducts: async (query) => {
        try {
            set({ loading: true, error: null });
            const response = await axiosInstance.get(query);
            set({ products: response.data.products });
        } catch (error) {
            console.error("Error checking authentication:", error);
        } finally {
            set({ loading: false });
        }
    },
    addProduct: async (productData) => {
        try {
            set({ loading: true, error: null });
            const response = await axiosInstance.post(
                "/api/products",
                productData
            );
            set({ products: response.data.products });
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    updateProduct: async (id, data) => {
        try {
            set({ loading: true, error: null });
            const response = await axiosInstance.put(
                `/api/products/${id}`,
                data
            );
            set({ products: response.data.products });
        } catch (error) {
            console.error("Error checking authentication:", error);
        } finally {
            set({ loading: false });
        }
    },
    getProduct: async (slug) => {
        try {
            set({ loading: true, error: null });
            const response = await axiosInstance.get(`/api/products/${slug}`);
            set({ product: response.data.product });
        } catch (error) {
            console.error("Error checking authentication:", error);
        } finally {
            set({ loading: false });
        }
    },
    deleteProduct: async (id) => {
        try {
            set({ loading: true, error: null });
            await axiosInstance.delete(`/api/products/${id}`);
            set({ products: [...get().products.filter((p) => p.id !== id)] });
        } catch (error) {
            console.error("Error checking authentication:", error);
        } finally {
            set({ loading: false });
        }
    },
    getAllCategories: async () => {
        try {
            set({ loading: true, error: null });
            const response = await axiosInstance.get(
                "/api/products/categories"
            );
            set({ categories: response.data.categories });
        } catch (error) {
            console.error("Error checking authentication:", error);
        } finally {
            set({ loading: false });
        }
    },

    addCategory: async (categoryData) => {
        try {
            set({ loading: true, error: null });
            const response = await axiosInstance.post(
                "/api/products/categories",
                categoryData
            );
            set({ categories: [...get().categories, response.data.category] });
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },

    getAllBrands: async () => {
        try {
            set({ loading: true, error: null });
            const response = await axiosInstance.get("/api/products/brands");
            set({ brands: response.data.brands });
        } catch (error) {
            console.error("Error checking authentication:", error);
        } finally {
            set({ loading: false });
        }
    },
    addBrand: async (brandData) => {
        try {
            set({ loading: true, error: null });
            const response = await axiosInstance.post(
                "/api/products/brands",
                brandData
            );
            set({ brands: [...get().brands, response.data.brand] });
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    getAllColors: async () => {
        try {
            set({ loading: true, error: null });
            const response = await axiosInstance.get("/api/products/colors");
            set({ colors: response.data.colors });
        } catch (error) {
            console.error("Error checking authentication:", error);
        } finally {
            set({ loading: false });
        }
    },

    getDataColors: async () => {
        try {
            set({ loading: true, error: null });
            const response = await axiosInstance.get("/api/colors");
            set({ dataColors: response.data.colors });
        } catch (error) {
            console.error("Error checking authentication:", error);
        } finally {
            set({ loading: false });
        }
    },
    getProductColors: async (id) => {
        try {
            set({ loading: true, error: null });
            const response = await axiosInstance.get(`api/colors/${id}`);
            set({ colors: response.data.colors });
        } catch (error) {
            console.error("Error checking authentication:", error);
        } finally {
            set({ loading: false });
        }
    },
}));
