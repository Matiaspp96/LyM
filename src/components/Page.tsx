import api from "@/api/api";
import { Colaborador, Product } from "@/types/types";
import { useEffect, useState } from "react";
import Articles from "./Articles";

export default function Component() {
  const [products, setProducts] = useState<Product[]>([]);
  const [contributions, setContributions] = useState<Colaborador[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await api.listProducts();
      setProducts(products);
    };
    fetchProducts();
    const fetchContributions = async () => {
      const contributions = await api.listContributors();
      contributions.sort((a, b) => b.pesos - a.pesos);
      setContributions(contributions);
    };
    fetchContributions();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 dark:bg-gray-800 overflow-hidden relative">
      <div className="absolute w-full h-full overflow-hidden">
        <div className="animate-blob animation-delay-2000 mix-blend-multiply filter blur-xl opacity-50 w-64 h-64 bg-pink-300 rounded-full absolute -top-32 -left-16" />
        <div className="animate-blob3 w-60 h-60 mix-blend-multiply filter blur-2xl opacity-50 bg-purple-300 rounded-full absolute top-1/3 left-1/4" />
        <div className="animate-blob2 animation-delay-1000 mix-blend-multiply filter blur-xl opacity-50 w-72 h-72 bg-blue-300 rounded-full absolute bottom-0 right-0" />
      </div>
      <section className="w-full max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="grid gap-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold">
              ¡Ayúdanos a Armar Nuestro Nuevo Hogar🏡!
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
              Tu apoyo nos ayudará a crear el hogar de nuestros sueños
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Articles key={product.id} {...product} />
            ))}
          </div>
          <div className="mt-10 md:w-1/4 mx-auto">
            <h2 className="text-2xl font-bold text-center">Top 3 Donadores</h2>
            <div className="mt-6 flex flex-col w-full md:grid gap-6 md:grid-cols-1">
              <div className="flex items-center justify-start gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
                <p className="text-gray-500 dark:text-gray-400">🥇</p>
                <h3 className="text-lg font-semibold">
                  {contributions[0]?.nombre}
                </h3>
              </div>
              <div className="flex items-center justify-start gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
                <p className="text-gray-500 dark:text-gray-400">🥈</p>
                <h3 className="text-lg font-semibold">
                  {contributions[1]?.nombre}
                </h3>
              </div>
              <div className="flex items-center justify-start gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
                <p className="text-gray-500 dark:text-gray-400">🥉</p>
                <h3 className="text-lg font-semibold">
                  {contributions[2]?.nombre}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
