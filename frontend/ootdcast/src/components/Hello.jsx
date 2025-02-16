"use client";
import { useEffect, useState } from "react";

export default function Hello() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsername = localStorage.getItem("username") || "";
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>Hello, {username ? username : "Guest"}</h1>
    </div>
  );
}