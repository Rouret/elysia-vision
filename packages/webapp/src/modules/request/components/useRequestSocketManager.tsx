import {
  type WSVisionCall,
  type VisionCall,
  VISION_CALL_EVENT_NAME,
} from "#/modules/request/infra/request.types";
import {
  useSetCalls,
  useGetCalls,
  useUpdateCallById,
  useIsCallExists,
} from "#/modules/request/infra/requests.store";
import { useOnMessage } from "#/shared/infra/useOnMessage";

const adaptWSVisionCallToVisionCall = (
  wsVisionCall: WSVisionCall
): VisionCall => {
  return {
    ...wsVisionCall,
    duration: wsVisionCall.response
      ? wsVisionCall.response?.timestamp - wsVisionCall.request.timestamp
      : null,
  };
};

export const useRequestSocketManager = () => {
  const setRequests = useSetCalls();
  const getRequests = useGetCalls();
  const updateCallById = useUpdateCallById();
  const isCallExists = useIsCallExists();

  useOnMessage<WSVisionCall>(VISION_CALL_EVENT_NAME, (event) => {
    const visionCall = adaptWSVisionCallToVisionCall(event);
    if (isCallExists(visionCall.id)) {
      updateCallById(visionCall.id, visionCall);
      return;
    }

    const currentRequests = getRequests();
    const newRequests: VisionCall[] = [...currentRequests, visionCall];

    setRequests(
      newRequests
        .sort((a, b) => b.request.timestamp - a.request.timestamp)
        .slice(0, 10)
    );
  });
};
