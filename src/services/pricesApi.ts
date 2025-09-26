import { createApi } from '@reduxjs/toolkit/query/react';

type DailyOHLCData = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
};
type HistoricalPriceData = Record<string, DailyOHLCData[]>;
type CurrentPriceData = Record<string, number>;
export type PriceStreamData = {
  history: HistoricalPriceData;
  last: CurrentPriceData;
  connected: boolean;
  error: string | null;
  reconnectAttempts: number;
};

const WEBSOCKET_URL = import.meta.env.VITE_WS_URL as string;

export const pricesApi = createApi({
  reducerPath: 'pricesApi',
  baseQuery: async () => ({ data: undefined as unknown as PriceStreamData }),
  endpoints: build => ({
    streamPrices: build.query<PriceStreamData, void>({
      queryFn: () => ({ data: { history: {}, last: {}, connected: false, error: null, reconnectAttempts: 0 } }),
      async onCacheEntryAdded(_, { updateCachedData, cacheEntryRemoved }) {
        let webSocketConnection: WebSocket | null = null;
        let isConnectionClosed = false;

        const sleep = (milliseconds: number) => new Promise(resolve => setTimeout(resolve, milliseconds));
        let reconnectionAttempt = 0;

        const establishWebSocketConnection = async () => {
          while (!isConnectionClosed) {
            try {
              updateCachedData(cachedData => {
                cachedData.error = null;
                cachedData.reconnectAttempts = reconnectionAttempt;
              });

              webSocketConnection = new WebSocket(WEBSOCKET_URL);
              
              webSocketConnection.onopen = () => {
                reconnectionAttempt = 0;
                updateCachedData(cachedData => {
                  cachedData.connected = true;
                  cachedData.error = null;
                  cachedData.reconnectAttempts = 0;
                });
              };
              
              webSocketConnection.onmessage = event => {
                try {
                  const messageData = JSON.parse(event.data);
                  if (messageData.type === 'history') {
                    updateCachedData(cachedData => {
                      cachedData.history = messageData.data as HistoricalPriceData;
                    });
                  } else if (messageData.type === 'tick') {
                    updateCachedData(cachedData => {
                      cachedData.last[messageData.ticker] = messageData.price as number;
                    });
                  }
                } catch (parseError) {
                  console.error('Error parsing WebSocket message:', parseError);
                }
              };
              
              webSocketConnection.onclose = () => {
                updateCachedData(cachedData => {
                  cachedData.connected = false;
                });
                if (!isConnectionClosed) throw new Error('WebSocket connection closed');
              };
              
              webSocketConnection.onerror = () => {
                updateCachedData(cachedData => {
                  cachedData.error = 'Connection error';
                  cachedData.connected = false;
                });
                try {
                  webSocketConnection?.close();
                } catch {}
              };
              
              return;
            } catch (connectionError) {
              reconnectionAttempt++;
              updateCachedData(cachedData => {
                cachedData.error = `Connection failed (attempt ${reconnectionAttempt})`;
                cachedData.connected = false;
                cachedData.reconnectAttempts = reconnectionAttempt;
              });
              await sleep(Math.min(2000 * reconnectionAttempt, 8000));
            }
          }
        };

        establishWebSocketConnection();
        await cacheEntryRemoved;
        isConnectionClosed = true;
        try {
          if (webSocketConnection) {
            (webSocketConnection as WebSocket).close();
          }
        } catch {}
      },
    }),
  }),
});

export const { useStreamPricesQuery } = pricesApi;
