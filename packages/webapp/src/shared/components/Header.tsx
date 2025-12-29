import { navigationConfig } from "#/modules/core/navigation.config";
import { WebsocketStatus } from "#/modules/core/WebsocketStatus";

export const Header = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <a
          className="btn btn-ghost text-xl"
          href="https://github.com/Rouret/elysia-vision"
          target="_blank"
          rel="noopener noreferrer"
        >
          elysia-vision
        </a>
      </div>

      <div className="navbar-center">
        <ul className="menu menu-horizontal">
          {navigationConfig.map((path) => (
            <li key={path.href}>
              <a href={path.href} className="text-base">
                {path.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end">
        <WebsocketStatus />
      </div>
    </div>
  );
};
