import { json } from "@remix-run/node";
import { makeTable } from "~/db-queries/makeTable";

export let loader = async () => {
  await makeTable();
  return json({}, {status: 200});
}
