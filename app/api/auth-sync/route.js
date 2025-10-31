//app/api/auth-sync/route.js
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth as getAdminAuth } from "firebase-admin/auth";

// Inicializar Firebase Admin una sola vez
if (!getApps().length) {
  initializeApp({
    credential: cert({
      project_id: process.env.FIREBASE_PROJECT_ID,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

// Genera y retorna el Custom Token
export async function GET(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const customToken = await getAdminAuth().createCustomToken(userId);
    return NextResponse.json({ token: customToken });
  } catch (error) {
    console.error("Error generando token Firebase:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
