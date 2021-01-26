import { fetchWithoutToken, fetchWithToken } from "./fetch";

export const forgotPassword = async (email) => {
  const request = await fetchWithoutToken(
    "auth/forgot-password",
    { email },
    "PUT"
  );
  return await request.json();
};

export const newPassword = async (password) => {
  const request = await fetchWithToken(
    "auth/new-password",
    { password },
    "PUT"
  );
  return await request.json();
};

export const sendMailContact = async (contact) => {
  const request = await fetchWithoutToken(
    "services/contact",
    { ...contact },
    "POST"
  );
  return await request.json();
};

export const sendInvitation = async (info) => {
  const request = await fetchWithToken(
    "testimonials/send-invitation",
    { ...info },
    "POST"
  );
  return await request.json();
};
