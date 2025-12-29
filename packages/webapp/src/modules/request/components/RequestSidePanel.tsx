import { HeaderViewer } from "#/modules/request/components/HeaderViewer";
import { RequestLineSection } from "#/modules/request/components/RequestLineSection";
import { StatusTag } from "#/modules/request/components/StatusTag";
import type {
  WSVisionRequest,
  WSVisionResponse,
} from "#/modules/request/infra/request.types";
import { useGetCallReactiveById } from "#/modules/request/infra/requests.store";
import { SidePanel } from "#/shared/components/SidePanel";
import { formatTime } from "#/shared/utils/time.utils";
import { useState } from "react";
import JsonView from "@uiw/react-json-view";
import { darkTheme } from "@uiw/react-json-view/dark";
type Props = {
  id: string | null;
};

export const RequestSidePanel = ({ id }: Props) => {
  return (
    <SidePanel>
      <Content id={id} />
    </SidePanel>
  );
};

const Content = ({ id }: Props) => {
  const [activeTab, setActiveTab] = useState<"request" | "response">("request");
  const call = useGetCallReactiveById(id);

  if (!id || !call) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="tabs tabs-box">
        <input
          checked={activeTab === "request"}
          onChange={() => setActiveTab("request")}
          type="radio"
          name="my_tabs_1"
          className="tab"
          aria-label="Request"
        />
        <input
          checked={activeTab === "response"}
          onChange={() => setActiveTab("response")}
          type="radio"
          disabled={!call.response}
          name="my_tabs_1"
          className="tab"
          aria-label={`Response ${
            call.response ? `(${call.response.status})` : "No response yet"
          }`}
          defaultChecked
        />
      </div>
      {activeTab === "request" && <RequestTab data={call.request} />}
      {activeTab === "response" && call.response && (
        <ResponseTab data={call.response} />
      )}
    </div>
  );
};

const RequestTab = ({ data }: { data: WSVisionRequest }) => {
  return (
    <>
      <RequestLineSection label="Method">{data.method}</RequestLineSection>
      <RequestLineSection label="Path">{data.path}</RequestLineSection>
      <RequestLineSection label="Timestamp">
        {formatTime(data.timestamp)}
      </RequestLineSection>

      <RequestLineSection label="Headers">
        <HeaderViewer headers={data.headers} />
      </RequestLineSection>

      {data.body && (
        <RequestLineSection label="Body">
          <JsonView value={JSON.parse(data.body)} style={darkTheme} />
        </RequestLineSection>
      )}
    </>
  );
};

const ResponseTab = ({ data }: { data: WSVisionResponse }) => {
  return (
    <>
      <RequestLineSection label="Status">
        <StatusTag status={data.status} />
      </RequestLineSection>

      <RequestLineSection label="Headers">
        <HeaderViewer headers={data.headers} />
      </RequestLineSection>

      {data.body && (
        <RequestLineSection label="Body">
          <JsonView value={JSON.parse(data.body)} style={darkTheme} />
        </RequestLineSection>
      )}
    </>
  );
};
