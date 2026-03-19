"use client";

import { useState } from "react";
import {
  Check,
  FileSignature,
  GitPullRequestArrow,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Inbox,
  X,
} from "lucide-react";
import type { ReactNode } from "react";

interface QuickActionItem {
  id: string;
  title: string;
  subtitle: string;
  date?: string;
}

interface QuickActionCategory {
  id: string;
  label: string;
  icon: ReactNode;
  iconBg: string;
  iconColor: string;
  actionable?: boolean;
  items: QuickActionItem[];
}

const initialCategories: QuickActionCategory[] = [
  {
    id: "docs",
    label: "Documentos para firmar",
    icon: <FileSignature className="w-4 h-4" />,
    iconBg: "#EEF2FF",
    iconColor: "#496BE3",
    items: [
      {
        id: "doc-1",
        title: "Declaración jurada de domicilio",
        subtitle: "RRHH",
        date: "Vence 21 Mar",
      },
      {
        id: "doc-2",
        title: "Acuerdo de confidencialidad",
        subtitle: "Legal",
        date: "Vence 25 Mar",
      },
      {
        id: "doc-3",
        title: "Recibo de sueldo — Marzo 2026",
        subtitle: "RRHH",
        date: "Vence 31 Mar",
      },
    ],
  },
  {
    id: "approvals",
    label: "Solicitudes para aprobar",
    icon: <GitPullRequestArrow className="w-4 h-4" />,
    iconBg: "#FFF7ED",
    iconColor: "#F97316",
    actionable: true,
    items: [
      {
        id: "req-1",
        title: "Vacaciones — Luis Fernandez",
        subtitle: "10 Mar – 22 Mar",
      },
      {
        id: "req-2",
        title: "Vacaciones — Camila Torres",
        subtitle: "17 Mar – 21 Mar",
      },
    ],
  },
];

export function QuickActionsSection() {
  const [expanded, setExpanded] = useState(false);
  const [resolved, setResolved] = useState<Record<string, "approved" | "rejected">>({});

  const categories = initialCategories.map((cat) => ({
    ...cat,
    items: cat.items.filter((item) => !resolved[item.id]),
  }));
  const totalItems = categories.reduce((sum, c) => sum + c.items.length, 0);

  return (
    <section>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Header — always visible, toggles accordion */}
        <div className="flex items-center justify-between px-3 py-3">
          <button
            type="button"
            className="flex items-center gap-3 flex-1 min-w-0"
            onClick={() => setExpanded((v) => !v)}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
              style={{ background: "#EEF2FF" }}
            >
              <Inbox className="w-4 h-4" style={{ color: "#496BE3" }} />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-semibold text-gray-800">
                Inbox
              </p>
              {!expanded && (
                <p className="text-xs text-gray-400 mt-0.5">
                  {totalItems} pendiente{totalItems !== 1 ? "s" : ""}
                </p>
              )}
            </div>
            {expanded ? (
              <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
            )}
          </button>
        </div>

        {/* Expanded content */}
        {expanded && (
          <>
            <div className="border-t border-gray-50 divide-y divide-gray-50">
              {categories.map((category) => {
                if (category.items.length === 0) return null;
                return (
                  <div key={category.id} className="py-1">
                    <div className="flex items-center gap-3 px-3 py-2.5">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: category.iconBg, color: category.iconColor }}
                      >
                        {category.icon}
                      </div>
                      <p className="flex-1 text-[13px] font-medium text-gray-700">
                        {category.label}
                      </p>
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: category.iconBg, color: category.iconColor }}
                      >
                        {category.items.length}
                      </span>
                    </div>

                    <div className="ml-[52px] mr-3">
                      {category.items.map((item, idx) => (
                        <div
                          key={item.id}
                          className="py-2"
                          style={{
                            borderBottom:
                              idx < category.items.length - 1
                                ? "1px solid #F3F4F6"
                                : "none",
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-[13px] text-gray-700 truncate">
                                {item.title}
                              </p>
                              <p className="text-xs text-gray-400 mt-0.5">
                                {item.subtitle}
                                {item.date && (
                                  <span className="ml-1.5 text-gray-400">
                                    · {item.date}
                                  </span>
                                )}
                              </p>
                            </div>
                            {!category.actionable && (
                              <ChevronRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                            )}
                          </div>
                          {category.actionable && (
                            <div className="flex gap-2 mt-2">
                              <button
                                type="button"
                                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold text-white transition-colors hover:opacity-90"
                                style={{ backgroundColor: "#496BE3" }}
                                onClick={() =>
                                  setResolved((prev) => ({ ...prev, [item.id]: "approved" }))
                                }
                              >
                                <Check className="w-3.5 h-3.5" />
                                Aprobar
                              </button>
                              <button
                                type="button"
                                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-colors hover:opacity-90"
                                style={{ backgroundColor: "#EEF2FF", color: "#182E7B" }}
                                onClick={() =>
                                  setResolved((prev) => ({ ...prev, [item.id]: "rejected" }))
                                }
                              >
                                <X className="w-3.5 h-3.5" />
                                Rechazar
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
