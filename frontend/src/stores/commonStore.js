import { data } from 'react-router-dom';
import { create } from 'zustand'

export const useCommonStore = create((set) => ({
    // State
    isLoading: false,

    // Beneficios
    beneficios: [],
    currentPage: 0,
    totalPages: 0,
    totalBeneficios: 0,
    nextPage: null,
    prevPage: null,

    // Queries
    page: 1,
    pageSize: 8,
    comercio: '',


    // Functions
    setIsLoading: (value) => set({ isLoading: value }),
    setPage: (value) => set({ page: value }),
    setComercio: (value) => set({ comercio: value }),

    fetchBeneficios: async () => {
        try {
            console.log("Fetching all beneficios from store...");
            // Get all beneficios
            const { page, pageSize, comercio } = useCommonStore.getState();

            const query_params = new URLSearchParams({
                page: page,
                pageSize: pageSize,
                comercio: comercio,
            });


            const res = await fetch(`${import.meta.env.VITE_URL_BACKEND}/api/beneficios?${query_params}`);
            const res_json = await res.json();
            console.log(res_json);
            if (res_json.error === false) {
                const data = res_json.data;
                set({ 
                    beneficios: data.beneficios,
                    totalPages: data.totalPages,
                    page: data.currentPage,
                    nextPage: data.nextPage,
                    prevPage: data.prevPage,
                    totalBeneficios: data.totalBeneficios
                });
                return;
                
            }
        } catch (error) {
            
        }
    }
}))