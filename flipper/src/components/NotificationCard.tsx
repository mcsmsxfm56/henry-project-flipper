import { set_Ver_Notificación } from "@/services/notificacion";
import { NotificationSingle } from "@/types/Types";
import React, { useState } from "react";

interface NotificationCardProps {
  notif: NotificationSingle;
}

const notifVistaStyle = "";
const notifNoVistaStyle = "";
const aprobarStatus = "text-green-600 border-green-600 bg-green-300";
const rechazadoStatus = "text-red-600 border-red-600 bg-red-300";
const pendienteStatus = "text-yellow-600 border-yellow-600 bg-yellow-300";

const NotificationCard = ({ notif }: NotificationCardProps) => {
  const { evento, status, eventoId, trabajadorId, notificacionVista } = notif;

  const [visto, setVisto] = useState(notificacionVista);

  const handleVisto = async () => {
    // Manda a la BD que la notificación ya se vió
    if (!visto) {
      setVisto(true);
      set_Ver_Notificación(trabajadorId, eventoId, true);
    }
  };

  return (
    <div
      className={`flex flex-col my-2 bg-gray-200 hover:bg-gray-300 text-black gap-1 ${
        !visto && "bg-orange-500"
      }`}
      onMouseEnter={handleVisto}
    >
      <h3 className="font-bold text-center text-xl">{evento.nombre}</h3>
      <p
        className={`w-full text-center rounded py-2 border-2 border-solid font-bold text-xl ${
          status == "APROBADO"
            ? aprobarStatus
            : status == "RECHAZADO"
            ? rechazadoStatus
            : pendienteStatus
        }`}
      >
        {status}
      </p>
      <p className="text-start w-full">Lugar: {evento.lugar}</p>
      <p className="text-start w-full">Inicia: {evento.fecha_inicio.toString()}</p>
      <p className="text-start w-full">Termina: {evento.fecha_final.toString()}</p>
      <p className="text-start w-full">Pago: ${evento.pago}</p>
      <p>{evento.observaciones}</p>
    </div>
  );
};

export default NotificationCard;