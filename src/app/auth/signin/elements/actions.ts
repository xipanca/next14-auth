"use server";
export async function LoginUser(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return {
    message: "server action called!",
  };
}
