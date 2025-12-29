import { useApiAddressStore } from "./apiAddress.store";
export let socket: WebSocket = new WebSocket(
  `${useApiAddressStore.getState().apiAddress}/vision`
);

export const connectSocket = () => {
  socket = new WebSocket(`${useApiAddressStore.getState().apiAddress}/vision`);
};
