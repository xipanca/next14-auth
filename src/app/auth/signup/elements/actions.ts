"use server";
export async function createUser(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return {
    message: "server action called!",
  };
}
