'use client';

import { useState } from 'react';
import { useApp } from '@/lib/context';
import { people } from '@/lib/data';
import { formatDate, TODAY } from '@/lib/utils';
import { Link2, Copy, Check, Globe, Lock, X, ChevronDown, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

export function NewVideocallSheet() {
  const { closeBottomSheet } = useApp();

  const [vcTitle, setVcTitle] = useState('');
  const [vcDescription, setVcDescription] = useState('');
  const [vcDate, setVcDate] = useState('');
  const [vcTime, setVcTime] = useState('');
  const [vcParticipants, setVcParticipants] = useState<string[]>([]);
  const [vcLink, setVcLink] = useState('');
  const [vcIsPublic, setVcIsPublic] = useState(true);
  const [vcLinkCopied, setVcLinkCopied] = useState(false);
  const [vcParticipantSearch, setVcParticipantSearch] = useState('');
  const [vcShowParticipants, setVcShowParticipants] = useState(false);

  const allPeople = Object.values(people).filter(
    p => !['humand', 'bienestar', 'sustentabilidad', 'rrhh'].includes(p.id)
  );

  const filteredPeople = allPeople.filter(p =>
    p.name.toLowerCase().includes(vcParticipantSearch.toLowerCase())
  );

  const toggleParticipant = (id: string) => {
    setVcParticipants(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const generateLink = () => {
    const randomId = Math.random().toString(36).substring(2, 10);
    setVcLink(`https://meet.humand.co/${randomId}`);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(vcLink);
    setVcLinkCopied(true);
    setTimeout(() => setVcLinkCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vcTitle) return;
    closeBottomSheet();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
        <input
          type="text"
          value={vcTitle}
          onChange={(e) => setVcTitle(e.target.value)}
          placeholder="Nombre de la reunión"
          className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2"
          style={{ '--tw-ring-color': '#496BE3' } as React.CSSProperties}
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
        <textarea
          value={vcDescription}
          onChange={(e) => setVcDescription(e.target.value)}
          placeholder="Agenda o descripción opcional"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 resize-none"
          style={{ '--tw-ring-color': '#496BE3' } as React.CSSProperties}
        />
      </div>

      {/* Date + Time */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Día y hora</label>
        <div className="flex gap-2">
          <input
            type="date"
            value={vcDate}
            onChange={(e) => setVcDate(e.target.value)}
            min={formatDate(TODAY, 'yyyy-MM-dd')}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2"
            style={{ '--tw-ring-color': '#496BE3' } as React.CSSProperties}
          />
          <input
            type="time"
            value={vcTime}
            onChange={(e) => setVcTime(e.target.value)}
            className="w-28 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 text-sm"
            style={{ '--tw-ring-color': '#496BE3' } as React.CSSProperties}
          />
        </div>
      </div>

      {/* Participants */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Participantes</label>

        {vcParticipants.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {vcParticipants.map(id => {
              const p = allPeople.find(person => person.id === id);
              return p ? (
                <span
                  key={id}
                  className="flex items-center gap-1 text-xs px-2 py-1 rounded-full text-white"
                  style={{ backgroundColor: '#496BE3' }}
                >
                  {p.name.split(' ')[0]}
                  <button type="button" onClick={() => toggleParticipant(id)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ) : null;
            })}
          </div>
        )}

        <button
          type="button"
          onClick={() => setVcShowParticipants(!vcShowParticipants)}
          className="w-full flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-xl text-sm text-gray-500 hover:bg-gray-50 transition-colors text-left"
        >
          <Users className="w-4 h-4 shrink-0" />
          {vcParticipants.length === 0
            ? 'Elegir participantes'
            : `${vcParticipants.length} participante${vcParticipants.length > 1 ? 's' : ''} seleccionado${vcParticipants.length > 1 ? 's' : ''}`}
          <ChevronDown className={cn('w-3.5 h-3.5 ml-auto transition-transform', vcShowParticipants && 'rotate-180')} />
        </button>

        {vcShowParticipants && (
          <div className="mt-1 border border-gray-200 rounded-xl overflow-hidden">
            <input
              type="text"
              value={vcParticipantSearch}
              onChange={(e) => setVcParticipantSearch(e.target.value)}
              placeholder="Buscar persona..."
              className="w-full px-3 py-2 text-sm border-b border-gray-100 focus:outline-none"
            />
            <div className="max-h-40 overflow-y-auto">
              {filteredPeople.map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => toggleParticipant(p.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 text-sm text-left transition-colors',
                    vcParticipants.includes(p.id) ? 'bg-blue-50' : 'hover:bg-gray-50'
                  )}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                    style={{ backgroundColor: '#496BE3' }}
                  >
                    {p.avatar?.slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 truncate">{p.name}</p>
                    <p className="text-xs text-gray-400 truncate">{p.role}</p>
                  </div>
                  {vcParticipants.includes(p.id) && (
                    <Check className="w-4 h-4 shrink-0" style={{ color: '#496BE3' }} />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Link */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Link de la reunión</label>
        {!vcLink ? (
          <button
            type="button"
            onClick={generateLink}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed text-sm font-medium transition-colors hover:bg-blue-50"
            style={{ borderColor: '#496BE3', color: '#496BE3' }}
          >
            <Link2 className="w-4 h-4" />
            Generar link
          </button>
        ) : (
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50">
            <Link2 className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="text-xs text-gray-600 flex-1 truncate font-mono">{vcLink}</span>
            <button
              type="button"
              onClick={copyLink}
              className={cn(
                'shrink-0 px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all',
                vcLinkCopied ? 'bg-green-500 text-white' : 'text-white'
              )}
              style={vcLinkCopied ? {} : { backgroundColor: '#496BE3' }}
            >
              {vcLinkCopied
                ? <><Check className="w-3 h-3" />Copiado</>
                : <><Copy className="w-3 h-3" />Copiar</>}
            </button>
          </div>
        )}
      </div>

      {/* Public / Private toggle */}
      <div className="flex items-center justify-between py-1 border-t border-gray-100 pt-4">
        <div className="flex items-center gap-3">
          {vcIsPublic
            ? <Globe className="w-4 h-4 text-gray-500" />
            : <Lock className="w-4 h-4 text-gray-500" />}
          <div>
            <p className="text-sm font-medium text-gray-700">{vcIsPublic ? 'Pública' : 'Privada'}</p>
            <p className="text-xs text-gray-400">
              {vcIsPublic ? 'Visible para todos en el equipo' : 'Solo para los invitados'}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setVcIsPublic(!vcIsPublic)}
          className="w-11 h-6 rounded-full p-0.5 transition-colors relative shrink-0"
          style={{ backgroundColor: vcIsPublic ? '#496BE3' : '#D1D5DB' }}
        >
          <div className={cn('w-5 h-5 bg-white rounded-full shadow transition-transform', vcIsPublic && 'translate-x-5')} />
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-3 rounded-xl text-white font-medium transition-opacity hover:opacity-90"
        style={{ backgroundColor: '#496BE3' }}
      >
        Crear videollamada
      </button>
    </form>
  );
}
