"use client"


import { useEffect, useState } from "react"
import { toast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Video, Users, Calendar, TrendingUp, Activity } from "lucide-react"

type Log = {
  time: string;
  action: string;
  category: string;
  status: string;
  tipo?: string;
};

export default function DashboardPage() {
  const [integration, setIntegration] = useState({
    moodle: { connected: false, version: '', lastCheck: '', error: null, responseTime: null },
    zoom: { connected: false, lastCheck: '', error: null, responseTime: null },
  });
  const [indicators, setIndicators] = useState({ activeCourses: 0, users: 0 });
  // 1. Aquí declaras la constante logs
  const logs: Log[] = [
    {
      time: "17/08/2025 14:25",
      action: "Recepción de Programación",
      category: "2025-II | AGOSTO",
      status: "recibido",
      tipo: "documento",
    },
    {
      time: "16/08/2025 14:10",
      action: "Generación de Sesiones",
      category: "2025-II | AGOSTO",
      status: "error",
      tipo: "zoom",
    },
    {
      time: "15/06/2025 14:05",
      action: "Recolección de Data",
      category: "ETL - Power Bi",
      status: "ejecutado",
      tipo: "moodle",
    },
  ];
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/integration-status")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setIntegration(data))
      .catch(() => {
        toast({
          title: "Conexión requerida",
          description: "No se pudo conectar con el backend. Por favor, asegúrate de que los servicios esté en funcionamiento.",
          variant: "destructive",
        });
      });
    fetch("http://localhost:4000/api/indicators")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setIndicators(data))
      .catch(() => {
        toast({
          title: "Conexión requerida",
          description: "No se pudo conectar con el backend. Por favor, asegúrate de que el servidor esté en funcionamiento.",
          variant: "destructive",
        });
      });
  }, []);

  return (
    <div className="p-6">
      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ESTADO DE INTEGRACIÓN */}
        <Card className="lg:col-span-4 bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">ESTADO DE INTEGRACIÓN</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-neutral-800 rounded">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-[#27d4ba]" />
                  <div>
                    <div className="text-sm text-white font-medium">Moodle {integration.moodle.version || ''}</div>
                    <div className="text-xs text-neutral-400">LMS</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {integration.moodle.version === '' ? (
                    <>
                      <div className="w-2 h-2 rounded-full bg-neutral-400 animate-pulse"></div>
                      <span className="text-xs font-semibold text-neutral-400">PENDIENTE</span>
                    </>
                  ) : (
                    <>
                      <div className={`w-2 h-2 rounded-full animate-pulse ${integration.moodle.connected ? 'bg-[#27d4ba]' : 'bg-red-500'}`}></div>
                      <span className={`text-xs font-semibold ${integration.moodle.connected ? 'text-[#27d4ba]' : 'text-red-500'}`}>{integration.moodle.connected ? 'CONNECTED' : 'DISCONNECTED'}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-neutral-800 rounded">
                <div className="flex items-center gap-3">
                  <Video className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="text-sm text-white font-medium">Zoom API</div>
                    <div className="text-xs text-neutral-400">Plataforma Externa</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {integration.zoom.lastCheck === '' ? (
                    <>
                      <div className="w-2 h-2 rounded-full bg-neutral-400 animate-pulse"></div>
                      <span className="text-xs font-semibold text-neutral-400">PENDIENTE</span>
                    </>
                  ) : (
                    <>
                      <div className={`w-2 h-2 rounded-full animate-pulse ${integration.zoom.connected ? 'bg-[#27d4ba]' : 'bg-red-500'}`}></div>
                      <span className={`text-xs font-semibold ${integration.zoom.connected ? 'text-[#27d4ba]' : 'text-red-500'}`}>{integration.zoom.connected ? 'CONNECTED' : 'DISCONNECTED'}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white font-mono">{indicators.activeCourses}</div>
                    <div className="text-xs text-neutral-500">Cursos Activos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white font-mono">{indicators.users.toLocaleString()}</div>
                    <div className="text-xs text-neutral-500">Usuarios</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* HISTORIAL DE PROCESOS */}
        <Card className="lg:col-span-4 bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">HISTORIAL DE PROCESOS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {/* 2. Aquí usas logs.map en vez de un array inline */}
              {logs.map((log, index) => (
                <div
                  key={index}
                  className="text-xs border-l-2 border-[#27d4ba] pl-3 hover:bg-neutral-800 p-2 rounded transition-colors"
                  onClick={() => setSelectedLog(log)}
                >
                  <div className="text-neutral-500 font-mono">{log.time}</div>
                  <div className="flex flex-col gap-1">
                    <div className="text-white flex items-center flex-wrap gap-1">
                      {log.action} <span className="text-[#27d4ba] font-medium">{log.category}</span>
                      {log.tipo && (
                        <span className="ml-2 px-2 py-1 rounded text-xs bg-neutral-200 text-neutral-700 font-medium">
                          {log.tipo.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex w-full mt-0.5">
                      <span
                        className={`px-2 py-1 rounded text-xs ${log.status === "ejecutado"
                          ? "bg-[#27d469]/20 text-[#27d469] font-semibold"
                          : log.status === "recibido"
                            ? "bg-blue-500/20 text-blue-500 font-semibold"
                            : "bg-red-500/20 text-red-500 font-semibold"
                          }`}
                        style={{ textAlign: 'left' }}
                      >
                        {log.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

              ))}
            </div>
          </CardContent>
        </Card>

        {/* MONITOREO DE CONEXIÓN API */}
        <Card className="lg:col-span-4 bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">
              MONITOREO DE CONEXIÓN API
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            {/* Connection Visualization */}
            <div className="relative w-32 h-32 mb-4">
              {/* Cyberpunk Radar SVG ajustado */}
              {/* Fondo circular y recorte */}
              <div className="absolute inset-0 w-full h-full rounded-full overflow-hidden bg-black"></div>
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 128 128">
                {/* Outer glowing ring */}
                <circle cx="64" cy="64" r="60" fill="none" stroke="#27d4ba" strokeWidth="3" opacity="0.7" filter="url(#glow)" />
                {/* Inner rings */}
                <circle cx="64" cy="64" r="44" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.3" />
                <circle cx="64" cy="64" r="28" fill="none" stroke="#fff" strokeWidth="1" opacity="0.2" />
                {/* Cross lines */}
                <line x1="64" y1="4" x2="64" y2="124" stroke="#fff" strokeWidth="1" opacity="0.15" />
                <line x1="4" y1="64" x2="124" y2="64" stroke="#fff" strokeWidth="1" opacity="0.15" />
                {/* Blips (ajustados a la circunferencia) */}
                <circle cx="108" cy="64" r="2" fill="#27d4ba" className="animate-pulse" />
                <circle cx="64" cy="20" r="1.5" fill="#3b82f6" className="animate-pulse" />
                <circle cx="90" cy="100" r="1.2" fill="#fff" className="animate-pulse" />
              </svg>

              <style jsx>{`
                @keyframes cyber-scan {
                  0% { background-position-y: 0; }
                  100% { background-position-y: 8px; }
                }
                .animate-cyber-scan {
                  animation: cyber-scan 0.5s linear infinite;
                }
              `}</style>
            </div>

            <div className="text-xs text-neutral-500 space-y-1 w-full font-mono">
              <div className="flex justify-between">
                <span># Monitoreo</span>
              </div>
              <div className={integration.moodle.connected ? "text-white" : "text-red-500"}>
                {`> [MOODLE] ::: ${integration.moodle.version === '' ? 'Pendiente' : (integration.moodle.connected ? 'Connected' : 'Disconnected')}`}
                {` | ${integration.moodle.responseTime !== undefined && integration.moodle.responseTime !== null ? integration.moodle.responseTime + ' ms' : '- ms'}`}
              </div>
              <div className={integration.zoom.connected ? "text-blue-500" : "text-red-500"}>
                {`> [ZOOM] ::: ${integration.zoom.lastCheck === '' ? 'Pendiente' : (integration.zoom.connected ? 'Connected' : 'Disconnected')}`}
                {` | ${integration.zoom.responseTime !== undefined && integration.zoom.responseTime !== null ? integration.zoom.responseTime + ' ms' : '- ms'}`}
              </div>
              <div className="text-white">{`> SYNC STATUS: ${(integration.moodle.connected && integration.zoom.connected) ? 'ACTIVE' : 'INACTIVE'}`}</div>
              <div className="text-neutral-400">
                {(() => {
                  const raw = integration.moodle.lastCheck || integration.zoom.lastCheck || null;
                  if (!raw) return '> Sincronización: --- [Hora Lima, Perú]';
                  const date = new Date(raw);
                  date.setHours(date.getHours() - 5);
                  const lima = date.toISOString().replace('T', ' ').replace('Z', '');
                  return `> Sincronización: ${lima} [Hora Lima, Perú]`;
                })()}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* RENDIMIENTO DE AUTOMATIZACIONES */}
        <Card className="lg:col-span-8 bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">
              RENDIMIENTO DE AUTOMATIZACIONES
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 relative">
              {/* Chart Grid */}
              <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 opacity-20 pl-10">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className="border border-neutral-700"></div>
                ))}
              </div>

              {/* Chart Lines */}
              <svg className="absolute inset-0 w-full h-full pl-10">
                <polyline
                  points="0,120 50,100 100,110 150,90 200,95 250,85 300,100 350,80"
                  fill="none"
                  stroke="#27d4ba"
                  strokeWidth="2"
                />
                <polyline
                  points="0,140 50,135 100,130 150,125 200,130 250,135 300,125 350,120"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              </svg>

              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-neutral-500 -ml-8 font-mono pl-7">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
              </div>

              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-neutral-500 -mb-6 font-mono pl-10">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
              </div>

              {/* Legend */}
              <div className="absolute top-4 right-4 space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-0.5 bg-[#27d4ba]"></div>
                  <span className="text-neutral-400">ejecutado Rate</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-0.5 bg-blue-500 border-dashed"></div>
                  <span className="text-neutral-400">Response Time</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* MÉTRICAS RÁPIDAS */}
        <Card className="lg:col-span-4 bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">MÉTRICAS RÁPIDAS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-neutral-400" />
                  <span className="text-xs text-neutral-400">Sesiones de hoy</span>
                </div>
                <span className="text-sm text-white font-mono">18</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-neutral-400" />
                  <span className="text-xs text-neutral-400">Estudiantes Activos</span>
                </div>
                <span className="text-sm text-white font-mono">1,247</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-neutral-400" />
                  <span className="text-xs text-neutral-400">Docentes Activos</span>
                </div>
                <span className="text-sm text-white font-mono">47</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-neutral-400" />
                  <span className="text-xs text-neutral-400">Presición</span>
                </div>
                <span className="text-sm text-white font-mono">98.7%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-neutral-400" />
                  <span className="text-xs text-neutral-400">Automatizaciones en Ejecución</span>
                </div>
                <span className="text-sm text-white font-mono">12</span>
              </div>

              <div className="pt-4 border-t border-neutral-700">
                <div className="text-xs text-neutral-400 mb-2">Estado del Sistema</div>
                <div className="w-full bg-neutral-800 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full w-[98%]"></div>
                </div>
                <div className="text-xs text-white font-mono mt-1">98% Operativo</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Aquí, después del grid, va el modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-neutral-900 border-neutral-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-white tracking-wider">
                  {selectedLog.action}
                </CardTitle>
                <p className="text-sm text-neutral-400">
                  {selectedLog.time} •
                  <span className="inline text-[#27d4ba] font-medium">
                    {` ${selectedLog.category}`}
                  </span>
                </p>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-neutral-400 hover:text-white text-2xl px-2"
              >
                ✕
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">ESTADO DEL PROCESO</h3>
                <span className={`px-2 py-1 rounded text-xs ${selectedLog.status === "ejecutado"
                  ? "bg-[#27d469]/20 text-[#27d469] font-semibold"
                  : selectedLog.status === "recibido"
                    ? "bg-blue-500/20 text-blue-500 font-semibold"
                    : "bg-red-500/20 text-red-500 font-semibold"
                  }`}>
                  {selectedLog.status.toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">DETALLES</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Categoría:</span>
                    <span className="text-white font-mono">{selectedLog.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Tipo:</span>
                    <span className="text-white font-mono">{selectedLog.tipo?.toUpperCase()}</span>
                  </div>
                  {/* Agrega aquí más detalles si tu log tiene más campos */}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
