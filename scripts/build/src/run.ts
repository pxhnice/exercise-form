import { spawn } from "child_process";

export const run = async (command: string, path: string) => {
  const [cmd, ...args] = command.split(" ");
  return new Promise((resolve, resject) => {
    const app = spawn(cmd, args, {
      cwd: path,
      stdio: "inherit",
      shell: true
    });
    app.on("close", resolve);
  });
};
