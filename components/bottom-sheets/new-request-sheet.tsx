"use client";

import {
  Palmtree,
  FileText,
  Home,
  ArrowLeftRight,
  GraduationCap,
  CreditCard,
  Clock,
  Baby,
  ChevronRight,
} from "lucide-react";
import type { ReactNode } from "react";

interface RequestOption {
  id: string;
  icon: ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  description: string;
}

const requestOptions: RequestOption[] = [
  {
    id: "vacation",
    icon: <Palmtree className="w-5 h-5" />,
    iconBg: "#ECFDF5",
    iconColor: "#14B8A6",
    label: "Pedir vacaciones",
    description: "Solicitá días de descanso",
  },
  {
    id: "permit",
    icon: <Clock className="w-5 h-5" />,
    iconBg: "#FFF7ED",
    iconColor: "#F97316",
    label: "Solicitar permiso",
    description: "Llegada tarde, salida temprana, etc.",
  },
  {
    id: "home-office",
    icon: <Home className="w-5 h-5" />,
    iconBg: "#EEF2FF",
    iconColor: "#496BE3",
    label: "Pedir home office",
    description: "Trabajar desde casa un día",
  },
  {
    id: "shift-change",
    icon: <ArrowLeftRight className="w-5 h-5" />,
    iconBg: "#F5F3FF",
    iconColor: "#8B5CF6",
    label: "Cambio de turno",
    description: "Intercambiar turno con un compañero",
  },
  {
    id: "training",
    icon: <GraduationCap className="w-5 h-5" />,
    iconBg: "#FEF2F2",
    iconColor: "#EF4444",
    label: "Capacitación externa",
    description: "Solicitar curso o certificación",
  },
  {
    id: "advance",
    icon: <CreditCard className="w-5 h-5" />,
    iconBg: "#FFFBEB",
    iconColor: "#EAB308",
    label: "Adelanto de sueldo",
    description: "Solicitar un adelanto parcial",
  },
  {
    id: "parental",
    icon: <Baby className="w-5 h-5" />,
    iconBg: "#FDF2F8",
    iconColor: "#EC4899",
    label: "Licencia parental",
    description: "Maternidad o paternidad",
  },
  {
    id: "certificate",
    icon: <FileText className="w-5 h-5" />,
    iconBg: "#F0F9FF",
    iconColor: "#0EA5E9",
    label: "Pedir certificado",
    description: "Certificado laboral o de haberes",
  },
];

export function NewRequestSheet() {
  return (
    <div className="space-y-1 -mt-1">
      {requestOptions.map((option) => (
        <button
          type="button"
          key={option.id}
          className="w-full flex items-center gap-3 px-1 py-3 rounded-xl text-left hover:bg-gray-50 transition-colors group"
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{ background: option.iconBg, color: option.iconColor }}
          >
            {option.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800">
              {option.label}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {option.description}
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-300 shrink-0 group-hover:text-gray-500 transition-colors" />
        </button>
      ))}
    </div>
  );
}
