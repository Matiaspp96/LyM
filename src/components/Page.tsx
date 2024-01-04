import Articles from "./Articles";

const articles = [
  {
    title: "Cesto de Basura",
    description:
      "Tu contribución nos ayudará a mantener nuestro hogar limpio y ordenado.",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_699649-MLA46738855556_072021-O.webp",
    goal: 5000,
    current: 2500,
  },
  {
    title: "Toallas de mano",
    description: "Tu aporte nos mantendra limpios y secos.",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_949841-MLA50970926567_082022-O.webp",
    goal: 10000,
    current: 5000,
  },
  {
    title: "Escurridor de platos",
    description: "Ayudanos a mantener la cocina ",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_698250-MLU73417734659_122023-O.webp",
    goal: 10000,
    current: 5000,
  },
  {
    title: "Cortinas",
    description:
      "Con tu aporte nos ayudaras a mantener la privacidad de nuestro hogar.",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_770170-MLA46556141237_062021-O.webp",
    goal: 10000,
    current: 5000,
  },
  {
    title: "Ventilador",
    description: "Tu ayuda nos mantendra frescos en los dias de calor.",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_912747-MLU72582888008_112023-O.webp",
    goal: 10000,
    current: 5000,
  },
  {
    title: "Jarro",
    description: "Contribuye a que nos hagamos unos buenas meriendas.",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_626863-MLU71356941843_082023-O.webp",
    goal: 10000,
    current: 5000,
  },
];

export default function Component() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 dark:bg-gray-800 overflow-hidden relative">
      <div className="absolute w-full h-full overflow-hidden">
        <div className="animate-bubble1 w-64 h-64 bg-pink-300 rounded-full absolute -top-32 -left-16" />
        <div className="animate-bubble2 w-48 h-48 bg-purple-300 rounded-full absolute top-1/2 left-1/4" />
        <div className="animate-bubble3 w-72 h-72 bg-blue-300 rounded-full absolute bottom-0 right-0" />
      </div>
      <section className="w-full max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="grid gap-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold">
              ¡Ayúdanos a Armar Nuestro Nuevo Hogar!
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
              Tu apoyo nos ayudará a crear el hogar de nuestros sueños
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Articles {...article} />
            ))}
          </div>
          <div className="mt-10 w-1/4 mx-auto">
            <h2 className="text-2xl font-bold text-center">Top 3 Donors</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-1">
              <div className="flex items-center justify-center bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
                <p className="text-gray-500 dark:text-gray-400">🥇</p>
                <h3 className="text-lg font-semibold">John Doe</h3>
              </div>
              <div className="flex items-center justify-center bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
                <p className="text-gray-500 dark:text-gray-400">🥈</p>
                <h3 className="text-lg font-semibold">Jane Smith</h3>
              </div>
              <div className="flex items-center justify-center bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
                <p className="text-gray-500 dark:text-gray-400">🥉</p>
                <h3 className="text-lg font-semibold">Robert Johnson</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
