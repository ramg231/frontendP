import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Pedidos", value: 400 },
  { name: "Clientes", value: 300 },
  { name: "Productos", value: 300 },
  { name: "Visitas", value: 200 },
];
const COLORS = ["#f472b6", "#fbbf24", "#34d399", "#60a5fa"];

export const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-8">
      <h1 className="text-3xl font-bold text-pink-600 mb-8 text-center">
        Dashboard Pastelería Jazmín
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-pink-500">120</span>
          <span className="text-gray-500 mt-2">Pedidos Hoy</span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-yellow-500">85</span>
          <span className="text-gray-500 mt-2">Clientes Nuevos</span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-green-500">32</span>
          <span className="text-gray-500 mt-2">Productos Activos</span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-blue-500">1,250</span>
          <span className="text-gray-500 mt-2">Visitas Web</span>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold text-pink-600 mb-4">
            Resumen de Actividad
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <span className="font-bold text-pink-500">•</span> 5 pedidos pendientes de entrega
            </li>
            <li>
              <span className="font-bold text-yellow-500">•</span> 2 productos con bajo stock
            </li>
            <li>
              <span className="font-bold text-green-500">•</span> 3 nuevos comentarios positivos
            </li>
            <li>
              <span className="font-bold text-blue-500">•</span> 1 reclamo recibido hoy
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                fill="#f472b6"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
