'use client';

import { ReactNode } from 'react';

interface PhoneFrameProps {
  children: ReactNode;
}

// iPhone 16 Pro Max: 393 × 852 logical points
export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: 'linear-gradient(145deg, #dde3f5 0%, #eaecf7 40%, #dfe3f2 100%)',
        padding: '24px',
      }}
    >
      {/* Drop shadow wrapper */}
      <div
        style={{
          borderRadius: '56px',
          boxShadow:
            '0 60px 120px -20px rgba(24,46,123,0.28), 0 30px 60px -10px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
      >
        {/* Outer titanium body */}
        <div
          style={{
            position: 'relative',
            width: '393px',
            height: '852px',
            borderRadius: '56px',
            background:
              'linear-gradient(170deg, #4a4a4c 0%, #3a3a3c 15%, #2c2c2e 50%, #1c1c1e 85%, #141416 100%)',
            padding: '3px',
          }}
        >
          {/* Left buttons — silent + volume up + volume down */}
          <div
            style={{
              position: 'absolute',
              left: '-4px',
              top: '108px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {/* Silent toggle */}
            <div
              style={{
                width: '4px',
                height: '32px',
                background: 'linear-gradient(180deg, #3a3a3c, #252527)',
                borderRadius: '2px 0 0 2px',
              }}
            />
            {/* Volume up */}
            <div
              style={{
                width: '4px',
                height: '62px',
                background: 'linear-gradient(180deg, #3a3a3c, #252527)',
                borderRadius: '2px 0 0 2px',
              }}
            />
            {/* Volume down */}
            <div
              style={{
                width: '4px',
                height: '62px',
                background: 'linear-gradient(180deg, #3a3a3c, #252527)',
                borderRadius: '2px 0 0 2px',
              }}
            />
          </div>

          {/* Right button — power */}
          <div
            style={{
              position: 'absolute',
              right: '-4px',
              top: '168px',
              width: '4px',
              height: '88px',
              background: 'linear-gradient(180deg, #3a3a3c, #252527)',
              borderRadius: '0 2px 2px 0',
            }}
          />

          {/* Inner black inset */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderRadius: '53px',
              background: '#0a0a0a',
              padding: '2px',
              overflow: 'hidden',
            }}
          >
            {/* Screen — the single source of truth for app content */}
            <div
              id="phone-screen"
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                borderRadius: '51px',
                background: 'white',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* ── Status bar ── */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: '54px',
                  paddingTop: '14px',
                  paddingLeft: '30px',
                  paddingRight: '28px',
                  paddingBottom: '0',
                  flexShrink: 0,
                  background: 'white',
                  position: 'relative',
                  zIndex: 10,
                }}
              >
                {/* Time */}
                <span
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    letterSpacing: '-0.3px',
                    color: '#111',
                  }}
                >
                  9:41
                </span>

                {/* Dynamic Island — centered, overlaps status bar */}
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '118px',
                    height: '36px',
                    background: '#000',
                    borderRadius: '20px',
                    zIndex: 30,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingRight: '12px',
                    gap: '7px',
                  }}
                >
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: '#1a1a2e',
                      border: '1px solid #2a2a3e',
                    }}
                  />
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#0d0d0d',
                    }}
                  />
                </div>

                {/* Right icons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  {/* Cellular bars */}
                  <svg width="17" height="12" viewBox="0 0 17 12" fill="#111">
                    <rect x="0" y="8" width="3" height="4" rx="0.5" fillOpacity="0.28" />
                    <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.5" fillOpacity="0.5" />
                    <rect x="9" y="3" width="3" height="9" rx="0.5" />
                    <rect x="13.5" y="0" width="3" height="12" rx="0.5" />
                  </svg>
                  {/* WiFi */}
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                    <circle cx="8" cy="10.5" r="1.5" fill="#111" />
                    <path
                      d="M4.5 7.2C5.5 6 6.7 5.3 8 5.3s2.5.7 3.5 1.9"
                      stroke="#111"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M1.5 4.5C3.2 2.5 5.5 1.3 8 1.3s4.8 1.2 6.5 3.2"
                      stroke="#111"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeOpacity="0.35"
                    />
                  </svg>
                  {/* Battery */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1px' }}>
                    <div
                      style={{
                        width: '25px',
                        height: '12px',
                        border: '1.5px solid #111',
                        borderRadius: '3.5px',
                        padding: '2px',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          width: '75%',
                          height: '100%',
                          background: '#111',
                          borderRadius: '1.5px',
                        }}
                      />
                    </div>
                    <div
                      style={{
                        width: '2px',
                        height: '5px',
                        background: '#111',
                        borderRadius: '0 1.5px 1.5px 0',
                        opacity: 0.5,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* ── App content ── */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  overflow: 'hidden',
                  minHeight: 0,
                }}
              >
                {children}
              </div>

              {/* ── Home indicator ── */}
              <div
                style={{
                  height: '34px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  background: 'white',
                }}
              >
                <div
                  style={{
                    width: '134px',
                    height: '5px',
                    background: '#000',
                    borderRadius: '3px',
                    opacity: 0.16,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
