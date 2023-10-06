import { json } from "@remix-run/node";
import { insertPerson } from "~/db-queries/insertPerson";

export let action = async ({ request }) => {
  const formData = new URLSearchParams(await request.text());
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const email = formData.get('email');

  const createdId = await insertPerson(firstName, lastName, email);

  if (createdId) {
    return json({ id: createdId }, {status: 200});
  } else {
    return json({ error: "Failed to insert person" }, {status: 400});
  }
}