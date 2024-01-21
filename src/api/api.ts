import { Colaborador, Product } from "@/types/types";
import axios from "axios";

export default {
    listProducts: async (): Promise<Product[]> => {
        return axios.get(`
        https://docs.google.com/spreadsheets/d/e/2PACX-1vT1oFDruiG8OIOSZQmqKWIIwCFCh7kiLjMK5IipThi9RHnXNqTYYBliB1XLKgcneGkeo66HQHkC3sOC/pub?gid=0&single=true&output=csv
        `).then((response) => {
            const csv = response.data;
            const lines = csv.split('\n');
            const products: Product[] = [];
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i];
                const product = line.split(',');
                products.push({
                    id: parseInt(product[0]),
                    producto: product[1],
                    descripcion: product[2],
                    precioObjetivo: parseInt(product[3]),
                    recaudado: parseInt(product[4]),
                    donantes: [product[5]],
                    imagenUrl: product[6]
                });
            }
            return products;
        })
            .catch((error) => {
                console.error(error);
                return [];
            });
    },
    sendDonation: async (productId: number, amount: number, donorName: string): Promise<boolean> => {
        try {
            fetch('https://script.google.com/macros/s/AKfycbwVdsTi9b28mmHxOC-6zhtkTL1G6rdCP_AywygmFN_8old4xiS4igrLEMR-CTh1RRUatg/exec', {
                redirect: "follow",
                method: "POST",
                body: JSON.stringify({
                    productId,
                    amount,
                    donorName: donorName,
                }),
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                },
            }).then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    return true;
                })
                .catch((error) => {
                    console.error(error);
                    return false;
                });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    listContributors: async (): Promise<Colaborador[]> => {
        return axios.get(`
        https://docs.google.com/spreadsheets/d/e/2PACX-1vT1oFDruiG8OIOSZQmqKWIIwCFCh7kiLjMK5IipThi9RHnXNqTYYBliB1XLKgcneGkeo66HQHkC3sOC/pub?gid=1508453710&single=true&output=csv
        `).then((response) => {
            const csv = response.data;
            const lines = csv.split('\n');
            const colaboradores: Colaborador[] = [];
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i];
                const colaborador = line.split(',');
                colaboradores.push({
                    id: parseInt(colaborador[0]),
                    nombre: colaborador[1],
                    pesos: parseInt(colaborador[2]),
                    productos: colaborador[3].split(';').map((productoId: Pick<Product, 'id'>) => {
                        console.log(productoId);
                    }),
                });
            }
            return colaboradores;
        })
            .catch((error) => {
                console.error(error);
                return [];
            });
    }
}